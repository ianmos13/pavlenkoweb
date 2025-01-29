import DonationComponent from '@/components/UI/DonationComponent/DonationComponent'
import styles from './DonationComponentPrivateDonors.module.scss'
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function DonationComponentsPrivateDonors() {
	return (
		<AnimatedComponent>
		<section className={`${styles.block} container`}>
			<DonationComponent id="private_donors_dontaion"/>
		</section>
		</AnimatedComponent>
	)
}
