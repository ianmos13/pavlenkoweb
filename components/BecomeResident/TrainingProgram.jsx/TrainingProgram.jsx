import QuestionsList from '@/components/UI/ContainerWithSidebar/QuestionsList/QuestionsList'
import styles from './TrainingProgram.module.scss'
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function TrainingProgram() {
	return (
		<AnimatedComponent>
		<div className={`${styles.container} container`}>
			<div className={styles.block}>
				<div className={styles.description}>
					<h3>
						<span className={styles.focusText}>Программа Школы Павленко</span>{' '}
						является аналогом международного fellowship (специализации) по
						хирургической онкологии, который за счет наставничества и большого
						количества практики позволяет хирургу с базовым опытом стать за два
						года самостоятельным хирургом-онкологом по определенной локализации.
					</h3>
					<h3>
						Образовательная программа разработана для онкологов, хирургов и
						торакальных хирургов — выпускников ординатуры и рассчитана на два
						года обучения под руководством наставников.
					</h3>
				</div>
				<div className={styles.questionBlock}>
					<h2>Процесс прохождения программы</h2>
					<QuestionsList
						withBc={true}
						withPadding={true}
						questions={questions}
					/>
				</div>
			</div>
		</div>
		</AnimatedComponent>
	)
}

const questions = [
	{
		question: '1. Поступление',
		answer:
			'Необходимо заполнить анкету участника на сайте школы. Написать биографическое эссе и предоставить рекомендации. Пройти онлайн-тестирование: проверка актуальных знаний, тест на знание английского языка, предоставление видеозаписи операции. Пройти интервью с наставниками и тестирование по модели Hogan.',
	},
	{
		question: '2. Условия',
		answer:
			'Резиденты поступают в школу на конкурсной основе, обучение бесплатно. Выплачивается ежемесячная стипендия. Также резиденты трудоустраиваются на часть ставки в штат одной из больниц-участниц программы. При необходимости школа помогает с переездом в город обучения.',
	},
	{
		question: '3. Формат',
		answer:
			'В основе обучения — 70% практики: более 150 операций с частичной ассистенцией и наблюдением, свыше 40 операций под наблюдением наставника. Мультидисциплинарный подход. Теоретические дисциплины проходят в очном и онлайн-форматах.',
	},
	{
		question: '4. Результат',
		answer:
			'По окончании программы резиденты получают диплом государственного образца о профессиональной переподготовке — у Школы Павленко есть образовательная лицензия. Наши выпускники становятся самостоятельными, опытными хирургами, которые могут эффективно влиять на качество жизни и успешное лечение пациентов с онкологическим диагнозом. А также становятся частью профессионального сообщества Школы Павленко.',
	},
]
