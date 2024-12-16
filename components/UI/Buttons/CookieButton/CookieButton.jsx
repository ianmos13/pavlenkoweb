'use client'
import styles from './CookieButton.module.scss'

const CookieButton = ({ text, isDisabled, onClick }) => {
	return (
		<button
			className={styles.buttonContainer}
			onClick={onClick}
			disabled={isDisabled}
		>
			<div className={styles.buttonText}>{text}</div>
		</button>
	)
}

export default CookieButton
