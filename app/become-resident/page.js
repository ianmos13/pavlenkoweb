import HeaderText from '@/components/UI/HeaderText/HeaderText'
import Line from '@/components/BecomeResident/Line/Line'
import TrainingProgram from '@/components/BecomeResident/TrainingProgram.jsx/TrainingProgram'
import TeachingStaff from '@/components/TeachingStaff/TeachingStaff'
import EducationApplication from '@/components/UI/EducationApplication/EducationApplication'
import InterestingForSurgeons from '@/components/UI/InterestingForSurgeons/InterestingForSurgeons'
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function page() {
	return (
		<>
			<HeaderText>Стать резидентом</HeaderText>
			<EducationApplication />
			<AnimatedComponent>
				<Line  />
			</AnimatedComponent>
			<TrainingProgram />
			<TeachingStaff />
			<InterestingForSurgeons
				theme={'white'}
				data={interestingData}
				bottom={true}
			/>
		</>
	)
}

const interestingData = [
	{
		header: '4SurgeonsClub',
		text: 'Международный образовательный онлайн-проект для\u00A0онкохирургов под\u00A0эгидой Школы Павленко. Регулярно в\u00A0прямом эфире проходят тематические встречи с\u00A0разбором лапароскопических, роботических и\u00A0других операций. В\u00A0заседаниях клуба всегда участвуют приглашенные эксперты, практикующие специалисты из\u00A0разных стран мира.',
		linkText: 'Узнать больше',
		linkHref: '/4surgeonsclub',
	},
	{
		header: 'Видеоатлас',
		text: 'Цифровое образовательное пособие по\u00A0наиболее распространенным операциям четырех специализаций. Видеоатлас Школы Павленко помогает собрать рекомендации по\u00A0стандартам безопасной хирургии, предложенные экспертным сообществом в\u00A0рамках первой очной конференции 4SurgeonsClub.',
		linkText: 'Узнать больше',
		linkHref: '/video-atlas',
	},
]


