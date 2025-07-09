import { useState } from "react";
import styles from "@/components/UI/ContainerWithSidebar/SidebarCategories/SidebarCategories.module.scss";

const SidebarCategoriesSchoolTeam = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleParentClick = (id) => {
    if (openCategoryId === id) {
      setOpenCategoryId(null);
    } else {
      setOpenCategoryId(id);
    }
    onCategoryChange(id);
  };

  const getActiveName = () => {
    const found = categories.find((cat) => cat.id === activeCategory);
    if (found) return found.name;
    for (const cat of categories) {
      if (cat.subcategories) {
        const sub = cat.subcategories.find((s) => s.id === activeCategory);
        if (sub) return sub.name;
      }
    }
    return categories[0]?.name || "Вся команда";
  };

  return (
    <>
      <div className={styles.sidebar}>
        {categories.map((category) => (
          <div key={category.id === null ? "all" : category.id}>
            <div
              className={`${styles.category} ${
                activeCategory === category.id ? styles.activeDesctop : ""
              }`}
              onClick={() => handleParentClick(category.id)}>
              <h5>{category.name}</h5>
            </div>
            {category.subcategories &&
              category.subcategories.length > 0 &&
              (openCategoryId === category.id ||
                category.subcategories.some(
                  (sub) => sub.id === activeCategory
                )) && (
                <div className={styles.subCategoryWrapper}>
                  <div className={styles.subCategoryList}>
                    {category.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className={`${styles.subCategory} ${
                          activeCategory === sub.id
                            ? styles.activeSubCategory
                            : ""
                        }`}
                        onClick={() => onCategoryChange(sub.id)}>
                        <h5 style={{ fontWeight: 400 }}>{sub.name}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
      <div className={styles.categoryDropdown}>
        <div
          className={`${styles.dropdownHeader} ${
            dropdownOpen ? styles.active : ""
          }`}
          onClick={() => setDropdownOpen(!dropdownOpen)}>
          <h3>{getActiveName()}</h3>
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
            {categories.map((category) => (
              <>
                <li
                  key={category.id === null ? "all" : category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setDropdownOpen(false);
                  }}
                  style={{
                    fontWeight: activeCategory === category.id ? 600 : 400,
                  }}>
                  <p>{category.name}</p>
                </li>
                {category.subcategories &&
                  category.subcategories.length > 0 &&
                  category.subcategories.map((sub) => (
                    <li
                      key={sub.id}
                      className={styles.mobileSubCategory}
                      style={{
                        fontWeight: activeCategory === sub.id ? 600 : 400,
                      }}
                      onClick={() => {
                        onCategoryChange(sub.id);
                        setDropdownOpen(false);
                      }}>
                      <p>— {sub.name}</p>
                    </li>
                  ))}
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SidebarCategoriesSchoolTeam;
