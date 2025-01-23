'use client'
import styles from './SubscribeButton.module.scss'
import { Squircle } from 'corner-smoothing'
import Image from "next/image";
import {useState} from "react";
import FilledHeart from "@/public/images/icons/heart-filled-white.svg";
import Heart from "@/public/images/icons/heart.svg";

const SubscribeButton = (props) => {
	const { text, theme, isDisabled, onClick } = props

	const withIcon = ['support', 'footer'].indexOf(theme) > -1
	const [isHovering, setIsHovered] = useState(false);
	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	const imageSrc = isHovering ? FilledHeart : Heart

	return (
		<div
			className={`${styles.container} ${withIcon ? styles.containerWithIcon : ''} ${isDisabled ? styles.disabledContainer : ''}`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
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
					<div className={styles.buttonText}>
						{ text }
					</div>
					{withIcon && (
						<div className={styles.buttonImage}>
							<Image src={imageSrc} alt='Heart' />
						</div>
					)}
				</button>
			</Squircle>
		</div>
	)
}

export default SubscribeButton
