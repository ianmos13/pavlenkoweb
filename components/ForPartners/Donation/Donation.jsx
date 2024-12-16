import DonationComponent from '@/components/UI/DonationComponent/DonationComponent'
import styles from './Donation.module.scss'

export default function Donation() {
	return (
		<section className={`${styles.container} container`}>
			<DonationComponent />
		</section>
	)
}
