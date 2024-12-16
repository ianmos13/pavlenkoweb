import PaymentSecurity from '@/components/IntelligentVolunteers/PaymentSecurity/PaymentSecurity'
import DonationComponentsPrivateDonors from '@/components/PrivateDonors/DonationComponentPrivateDonors/DonationComponentsPrivateDonors'
import FAQ from '@/components/UI/FAQ/FAQ'
import Header from '@/components/PrivateDonors/Header/Header'
import RunningLines from "@/components/UI/RunningLines/RunningLines";

export default function page() {
	return (
		<>
			<Header />
			<DonationComponentsPrivateDonors />
			<RunningLines
				data={linesData}
				headerData={"Недавно нам помогли"}
			/>
			<PaymentSecurity />
			<FAQ />
		</>
	)
}

const linesData = {
	firstLine: [
		'Иван Федоров',
		'Компания №1',
		'Иван Федоров',
		'Иван Федоров',
		'Компания №3',
		'Иван Федоров',
		'Компания №1',
		'Иван Федоров',
		'Иван Федоров',
		'Компания №3',
		'Иван Федоров',
	],
	secondLine: [
		'Компания №4',
		'Иван Федоров',
		'Компания №2',
		'Иван Федоров',
		'70% практики',
		'Иван Федоров',
		'Компания №4',
		'Иван Федоров',
		'Компания №2',
		'Иван Федоров',
		'70% практики',
		'Иван Федоров',
	]
}
