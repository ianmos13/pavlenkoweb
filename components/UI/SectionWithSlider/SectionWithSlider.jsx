'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './SectionWithSlider.module.scss'
import ContainerTitle from "@/components/UI/ContainerTitle/ContainerTitle";


const SectionWithSlider = ({ titleOptions, children }) => {
	return (
		<section
			className={styles.container}
			style={titleOptions.containerStyles}
		>
			<ContainerTitle
				titleText={titleOptions.title}
				buttonText={titleOptions.buttonText}
				buttonTheme={titleOptions.buttonTheme}
				buttonUrl={titleOptions.buttonUrl}
			>
				{children}
			</ContainerTitle>
		</section>
	)
}

export default SectionWithSlider
