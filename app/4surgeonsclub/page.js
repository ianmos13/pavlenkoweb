import SurgeonsClubHeader from '@/components/4surgeonsclub/SurgeonsClubHeader/SurgeonsClubHeader'
import CoverflowSwiper from '@/components/UI/CoverflowSwiper/CoverflowSwiper'
import InterestingForSurgeons from '@/components/UI/InterestingForSurgeons/InterestingForSurgeons'
import RunningLines from '@/components/UI/RunningLines/RunningLines'
import Subscribe from '@/components/UI/Subscribe/Subscribe'
import MostInteresting from "@/components/4surgeonsclub/MostInteresting/MostInteresting";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function page() {
	return (
		<>
			<SurgeonsClubHeader />
			<AnimatedComponent>
				<MostInteresting />
			</AnimatedComponent>
			<AnimatedComponent>
				<RunningLines data={linesData} isImages={true} />
			</AnimatedComponent>
			<AnimatedComponent>
				<InterestingForSurgeons theme={'blue'} data={interestingData} />
			</AnimatedComponent>
			<AnimatedComponent>
				<CoverflowSwiper data={swiperData} />
			</AnimatedComponent>
			<AnimatedComponent>
				<Subscribe />
			</AnimatedComponent>
		</>
	)
}

const interestingData = [
	{
		header: 'Сообщество в телеграмм',
		text: 'Смотрите мастер-классы ведущих хирургов в прямом эфире, узнавайте полезную информацию, задавайте вопросы, делитесь личным опытом и присоединяйтесь к сообществу неравнодушных профессионалов!',
		linkText: 'Вступить в группу',
		linkHref: 'https://t.me/FourSurgeons ',
	},
	{
		header: '4SurgeonsClub Junior',
		text: 'Если вы учитесь в медицинском вузе, ординатуре или аспирантуре, ждем вас на канале 4SurgeonsClub Junior! Это научно-практическое общество молодых специалистов. Встречи проходят в гибридном формате, очном или онлайн. Участие в заседаниях клуба бесплатное, а программа насыщенная и полезная.   ',
		linkText: 'Узнать больше',
		linkHref: 'https://t.me/foursurgeonsclub_junior',
	},
]

const swiperData = [
	'/images/club/slider-1.webp',
	'/images/club/slider-2.webp',
	'/images/club/slider-3.webp',
	'/images/club/slider-4.webp',
	'/images/club/slider-1.webp',
	'/images/club/slider-2.webp',
	'/images/club/slider-3.webp',
	'/images/club/slider-4.webp',
]

const linesData = {
	firstLine: [
		'/images/Logos/Logo_VrachiRF.svg',
		'/images/Logos/Logo_amgen.svg',
		'/images/Logos/Logo_bowa.svg',
		'/images/Logos/Logo_Medach_gray.svg',
		'/images/Logos/Logo_davinci.svg',
		'/images/Logos/Logo_engine.svg',
		'/images/Logos/Logo_erbe.svg',
		'/images/Logos/Logo_ethicon.svg',
		'/images/Logos/Logo_ethicon2.svg',
	],
}
