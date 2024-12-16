'use client'
import styles from './SubscribeButton.module.scss'

const SubscribeButton = ({ text, isDisabled, onClick }) => {
	return (
		<button
			className={styles.buttonContainer}
			onClick={onClick}
			disabled={isDisabled}
		>
			<div className={styles.buttonText}>
				{ text }
			</div>
		</button>
	)
}

export default SubscribeButton
