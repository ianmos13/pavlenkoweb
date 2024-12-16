'use client'

import styles from './SupportButton.module.scss'
import Image from "next/image";
import HeartDark from "@/public/images/icons/heart-dark.svg";
import Heart from "@/public/images/icons/heart.svg";
import FilledHeart from '@/public/images/icons/heart-filled-white.svg'
import FilledHeartDark from '@/public/images/icons/heart-filled-dark.svg'
import {useState} from "react";

const SupportButton = (props) => {
	const { theme, isDisabled, onClick } = props
	const [isHovering, setIsHovered] = useState(false);
	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	const imageSrc = theme === "dark" ?
		(isHovering ? FilledHeartDark : HeartDark) : (isHovering ? FilledHeart : Heart)

	return (
		<button
			className={`${styles.buttonContainer} ${styles[`${theme}Container`]}`}
			onClick={onClick}
			disabled={isDisabled}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<span>Поддержать</span>
			<Image className={styles.buttonImage} src={imageSrc} alt='Heart' />
		</button>
	)
}

export default SupportButton
