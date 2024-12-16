import styles from './Header.module.scss'
export default function Header() {
	return (
		<section className={`${styles.header} container`}>
			<h1 style={{ color: '#191C1F' }}>Частным донорам</h1>
		</section>
	)
}
