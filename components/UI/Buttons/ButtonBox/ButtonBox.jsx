'use client'
import styles from './ButtonBox.module.scss'

const ButtonBox = (props) => {
	const { className, children } = props

	return (
		<div className={`${styles.buttonContainer} ${className}`} >
			{children}
		</div>
	)
}

export default ButtonBox
