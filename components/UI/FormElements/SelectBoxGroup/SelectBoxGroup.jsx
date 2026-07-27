"use client";

import { useState, useRef } from "react";
import styles from "./SelectBoxGroup.module.scss";
import DropdownPortal from "@/components/UI/FormElements/DropdownPortal/DropdownPortal";
import {
  useClickOutside,
  useFloatingPosition,
} from "@/components/UI/FormElements/hooks/useFloatingPosition";

const getOptionLabel = (option) => {
  if (typeof option === "string") return option;
  return option.label ?? option.name ?? "";
};

const getOptionValue = (option) => {
  if (typeof option === "string") return option;

  const value = option.value ?? option.slug;
  return value != null ? String(value) : "";
};

const getOptionKey = (option, index) => {
  const value = getOptionValue(option);
  return value || `option-${index}`;
};

const SelectBoxGroup = ({
  name,
  placeholder,
  options = [],
  value = "",
  onChange,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef(null);
  const { floatingRef, position } = useFloatingPosition(anchorRef, isOpen, 4);

  useClickOutside(anchorRef, floatingRef, isOpen, () => setIsOpen(false));

  const selectedOption =
    options.find((option) => getOptionValue(option) === String(value)) ?? null;

  const displayText = selectedOption
    ? getOptionLabel(selectedOption)
    : placeholder;

  const handleSelect = (option) => {
    const optionValue = getOptionValue(option);
    onChange?.({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={styles.selectBox} ref={anchorRef}>
      <input type="hidden" name={name} id={name} value={value} readOnly />

      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={`${styles.triggerContent} ${
            !selectedOption ? styles.placeholder : ""
          }`}
        >
          <span className={styles.triggerText}>{displayText}</span>
        </span>
        <img
          src={
            isOpen
              ? "/images/icons/arrow-dropdowsn-up.svg"
              : "/images/icons/arrow-dropdowsn-down.svg"
          }
          alt={isOpen ? "Свернуть список" : "Развернуть список"}
          className={styles.arrowIcon}
        />
      </button>

      {isOpen && (
        <DropdownPortal>
          <ul
            ref={floatingRef}
            className={styles.dropdown}
            role="listbox"
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
          >
            {options.map((option, index) => {
              const optionValue = getOptionValue(option);
              const optionLabel = getOptionLabel(option);
              const isSelected = optionValue === String(value);

              return (
                <li
                  key={getOptionKey(option, index)}
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.option} ${
                    isSelected ? styles.selected : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span>{optionLabel}</span>
                </li>
              );
            })}
          </ul>
        </DropdownPortal>
      )}
      {children}
    </div>
  );
};

export default SelectBoxGroup;
