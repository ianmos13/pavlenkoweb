import CookieButton from '@/components/UI/Buttons/CookieButton/CookieButton'
import styles from './Return.module.scss'
import { useRouter } from "next/navigation";

export default function Return() {
	const router = useRouter();
	return (
		<section className={`${styles.container} container`}>
			<CookieButton  onClick={() => router.back()} text={'Назад в новости школы'} />
		</section>
	)
}
