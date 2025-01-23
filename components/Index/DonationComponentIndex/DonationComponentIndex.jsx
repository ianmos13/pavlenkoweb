import DonationComponent from '@/components/UI/DonationComponent/DonationComponent'
import styles from './DonationComponentIndex.module.scss'

export default function DonationComponentIndex() {
	return (
		<section className={`${styles.block} container`}>
			<DonationComponent id="index_dontaion"/>
		</section>
	)
}
