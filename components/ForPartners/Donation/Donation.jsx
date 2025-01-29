import DonationComponent from '@/components/UI/DonationComponent/DonationComponent'
import styles from './Donation.module.scss'
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function Donation() {
	return (
		<AnimatedComponent>
			<section className={`${styles.container} container`}>
				<DonationComponent id="for_partners_dontaion"/>
			</section>
		</AnimatedComponent>
	)
}
