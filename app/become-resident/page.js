import HeaderText from '@/components/UI/HeaderText/HeaderText'
import Line from '@/components/BecomeResident/Line/Line'
import TrainingProgram from '@/components/BecomeResident/TrainingProgram.jsx/TrainingProgram'
import TeachingStaff from '@/components/TeachingStaff/TeachingStaff'
import BannerSlider from '@/components/UI/BannerSlider/BannerSlider'
import EducationApplication from '@/components/UI/EducationApplication/EducationApplication'
import InterestingForSurgeons from '@/components/UI/InterestingForSurgeons/InterestingForSurgeons'

export default function page() {
	return (
		<>
			<HeaderText>Стать резидентом</HeaderText>
			<BannerSlider data={bannersData} size={'medium'} theme={'light'} />
			<Line data={firstLine} />
			<TrainingProgram />
			<TeachingStaff />
			<EducationApplication />
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

const bannersData = [
	{
		id: 0,
		background: 'light',
		headerData: [
			{
				id: 0,
				text: 'Выпуск передачи «Наблюдатель»',
				className: 'default',
			},
		],
		image: '/images/banners/banner-4.png',
		body: 'В гостях у ведущей Фёклы Толстой сооснователи школы Илья Черниковский и Михаил Ласков, директор школы Надежда Кузнецова и резидент первого набора Эмиль Чир-Чир.',
		buttonText: 'Узнать подробнее',
		buttonLink: '/',
	},
	{
		id: 1,
		background: 'light',
		headerData: [
			{
				id: 0,
				text: 'Старт набора на колопроклогию',
				className: 'default',
			},
		],
		image: '/images/banners/banner-5.png',
		body: 'В феврале проходит набор на специализацию колопроктология. Подайте заявку уже сейчас, чтобы начать обучение в октябре 2024.',
		buttonText: 'Подать заявку',
		buttonLink: '/contacts',
	},
]
