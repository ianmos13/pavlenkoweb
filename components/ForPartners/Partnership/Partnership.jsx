import QuestionsList from '@/components/UI/ContainerWithSidebar/QuestionsList/QuestionsList'
import styles from './Partnership.module.scss'

export default function Partnership() {
	return (
		<section className={`${styles.block} container`}>
			<div className={styles.container}>
				<div className={styles.topContainer}>
					<h2>Возможности для сотрудничества</h2>
					<QuestionsList
						questions={questions}
						withBc={true}
						withPadding={true}
						separator={false}
					/>
				</div>
				<div className={styles.bottomContainer}>
					<div className={styles.tile}>
						<h3 style={{ color: '#ED3834' }}>Единственная в России</h3>
						<p>
							Программа по подготовке специализированных хирургов-онкологов для
							выпускников ординатур (аналог fellowship)
						</p>
					</div>
					<div className={styles.tile}>
						<h3 style={{ color: '#ED3834' }}>
							Школа делает системные изменения
						</h3>
						<p>
							Каждый выпускник школы за свою карьеру сделает не менее 2 000
							больших операций по современным стандартам, а с учетом
							консультаций и малых операций поможет не менее чем 10 000
							пациентов
						</p>
					</div>
					<div className={styles.tile}>
						<h3 style={{ color: '#ED3834' }}>Эффективные инвестиции</h3>
						<p>
							Результат которых будет работать десятилетия и улучшит качество
							жизни людей в масштабах страны
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

const questions = [
	{
		question:
			'Партнёры На решение каких социально значимых проблем будут направлены ваши инвестиции?',
		answer:
			'Ответ на вопрос. Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ н',
	},
	{
		question: 'Партнёры Как мы измеряем эффективность работы школы?',
		answer:
			'Ответ на вопрос. Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ на вопрос.Ответ н',
	},
]

const info = [
	{
		header: 'Единственная в России',
		text: 'Программа по подготовке специализированных хирургов-онкологов для выпускников ординатур (аналог fellowship)',
	},
	{
		header: '500 пациентов',
		text: 'такая нагрузка приходится в среднем на одного врача-онколога сегодня',
	},
	{
		header: '80% пациентов',
		text: 'с диагнозом рак, нуждаются в срочном хирургическом вмешательстве',
	},
	{
		header: 'не более 30%',
		text: 'онкологических пациентов получают доступ к cвоевременной, безопасной и доступной хирургической помощи',
	},
]
