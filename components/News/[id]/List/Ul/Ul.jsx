import Heart from '@/public/images/icons/heart-filled-black.svg'
import Image from 'next/image'
import styles from './Ul.module.scss'

export default function Ul({ arrayList }) {
	return (
		<ul className={styles.list}>
			{arrayList.map(item => (
				<li key={item.id} className={styles.listItem}>
					<Image src={Heart} className={styles.icon} />
					<h3>{item.text}</h3>
				</li>
			))}
		</ul>
	)
}
