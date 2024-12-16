import HeaderText from '@/components/UI/HeaderText/HeaderText'
import Line from '@/components/BecomeResident/Line/Line'
import TrainingProgram from '@/components/BecomeResident/TrainingProgram.jsx/TrainingProgram'
import TeachingStaff from '@/components/TeachingStaff/TeachingStaff'
import BannerSlider from '@/components/UI/BannerSlider/BannerSlider'
import EducationApplication from '@/components/UI/EducationApplication/EducationApplication'
import InterestingForSurgeons from '@/components/UI/InterestingForSurgeons/InterestingForSurgeons'
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import BannersSection from '@/components/BecomeResident/BannersSection/BannersSection'

export default function page() {
	return (
		<>
			<HeaderText>Стать резидентом</HeaderText>
			<AnimatedComponent>
				<BannersSection/>
			</AnimatedComponent>
			<AnimatedComponent>
				<Line data={firstLine} />
			</AnimatedComponent>
			<AnimatedComponent>
				<TrainingProgram />
			</AnimatedComponent>
			<AnimatedComponent>
				<TeachingStaff />
			</AnimatedComponent>
			<AnimatedComponent>
				<EducationApplication />
			</AnimatedComponent>
			<AnimatedComponent>
				<InterestingForSurgeons
					theme={'white'}
					data={interestingData}
					bottom={true}
				/>
			</AnimatedComponent>
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

const firstLine = [
	'Работа с наставником',
	'Мультидисциплинарный подход',
	'Стипендия',
	'70% практики',
	'Стажировки и ротации',
	'Работа с наставником',
	'Мультидисциплинарный подход',
	'Стипендия',
	'70% практики',
	'Стажировки и ротации',
]

