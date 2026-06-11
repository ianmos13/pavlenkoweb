import styles from './SupportButton.module.scss'
import {useState} from "react";

const SupportButton = (props) => {
	const { theme, isDisabled, onClick } = props
	const [isHovering, setIsHovered] = useState(false);
	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	return (
		<button
			className={`${styles.buttonContainer} ${styles[`${theme}Container`]}`}
			onClick={onClick}
			disabled={isDisabled}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<span>Поддержать</span>
			<div className={styles.buttonImage}>
				<svg className={`${styles.icon} ${isHovering ? styles.hovering : '' }`} />
			</div>
		</button>
	)
}

export default SupportButton
