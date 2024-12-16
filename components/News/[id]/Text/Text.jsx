import styles from './Text.module.scss'
export default function Text({ text1, text2 }) {
	return (
		<section className={`${styles.container} container`}>
			<h3>{text1}</h3>
			<h3>{text2}</h3>
		</section>
	)
}
