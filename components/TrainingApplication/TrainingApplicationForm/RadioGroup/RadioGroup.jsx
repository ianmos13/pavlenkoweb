import styles from './RadioGroup.module.scss';

const RadioGroup = ({ label, name, options, onChange, selectedValue }) => (
  <div className={styles.radioGroup}>
    <div className={styles.subLabel}>
      <h5>{label}</h5>
    </div>
    {options.map((option, index) => (
      <label key={index} className={styles.radioOption}>
        <input
          type="radio"
          name={name}
          value={option.value}
          onChange={onChange}
          className={styles.radioInput}
          checked={selectedValue === option.value} 
        />
        <span className={styles.radioVisual}></span>
        <p className={styles.radioLabel}>{option.label}</p>
      </label>
    ))}
  </div>
);

export default RadioGroup;
