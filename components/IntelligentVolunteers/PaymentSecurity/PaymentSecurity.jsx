import SubscribeButton from '@/components/UI/Buttons/SubscribeButton/SubscribeButton'
import styles from './PaymentSecurity.module.scss'

export default function PaymentSecurity() {
	return (
		<section className={`${styles.container} container`}>
			<div className={styles.headerContainer}>
				<h2>Безопасность платежей</h2>
			</div>
			<div className={styles.mainContainer}>
				<div className={styles.textContainer}>
					<p>
						Ваши переводы безопасны – мы не храним данные банковских карт и
						используем шифрование, чтобы защитить данные от третьих лиц.
						Ежемесячные пожертвования можно остановить в любой момент через
						службу поддержки
					</p>
				</div>
				<div className={styles.formContainer}>
					<div className={styles.header}>
						<h4>
							Вы можете увидеть, как расходуются ваши пожертвования в наших
							годовых отчетах, а также можете подписаться на нашу рассылку, в
							которой мы рассказывает о наших новостях.
						</h4>
					</div>
					<div className={styles.inputContainer}>
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
				</div>
			</div>
		</section>
	)
}
