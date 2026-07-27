"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DatePicker.module.scss";
import DropdownPortal from "@/components/UI/FormElements/DropdownPortal/DropdownPortal";
import {
  useClickOutside,
  useFloatingPosition,
} from "@/components/UI/FormElements/hooks/useFloatingPosition";
import {
  displayToIso,
  formatInputValue,
  getCalendarDays,
  isoToDisplay,
  parseDisplayDate,
  parseIsoDate,
  validateDisplayDate,
} from "./dateUtils";

const MONTH_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const DatePicker = ({
  name,
  placeholder = "Дата",
  value = "",
  onChange,
  disablePast = false,
  children,
}) => {
  const anchorRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { floatingRef, position } = useFloatingPosition(anchorRef, isOpen, 4);

  useClickOutside(anchorRef, floatingRef, isOpen, () => setIsOpen(false));
  const [inputValue, setInputValue] = useState(() => isoToDisplay(value));
  const [inputError, setInputError] = useState("");
  const [viewDate, setViewDate] = useState(() => {
    const parsed = parseIsoDate(value);
    return parsed || new Date();
  });

  useEffect(() => {
    setInputValue(isoToDisplay(value));

    const parsed = parseIsoDate(value);
    if (parsed) {
      setViewDate(parsed);
    }
  }, [value]);

  const emitChange = (isoValue) => {
    onChange?.({ target: { name, value: isoValue } });
  };

  const commitDisplayValue = (displayValue) => {
    const validation = validateDisplayDate(displayValue, { disablePast });

    if (!validation.valid) {
      setInputError(validation.error);
      return false;
    }

    setInputError("");
    const isoValue = displayValue ? displayToIso(displayValue) : "";
    emitChange(isoValue);
    return true;
  };

  const handleInputChange = (event) => {
    const formatted = formatInputValue(event.target.value);
    setInputValue(formatted);
    setInputError("");

    if (formatted.length === 10) {
      commitDisplayValue(formatted);
    } else if (!formatted) {
      emitChange("");
    }
  };

  const handleInputBlur = () => {
    if (!inputValue) {
      setInputError("");
      emitChange("");
      return;
    }

    if (inputValue.length < 10) {
      setInputError("Введите дату в формате ДД.ММ.ГГГГ.");
      return;
    }

    commitDisplayValue(inputValue);
  };

  const handleDaySelect = (day) => {
    const selectedDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      day
    );

    if (disablePast) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) return;
    }

    const displayValue = `${String(day).padStart(2, "0")}.${String(
      viewDate.getMonth() + 1
    ).padStart(2, "0")}.${viewDate.getFullYear()}`;

    setInputValue(displayValue);
    setInputError("");
    emitChange(displayToIso(displayValue));
    setIsOpen(false);
  };

  const isDayDisabled = (day) => {
    if (!disablePast || !day) return false;

    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDaySelected = (day) => {
    if (!day) return false;

    const selected = parseDisplayDate(inputValue);
    if (!selected) return false;

    return (
      selected.getDate() === day &&
      selected.getMonth() === viewDate.getMonth() &&
      selected.getFullYear() === viewDate.getFullYear()
    );
  };

  const changeMonth = (offset) => {
    setViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
    );
  };

  const calendarDays = getCalendarDays(
    viewDate.getFullYear(),
    viewDate.getMonth()
  );

  return (
    <div className={styles.datePicker}>
      <div className={styles.inputWrapper} ref={anchorRef}>
        <input
          type="text"
          name={name}
          id={name}
          className={`${styles.input} ${inputError ? styles.invalid : ""}`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          inputMode="numeric"
          autoComplete="off"
          maxLength={10}
        />
        <button
          type="button"
          className={styles.calendarButton}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Открыть календарь"
        >
          <img
            src="/images/icons/arrow-dropdowsn-down.svg"
            alt=""
            className={`${styles.calendarIcon} ${isOpen ? styles.open : ""}`}
          />
        </button>
      </div>

      {inputError && <p className={styles.fieldError}>{inputError}</p>}

      {isOpen && (
        <DropdownPortal>
          <div
            ref={floatingRef}
            className={styles.calendar}
            style={{
              top: position.top,
              left: position.left,
              width: 288,
            }}
          >
            <div className={styles.calendarHeader}>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => changeMonth(-1)}
                aria-label="Предыдущий месяц"
              >
                <img src="/images/icons/arrow-left-Icon.svg" alt="" />
              </button>
              <span className={styles.monthLabel}>
                {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
              </span>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => changeMonth(1)}
                aria-label="Следующий месяц"
              >
                <img src="/images/icons/arrow-right-Icon.svg" alt="" />
              </button>
            </div>

            <div className={styles.weekdays}>
              {WEEKDAYS.map((weekday) => (
                <span key={weekday} className={styles.weekday}>
                  {weekday}
                </span>
              ))}
            </div>

            <div className={styles.days}>
              {calendarDays.map((day, index) => (
                <button
                  key={`${day ?? "empty"}-${index}`}
                  type="button"
                  className={`${styles.day} ${
                    day ? "" : styles.empty
                  } ${isDaySelected(day) ? styles.selected : ""} ${
                    isDayDisabled(day) ? styles.disabled : ""
                  }`}
                  onClick={() => day && !isDayDisabled(day) && handleDaySelect(day)}
                  disabled={!day || isDayDisabled(day)}
                  tabIndex={day ? 0 : -1}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </DropdownPortal>
      )}
      {children}
    </div>
  );
};

export default DatePicker;
