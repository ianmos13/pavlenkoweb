import SubscribeButton from '@/components/UI/Buttons/SubscribeButton/SubscribeButton'
import Logo from '@/public/images/Logos/Logo_Cross.svg'
import Image from 'next/image'
import styles from './Subscribe.module.scss'

export default function Subscribe() {
	return (
		<section className={`${styles.container} container`}>
			<div className={styles.mainContainer}>
				<div className={styles.formContainer}>
					<div className={styles.header}>
						<h3>Подпишись на рассылку!</h3>
						<h4>
							В рассылке рассказываем то-то и то-то. Присылать письма будем раз в неделю. В рассылке рассказываем то-то и то-то. Присылать письма будем раз в неделю.
						</h4>
					</div>
					<div className={styles.inputContainer}>
						<div className={styles.helper}>
							<div className={styles.form}>
								<input
									className={styles.input}
									type='text'
									placeholder='E-mail'
								/>
								<SubscribeButton text={'Подписаться'} />
							</div>
							<div className={styles.label}>
								<label>
									Нажимая на кнопку, вы даете согласие на обработку персональных
									данных и соглашаетесь с политикой конфиденциальности
								</label>
							</div>
						</div>
						<div className={styles.tabLogo}>
							<Image src={Logo} className={styles.logo} alt='' />
						</div>
					</div>
				</div>
				<div className={styles.logoContainer}>
					<Image src={Logo} className={styles.logo} alt='' />
				</div>
			</div>
		</section>
	)
}
