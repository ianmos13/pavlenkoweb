"use client";
import React, { useState, useEffect } from "react";
import styles from "./TrainingApplicationForm.module.scss";
import RadioGroup from "./RadioGroup/RadioGroup";
import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";
import Section from "./Section/Section";
import FileUploadArea from "./FileUploadArea/FileUploadArea";
import InputGroup from "./InputGroup/InputGroup";
import ConsentSection from "./СonsentSection/СonsentSection";
import FormPopup from "@/components/TrainingApplication/TrainingApplicationForm/FormPopup/FormPopup";

const TrainingApplicationForm = () => {
  const [openSections, setOpenSections] = useState({
    personal: true,
    education: false,
    specialization: false,
    moreInfo: false,
    contacts: false,
  });

  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    citizenship: "",
    family: "",
    children: "",
    education: "",
    work: "",
    rewards: "",
    operation: "",
    english: "",
    phone: "",
    mail: "",
    specialization: [],
    additionalInfo: "",
    files: {},
  });

  const [errors, setErrors] = useState({});
  const [resetKey, setResetKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Добавим состояние для хранения первого ошибочного поля:
  const [firstErrorField, setFirstErrorField] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Введите ФИО.";
    if (!formData.age || formData.age <= 0)
      newErrors.age = "Введите корректный возраст.";
    if (!formData.city.trim()) newErrors.city = "Введите город проживания.";
    if (!/\S+@\S+\.\S+/.test(formData.mail))
      newErrors.mail = "Введите корректный email.";
    if (!/^\d+$/.test(formData.phone))
      newErrors.phone = "Введите корректный номер телефона.";

    if (formData.operation.trim()) {
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      if (!youtubeRegex.test(formData.operation)) {
        newErrors.operation = "Введите корректную ссылку на YouTube.";
      }
    }
    return newErrors;
  };

  // Мапа, чтобы понять к какой секции относится поле
  const getSectionIdByField = (field) => {
    const fieldToSectionMap = {
      name: "personal",
      age: "personal",
      city: "personal",
      citizenship: "personal",
      family: "personal",
      children: "personal",
      education: "education",
      work: "education",
      rewards: "education",
      operation: "education",
      english: "education",
      phone: "contacts",
      mail: "contacts",
      specialization: "specialization",
      additionalInfo: "moreInfo",
    };
    return fieldToSectionMap[field];
  };

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === section;
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    if (firstErrorField) {
      const sectionId = getSectionIdByField(firstErrorField);
      if (sectionId) {
        toggleSection(sectionId);
      }

      setTimeout(() => {
        const errorElement = document.querySelector(
          `[name="${firstErrorField}"]`
        );
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [firstErrorField]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setFirstErrorField(Object.keys(formErrors)[0] || null);
      return;
    }

    setFirstErrorField(null);

    try {
      setIsLoading(true);
      setError("");
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (key === "files") {
          for (const i of ["certificate", "doc", "resume"]) {
            if (value[i]) {
              Array.from(value[i]).forEach((file) => {
                data.append("files", file);
              });
            }
          }
        } else {
          data.append(key, value);
        }
      }
      console.log("data", data);
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        setIsPopupVisible(true);
      } else {
        setError(result.error || "Что-то пошло не так. Попробуйте снова.");
      }
    } catch (error) {
      setError(`${error.message} Ошибка соединения. Попробуйте позже.`);
    } finally {
      setIsLoading(false);
    }

    setFormData({
      name: "",
      age: "",
      city: "",
      citizenship: "",
      family: "",
      children: "",
      education: "",
      work: "",
      rewards: "",
      operation: "",
      english: "",
      phone: "",
      mail: "",
      specialization: [],
      additionalInfo: "",
      files: {},
    });
    setResetKey((prev) => prev + 1);
    setIsConsentChecked(false);
    setErrors({});
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specialization: prev.specialization.includes(value)
        ? prev.specialization.filter((spec) => spec !== value)
        : [...prev.specialization, value],
    }));
  };

  const handleFileUpload = (fileId) => (files) => {
    setFormData((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [fileId]: files,
      },
    }));
  };

  return (
    <div className={styles.wrapper}>
      {isPopupVisible && <FormPopup onClose={() => setIsPopupVisible(false)} />}
      <h2>Подробно заполните представленные ниже пункты</h2>

      <form className={styles.wrapperInner} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <Section
            title="1. Персональные данные"
            isOpen={openSections.personal}
            onToggle={() => toggleSection("personal")}>
            <InputGroup
              name="name"
              placeholder="ФИО"
              value={formData.name}
              onChange={handleInputChange("name")}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            <InputGroup
              type="number"
              name="age"
              placeholder="Возраст"
              value={formData.age}
              onChange={handleInputChange("age")}
            />
            {errors.age && <p className={styles.error}>{errors.age}</p>}

            <InputGroup
              name="city"
              placeholder="Город проживания"
              value={formData.city}
              onChange={handleInputChange("city")}
            />
            {errors.city && <p className={styles.error}>{errors.city}</p>}

            <RadioGroup
              label="Гражданство России"
              name="citizenship"
              options={[
                { value: "yes", label: "Да" },
                { value: "no", label: "Нет" },
              ]}
              onChange={handleInputChange("citizenship")}
              selectedValue={formData.citizenship}
            />

            <RadioGroup
              label="Семейное положение"
              name="family"
              options={[
                { value: "free", label: "Холост" },
                { value: "substitute", label: "Замужем(женат)" },
                { value: "divorce", label: "В разводе" },
              ]}
              onChange={handleInputChange("family")}
              selectedValue={formData.family}
            />

            <RadioGroup
              label="Дети"
              name="children"
              options={[
                { value: "no", label: "Нет" },
                { value: "one", label: "1 ребенок" },
                { value: "morethanone", label: "более 1 ребенка" },
              ]}
              onChange={handleInputChange("children")}
              selectedValue={formData.children}
            />
          </Section>

          <Section
            title="2. Образование и карьера"
            isOpen={openSections.education}
            onToggle={() => toggleSection("education")}>
            <InputGroup
              type="textarea"
              name="education"
              placeholder="Образование"
              value={formData.education}
              onChange={handleInputChange("education")}
            />
            <InputGroup
              type="textarea"
              name="work"
              placeholder="Место работы, должность"
              value={formData.work}
              onChange={handleInputChange("work")}
            />
            <InputGroup
              type="textarea"
              name="rewards"
              placeholder="Значимые достижения в карьере, награды, знаки отличия"
              value={formData.rewards}
              onChange={handleInputChange("rewards")}
            />
            <InputGroup
              name="operation"
              placeholder="Ссылка на YouTube с видеозаписью вашей операции"
              spanText="Демонстрация мануальных навыков. Длительность видео не более 15 минут."
              value={formData.operation}
              onChange={handleInputChange("operation")}
            />
            {errors.operation && (
              <p className={styles.error}>{errors.operation}</p>
            )}

            <RadioGroup
              label="Знание английского языка"
              name="english"
              options={[
                { value: "beginner", label: "Начальный уровень" },
                { value: "intermediate", label: "Средний уровень" },
                { value: "uper_intermediate", label: "Продвинутый уровень" },
              ]}
              onChange={handleInputChange("english")}
              selectedValue={formData.english}
            />

            {[
              {
                id: "certificate",
                label: "Загрузите ваш сертификат(-ы) хирурга / онколога",
              },
              {
                id: "resume",
                label: "Загрузите ваше резюме на русском и английском языках",
              },
              {
                id: "doc",
                label: "Документы, подтверждающие вашу квалификацию",
              },
            ].map(({ id, label }) => (
              <FileUploadArea
                key={id}
                label={label}
                fileId={id}
                onChange={handleFileUpload(id)}
                resetKey={resetKey}
              />
            ))}
          </Section>

          <Section
            title="3. Направление обучения"
            isOpen={openSections.specialization}
            onToggle={() => toggleSection("specialization")}>
            <CheckboxGroup
              label="Какую специализацию (и город) вы хотите выбрать?"
              name="specialization"
              options={[
                "Онкоурология - Тюмень",
                "Онкоурология - Уфа",
                "Гепатобилиарная хирургия - Казань",
                "Гепатобилиарная хирургия - Новосибирск ",
                "Онкогинекология",
                "Опухоли головы и шеи",
                "Торакальная хирургия ",
                "Колопроктология",
                "Абдоминальная хирургия (Upper GI)",
              ]}
              value={formData.specialization}
              onChange={handleCheckboxChange}
            />
          </Section>

          <Section
            title="4. Расскажите подробнее"
            isOpen={openSections.moreInfo}
            onToggle={() => toggleSection("moreInfo")}>
            <InputGroup
              type="textarea"
              name="additionalInfo"
              placeholder="Дополнительная информация"
              value={formData.additionalInfo}
              onChange={handleInputChange("additionalInfo")}
            />
          </Section>

          <Section
            title="5. Контакты"
            isOpen={openSections.contacts}
            onToggle={() => toggleSection("contacts")}>
            <InputGroup
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleInputChange("phone")}
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}

            <InputGroup
              name="mail"
              placeholder="Электронная почта"
              value={formData.mail}
              onChange={handleInputChange("mail")}
            />
            {errors.mail && <p className={styles.error}>{errors.mail}</p>}
          </Section>
          {error && <p className={styles.error}>{error}</p>}

          <ConsentSection
            isLoading={isLoading}
            isConsentChecked={isConsentChecked}
            setIsConsentChecked={setIsConsentChecked}
            handleSubmit={handleSubmit}
          />
        </div>

        <div className={styles.sidebar}>
          <ul className={styles.navList}>
            {[
              { id: "personal", label: "Персональные данные" },
              { id: "education", label: "Образование и карьера" },
              { id: "specialization", label: "Направление обучения" },
              { id: "moreInfo", label: "Расскажите подробнее" },
              { id: "contacts", label: "Контакты" },
            ].map((section) => (
              <li
                key={section.id}
                className={`${styles.navItem} ${
                  openSections[section.id] ? styles.active : ""
                }`}
                onClick={() => toggleSection(section.id)}>
                <h5>{section.label}</h5>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default TrainingApplicationForm;
