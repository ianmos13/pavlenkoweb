import styles from './HeaderText.module.scss'

export default function HeaderText({children, theme}) {
	return (
		<div className={`${styles.textContainer} ${styles[`${theme}Container`]} container`}>
			<h1>{children}</h1>
		</div>
	)
}
