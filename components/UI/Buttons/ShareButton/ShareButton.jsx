'use client'
import styles from './ShareButton.module.scss'
import { Squircle } from 'corner-smoothing'
import Image from "next/image";
import {useState} from "react";
import HoveredShareGrey from "@/public/images/icons/share-grey.svg";
import HoveredShareRed from "@/public/images/icons/share-red.svg";
import Share from "@/public/images/icons/share.svg";

const ShareButton = (props) => {
	const { text, onClick, theme } = props

	const [isHovering, setIsHovered] = useState(false);
	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	const imageSrc = isHovering ?
		theme==='red' ? HoveredShareRed : HoveredShareGrey :
		Share

	return (
		<div
			className={`${styles.container} ${styles[`${theme}Container`]}`}
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
				>
					<div className={styles.buttonText}>
						{ text }
					</div>
					<div className={styles.buttonImage}>
						<Image src={imageSrc} alt='Share' />
					</div>
				</button>
			</Squircle>
		</div>
	)
}

export default ShareButton
