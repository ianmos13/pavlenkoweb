import { useState } from "react";
import styles from "./SidebarCategories.module.scss";

const SidebarCategories = ({
  categories,
  activeCategory,
  onCategoryChange,
  showAllCategoriesFilters,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const updatedCategories = [{ name: "" }, ...categories];
  return (
    <>
      <div className={styles.sidebar}>
        {showAllCategoriesFilters && (
          <div
            className={`${styles.category} ${
              activeCategory === null ? styles.activeDesctop : ""
            }`}
            onClick={() => onCategoryChange(null)}>
            <h5>Все категории</h5>
          </div>
        )}
        {updatedCategories.map((category, index) => {
          if (index === 0) return null;
          return (
            <div
              key={index}
              className={`${styles.category} ${
                activeCategory === index ? styles.activeDesctop : ""
              }`}
              onClick={() => onCategoryChange(index)}>
              <h5>{category.name}</h5>
            </div>
          );
        })}
      </div>

      <div className={styles.categoryDropdown}>
        <div
          className={`${styles.dropdownHeader} ${
            dropdownOpen ? styles.active : ""
          }`}
          onClick={() => setDropdownOpen(!dropdownOpen)}>
          <h3>
            {activeCategory === null
              ? "Все категории"
              : updatedCategories[activeCategory]?.name}
          </h3>
          <img
            src={
              dropdownOpen
                ? "/images/icons/arrow-up.svg"
                : "/images/icons/arrow-dropdowsn-down.svg"
            }
            alt="Toggle Arrow"
            className={`${styles.dropdownArrow} ${
              dropdownOpen ? styles.active : ""
            }`}
          />
        </div>
        {dropdownOpen && (
          <ul
            className={`${styles.dropdownList} ${
              dropdownOpen ? styles.active : ""
            }`}>
            <li className={`${styles.disabled}`} aria-disabled="true">
              <p>Пустая категория</p>
            </li>
            {showAllCategoriesFilters && (
              <li
                onClick={() => {
                  onCategoryChange(null);
                  setDropdownOpen(false);
                }}>
                <p>Все категории</p>
              </li>
            )}
            {updatedCategories.map((category, index) => {
              if (index === 0) return null;
              return (
                <li
                  key={index}
                  onClick={() => {
                    onCategoryChange(index);
                    setDropdownOpen(false);
                  }}>
                  <p>{category.name}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default SidebarCategories;
