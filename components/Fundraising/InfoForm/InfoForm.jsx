"use client";

import React, { useState, useEffect } from "react";
import styles from "./InfoForm.module.scss";
import Section from "@/components/UI/FormElements/Section/Section";
import InputGroup from "@/components/UI/FormElements/InputGroup/InputGroup";
import SelectBoxGroup from "@/components/UI/FormElements/SelectBoxGroup/SelectBoxGroup";
import DatePicker from "@/components/UI/FormElements/DatePicker/DatePicker";
import { isValidDateValue } from "@/components/UI/FormElements/DatePicker/dateUtils";
import FormPopup from "@/components/UI/FormElements/FormPopup/FormPopup";
import ConsentSection from "@/components/Fundraising/InfoForm/ConsentSection/ConsentSection";
import {useRouter} from "next/navigation";

const FUNDRAISING_GOAL_OPTIONS = [
  "День рождение/Юбилей",
  "Свадьба",
  "День врача",
  "Профессиональный праздник",
  "Концерт/Квартирник",
  "Розыгрыш/Лотерея",
  "Ярмарка/Барахолка",
  "Забег/Турнир",
  "Другое событие",
];

const InfoForm = ({ onPreview, goalsData = [] }) => {
  const router = useRouter();
  const [openSections, setOpenSections] = useState({
    personal: true,
    fundraisingInfo: false,
  });

  const [isConsentOneChecked, setIsConsentOneChecked] = useState(false);
  const [isConsentTwoChecked, setIsConsentTwoChecked] = useState(false);
  const [formData, setFormData] = useState({
    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",
    fundraisingName: "",
    fundraisingGoal: "",
    fundraisingDescription: "",
    fundraisingEnd: "",
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [resetKey, setResetKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [firstErrorField, setFirstErrorField] = useState(null);

  const validateField = (field, value) => {
    switch (field) {
      case "organizerName":
        return value.trim() ? "" : "Введите ФИО.";
      case "organizerEmail":
        if (!value.trim()) return "Введите email.";
        return /\S+@\S+\.\S+/.test(value) ? "" : "Введите корректный email.";
      case "organizerPhone":
        if (!value.trim()) return "Введите номер телефона.";
        return /^\d+$/.test(value) ? "" : "Введите корректный номер телефона.";
      case "fundraisingName":
        return value.trim() ? "" : "Введите название сбора.";
      case "fundraisingGoal":
        return value ? "" : "Выберите цель сбора.";
      case "fundraisingDescription":
        return value.trim() ? "" : "Введите описание сбора.";
      case "fundraisingEnd":
        if (!value) return "Укажите дату завершения.";
        return isValidDateValue(value, { disablePast: true }) ? "" : "Введите корректную дату.";
      default:
        return "";
    }
  };

  const validateForm = (dataToValidate = formData) => {
    return Object.keys(dataToValidate).reduce((acc, field) => {
      const errorMessage = validateField(field, dataToValidate[field] ?? "");
      if (errorMessage) {
        acc[field] = errorMessage;
      }
      return acc;
    }, {});
  };

  const getSectionIdByField = (field) => {
    const fieldToSectionMap = {
      organizerName: "personal",
      organizerEmail: "personal",
      organizerPhone: "personal",
      fundraisingName: "fundraisingInfo",
      fundraisingGoal: "fundraisingInfo",
      fundraisingDescription: "fundraisingInfo",
      fundraisingEnd: "fundraisingInfo",
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
      if (sectionId) toggleSection(sectionId);

      setTimeout(() => {
        const errorElement = document.querySelector(
          `[name="${firstErrorField}"], #${firstErrorField}`
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
    setTouchedFields(
      Object.keys(formData).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {})
    );

    if (Object.keys(formErrors).length > 0) {
      setFirstErrorField(Object.keys(formErrors)[0]);
      return;
    }

    setFirstErrorField(null);
    let isFundraisingCreated = false;
    try {
      setIsLoading(true);
      setError("");

      const createResponse = await fetch("/api/create-fundraising-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const createResult = await createResponse.json().catch(() => ({}));
      if (createResponse.ok) {
        const emailResponse = await fetch("/api/send-fundraising-created", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            organizerName: formData.organizerName,
            organizerEmail: formData.organizerEmail,
            fundraisingName: formData.fundraisingName,
            slug: createResult.slug || "",
          }),
        });

        if (!emailResponse.ok) {
          const emailResult = await emailResponse.json().catch(() => ({}));
          console.error("Ошибка отправки письма о создании сбора:", emailResult);
        }

        isFundraisingCreated = true;
        setIsPopupVisible(true);
      } else {
        setError(createResult?.error || "Ошибка при создании сбора.");
      }
    } catch (error) {
      setError(`${error.message} Ошибка соединения. Попробуйте позже.`);
    } finally {
      setIsLoading(false);
    }

    if (!isFundraisingCreated) return;

    setFormData({
      organizerName: "",
      organizerEmail: "",
      organizerPhone: "",
      fundraisingName: "",
      fundraisingGoal: "",
      fundraisingDescription: "",
      fundraisingEnd: "",
    });
    setResetKey((prev) => prev + 1);
    setIsConsentOneChecked(false);
    setIsConsentTwoChecked(false);
    setErrors({});
    setTouchedFields({});
  };
  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  const handlePreview = () => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    setTouchedFields(
      Object.keys(formData).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {})
    );

    if (Object.keys(formErrors).length > 0) {
      setFirstErrorField(Object.keys(formErrors)[0]);
      return;
    }

    setFirstErrorField(null);
    onPreview?.(formData);
  };

  const closeSuccessPopup = () => {
    setIsPopupVisible(false)
    router.push('/fundraising');
  }
  return (
    <div id="fundraising-info-form" className={styles.wrapper}>
      {isPopupVisible &&
        <FormPopup
          onClose={closeSuccessPopup}
          data={{
            title: "Поздравляем! Вы успешно создали сбор.",
            description: "Сбор будет сразу же опубликован после успешного прохождения модерации"
          }}
        />
      }
      <h2>Заполните информацию о сборе</h2>

      <form className={styles.wrapperInner} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <Section
            theme="fundraising"
            title="1. Данные организатора"
            isOpen={openSections.personal}
            onToggle={() => toggleSection("personal")}
          >
            <InputGroup
              name="organizerName"
              placeholder="Организатор сбора"
              value={formData.organizerName}
              onChange={handleInputChange("organizerName")}
            >
              {touchedFields.organizerName && errors.organizerName && <p className={styles.error}>{errors.organizerName}</p>}
            </InputGroup>
            <InputGroup
              name="organizerEmail"
              placeholder="Email"
              value={formData.organizerEmail}
              onChange={handleInputChange("organizerEmail")}
            >
              {touchedFields.organizerEmail && errors.organizerEmail && <p className={styles.error}>{errors.organizerEmail}</p>}
            </InputGroup>
            <InputGroup
              name="organizerPhone"
              placeholder="Телефон"
              value={formData.organizerPhone}
              onChange={handleInputChange("organizerPhone")}
            >
              {touchedFields.organizerPhone && errors.organizerPhone && <p className={styles.error}>{errors.organizerPhone}</p>}
            </InputGroup>
          </Section>
          <Section
            theme="fundraising"
            title="2. Информация о сборе"
            isOpen={openSections.fundraisingInfo}
            onToggle={() => toggleSection("fundraisingInfo")}>
            <InputGroup
              name="fundraisingName"
              placeholder="Название сбора"
              value={formData.fundraisingName}
              onChange={handleInputChange("fundraisingName")}
            >
              {touchedFields.fundraisingName && errors.fundraisingName && <p className={styles.error}>{errors.fundraisingName}</p>}
            </InputGroup>
            <SelectBoxGroup
              name="fundraisingGoal"
              placeholder="Цель сбора"
              options={
                goalsData.length
                  ? goalsData
                  : FUNDRAISING_GOAL_OPTIONS
              }
              value={formData.fundraisingGoal}
              onChange={handleInputChange("fundraisingGoal")}
            >
              {touchedFields.fundraisingGoal && errors.fundraisingGoal && <p className={styles.error}>{errors.fundraisingGoal}</p>}
            </SelectBoxGroup>
            <InputGroup
              type="textarea"
              name="fundraisingDescription"
              placeholder="Описание сбора"
              value={formData.fundraisingDescription}
              onChange={handleInputChange("fundraisingDescription")}
            >
              {touchedFields.fundraisingDescription && errors.fundraisingDescription && (
                <p className={styles.error}>{errors.fundraisingDescription}</p>
              )}
            </InputGroup>
            <DatePicker
              name="fundraisingEnd"
              placeholder="Дата завершения"
              value={formData.fundraisingEnd}
              onChange={handleInputChange("fundraisingEnd")}
              disablePast
            >
              {touchedFields.fundraisingEnd && errors.fundraisingEnd && <p className={styles.error}>{errors.fundraisingEnd}</p>}
            </DatePicker>
          </Section>
          {error && <p className={styles.error}>{error}</p>}

          <ConsentSection
            isLoading={isLoading}
            isConsentOneChecked={isConsentOneChecked}
            setIsConsentOneChecked={setIsConsentOneChecked}
            isConsentTwoChecked={isConsentTwoChecked}
            setIsConsentTwoChecked={setIsConsentTwoChecked}
            handleSubmit={handleSubmit}
            onPreview={handlePreview}
          />
        </div>

        <div className={styles.sidebar}>
          <ul className={styles.navList}>
            {[
              { id: "personal", label: "Данные организатора" },
              { id: "fundraisingInfo", label: "Информация о сборе" },
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

export default InfoForm;
