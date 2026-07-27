'use client'
import styles from './CookieButton.module.scss'
import {Squircle} from "corner-smoothing";

const CookieButton = ({ theme, text, isDisabled, onClick }) => {

	return (
		<div
			className={`${styles.container} ${styles[`${theme}Container`]} ${isDisabled ? styles.disabledContainer : ''}`}
		>
			<Squircle
				cornerRadius={16}
				cornerSmoothing={0.9}
				borderWidth={1}
			>
				<button
					className={styles.buttonContainer}
					onClick={onClick}
					disabled={isDisabled}
				>
					<div className={styles.buttonText}>{text}</div>
				</button>
			</Squircle>
		</div>
	)
}

export default CookieButton
