import DonationComponent from '@/components/UI/DonationComponent/DonationComponent'
import styles from './DonationComponentPrivateDonors.module.scss'

export default function DonationComponentsPrivateDonors() {
	return (
		<section className={`${styles.block} container`}>
			<DonationComponent id="private_donors_dontaion"/>
		</section>
	)
}
