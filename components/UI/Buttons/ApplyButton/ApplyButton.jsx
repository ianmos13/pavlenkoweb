'use client'
import styles from './ApplyButton.module.scss'

const ApplyButton = ({ text, isDisabled, onClick }) => {
	return (
		<button
			className={styles.buttonContainer}
			onClick={onClick}
			disabled={isDisabled}
		>
			<div className={styles.buttonText}>{text}</div>
			<div className={styles.iconContainer}>
				<svg className={styles.icon} />
			</div>
		</button>
	)
}

export default ApplyButton
