import ImageBlock from '@/components/UI/ImageBlock/ImageBlock'
import styles from './ImageBox.module.scss'
export default function ImageBox({
	textData,
	TopLeft,
	TopRight,
	BottomLeft,
	BottomRight,
}) {
	return (
		<section className={`${styles.container} container`}>
			<div className={styles.textContainer}>
				{ textData && textData.map((text, i) => (
					<h3 key={i}>{text}</h3>
				))}
			</div>
			<div className={styles.imageContainer}>
				<ImageBlock
					TopLeft={TopLeft}
					TopRight={TopRight}
					BottomLeft={BottomLeft}
					BottomRight={BottomRight}
				/>
			</div>
		</section>
	)
}
