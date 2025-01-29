import AboutAdministration from '@/components/AboutUs/AboutAdministration/AboutAdministration'
import AboutPavlenko from '@/components/AboutUs/AboutPavlenko/AboutPavlenko'
import AboutProgramm from '@/components/AboutUs/AboutProgramm/AboutProgramm'
import AboutUsHeader from '@/components/AboutUs/AboutUsHeader/AboutUsHeader'
import CompletedSetsSlider from '@/components/AboutUs/CompletedSets/CompletedSets'
import InterestingForSurgeons from '@/components/UI/InterestingForSurgeons/InterestingForSurgeons'
import Subscribe from '@/components/UI/Subscribe/Subscribe'
import SliderWithPopup from "@/components/UI/SliderWithPopup/SliderWithPopup";

export default function page() {
	return (
		<>
			<AboutUsHeader />
			<AboutProgramm />
			<AboutPavlenko />
			<InterestingForSurgeons theme={'blue'} data={interestingData} />
			<CompletedSetsSlider />
			<SliderWithPopup />
			<Subscribe />
			<AboutAdministration />
		</>
	)
}

const interestingData = [
	{
		header: '4SurgeonsClub',
		text: 'Международный образовательный онлайн-проект для онкохирургов под эгидой Школы Павленко. Регулярно в прямом эфире проходят тематические встречи с разбором лапароскопических, роботических и других операций. В заседаниях клуба всегда участвуют приглашенные эксперты, практикующие специалисты из разных стран мира.',
		linkText: 'Узнать больше',
		linkHref: '/4surgeonsclub',
	},
	{
		header: 'Видеоатлас',
		text: 'Цифровое образовательное пособие по наиболее распространенным операциям четырех специализаций. Видеоатлас Школы Павленко помогает собрать рекомендации по стандартам безопасной хирургии, предложенные экспертным сообществом в рамках первой очной конференции 4SurgeonsClub.',
		linkText: 'Узнать больше',
		linkHref: '/video-atlas',
	},
]
