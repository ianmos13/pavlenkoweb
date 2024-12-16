'use client'
import styles from './LearnMoreButton.module.scss'

const LearnMoreButton = ({ text, isDisabled, onClick, theme }) => {
	return (
		<button
			className={`${styles.buttonContainer} ${styles[`${theme}Button`]}`}
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

export default LearnMoreButton
