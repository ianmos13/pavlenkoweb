'use client'
import styles from './SubscribeButton.module.scss'
import { Squircle } from 'corner-smoothing'
import Image from "next/image";
import {useState} from "react";
import FilledHeart from "@/public/images/icons/heart-filled-white.svg";
import FilledHeartRed from "@/public/images/icons/heart-filled-red.svg";
import FilledHeartDark from "@/public/images/icons/heart-filled-dark.svg";
import Heart from "@/public/images/icons/heart.svg";

const SubscribeButton = (props) => {
	const { text, theme, isDisabled, onClick } = props

	const withIcon = ['support', 'footer', 'join', 'joinBanner', 'shareJoinBanner'].indexOf(theme) > -1
	const [isHovering, setIsHovered] = useState(false);
	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	const imageSrc = isHovering ?
		isDisabled ? FilledHeart :
		theme ==='shareJoinBanner' ? FilledHeartDark :
			withIcon ? FilledHeartRed :
			FilledHeart :
		Heart

	const containerClass = `${styles.container} ${styles[`${theme}Container`]} ${withIcon ? styles.containerWithIcon : ''} ${isDisabled ? styles.disabledContainer : ''}`
	return (
		<div
			className={containerClass}
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
