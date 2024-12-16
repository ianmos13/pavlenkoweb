"use client";
import React, { useState } from "react";
import styles from "./TrainingApplicationForm.module.scss";
import RadioGroup from "./RadioGroup/RadioGroup";
import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";
import Section from "./Section/Section";
import FileUploadArea from "./FileUploadArea/FileUploadArea";
import InputGroup from "./InputGroup/InputGroup";
import ConsentSection from "./СonsentSection/СonsentSection";

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
  });

  const handleSubmit = (e) => {
    e.preventDefault();

  
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
    });
    setIsConsentChecked(false);
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
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

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === section;
        return acc;
      }, {}),
    }));
  };

  return (
    <div className={styles.wrapper}>
      <h2>Подробно заполните представленные ниже пункты</h2>
      <div className={styles.wrapperInner} onSubmit={handleSubmit}>
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
            <InputGroup
              type="number"
              name="age"
              placeholder="Возраст"
              value={formData.age}
              onChange={handleInputChange("age")}
            />
            <InputGroup
              name="city"
              placeholder="Город проживания"
              value={formData.city}
              onChange={handleInputChange("city")}
            />

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
              <FileUploadArea key={id} label={label} fileId={id} />
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
                "Хирургия Upper GI - Санкт-Петербург",
                "Хирургия Upper GI - Тюмень",
                "Хирургия Upper GI - Москва",
                "Онкогинекология - Санкт-Петербург",
                "Торакальная онкохирургия - Москва",
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
            <InputGroup
              name="mail"
              placeholder="Электронная почта"
              value={formData.mail}
              onChange={handleInputChange("mail")}
            />
          </Section>

          <ConsentSection
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
      </div>
    </div>
  );
};

export default TrainingApplicationForm;
