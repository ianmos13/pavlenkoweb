'use client'

import styles from './PaymentSecurity.module.scss'
import SubscribeForm from "@/components/UI/Subscribe/SubscribeForm/SubscribeForm";
import SubscribePopup from "@/components/UI/Subscribe/SubscribePopup/SubscribePopup";
import {useState} from "react";

export default function PaymentSecurity() {
	const [isPopupVisible, setIsPopupVisible] = useState(false);

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
					<SubscribeForm theme="payment" setIsPopupVisible={setIsPopupVisible} />
				</div>
			</div>
			{isPopupVisible && <SubscribePopup onClose={() => setIsPopupVisible(false)} />}
		</section>
	)
}
