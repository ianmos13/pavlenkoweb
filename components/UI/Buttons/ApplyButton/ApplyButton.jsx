'use client'
import styles from './ApplyButton.module.scss'
import {Squircle} from "corner-smoothing";

const ApplyButton = ({ text, isDisabled, onClick }) => {
	return (
		<div
			className={`${styles.container} ${isDisabled ? styles.disabledContainer : ''}`}
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
					<div className={styles.iconContainer}>
						<svg className={styles.icon} />
					</div>
				</button>
			</Squircle>
		</div>
	)
}

export default ApplyButton
