import React from 'react';
import styles from './CheckboxGroup.module.scss';

const CheckboxGroup = ({ label, name, options, onChange, value }) => (
  <div className={styles.checkboxGroup}>
    <div className={styles.subLabel}>
      <h5>{label}</h5>
    </div>
    {options.map((option, index) => (
      <label key={index} className={styles.checkboxItem}>
        <input
          type="checkbox"
          name={name}
          value={option}
          checked={value.includes(option)} 
          onChange={onChange}
          className={styles.checkbox}
        />
        <p className={styles.radioOption}>{option}</p>
      </label>
    ))}
  </div>
);

export default CheckboxGroup;
