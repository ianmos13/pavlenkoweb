import PublicationLibrary from '@/components/Publications/PublicationLibrary/PublicationLibrary'

import BannerSlider from "@/components/UI/BannerSlider/BannerSlider";
import RunningLines from "@/components/UI/RunningLines/RunningLines";
import HeaderText from "@/components/UI/HeaderText/HeaderText";
export default function page() {
	return (
		<>
			<HeaderText>Публикации о школе</HeaderText>
			<BannerSlider
				data={bannersData}
				size={'medium'}
				theme={"light"}
			/>
			<RunningLines
				data={linesData}
				isImages={true}
			/>
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

const bannersData = [
	{
		id: 0,
		background: "light",
		headerData: [
			{
				id: 0,
				text: "Выпуск передачи «Наблюдатель»",
				className: 'default'
			}
		],
		image: "/images/banners/banner-4.png",
		body: "В гостях у ведущей Фёклы Толстой сооснователи школы Илья Черниковский и Михаил Ласков, директор школы Надежда Кузнецова и резидент первого набора Эмиль Чир-Чир.",
		buttonText: "Узнать подробнее",
		buttonLink: "/",
	},
	{
		id: 1,
		background: "light",
		headerData: [
			{
				id: 0,
				text: "Выпуск передачи «Наблюдатель»",
				className: 'default'
			}
		],
		image: "/images/banners/banner-5.png",
		body: "В гостях у ведущей Фёклы Толстой сооснователи школы Илья Черниковский и Михаил Ласков, директор школы Надежда Кузнецова и резидент первого набора Эмиль Чир-Чир.",
		buttonText: "Узнать подробнее",
		buttonLink: "/contacts",
	}
];
