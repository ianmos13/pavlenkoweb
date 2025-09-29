import styles from './Text.module.scss'
export default function Text({ data }) {
	return (
		<section className={`${styles.container} container`}>
			{data.map((text, index) => (
				<h3
					key={index}
					dangerouslySetInnerHTML={{ __html: text }}
				/>
			))}
		</section>
	)
}
