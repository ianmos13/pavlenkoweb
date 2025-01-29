import PublicationLibrary from '@/components/Publications/PublicationLibrary/PublicationLibrary'
import BannersSection from '@/components/Publications/BannersSection/BannersSection';
import RunningLines from "@/components/UI/RunningLines/RunningLines";
import HeaderText from "@/components/UI/HeaderText/HeaderText";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function page() {
	return (
		<>
			<HeaderText>Публикации о школе</HeaderText>
			<BannersSection />
			<AnimatedComponent>
				<RunningLines
					data={linesData}
					isImages={true}
				/>
			</AnimatedComponent>
			<PublicationLibrary />
		</>
	)
}

const linesData = {
	firstLine: [
		"/images/Logos/Logo_Smotrim.svg",
		"/images/Logos/Logo_Komersant.svg",
		"/images/Logos/Logo_RGRU.svg",
		"/images/Logos/Logo_Izvestia.svg",
		"/images/Logos/Logo_NTV.svg",
		"/images/Logos/Logo_RBK.svg",
		"/images/Logos/Logo_Komsom_pravda.svg",
		"/images/Logos/Logo_Dog.svg",
		"/images/Logos/Logo_Medach.svg",
		"/images/Logos/Logo_UTV.svg",
		"/images/Logos/Logo_Pokast.svg",
		"/images/Logos/Logo_Maraphonec.svg",
	]
}

