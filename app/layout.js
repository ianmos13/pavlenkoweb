import './globals.scss'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import CookieModal from '@/components/UI/CookieModal/CookieModal';
import StoreProvider from "@/app/StoreProvider";

export const metadata = {
	title: 'Школа Павленко',
	description:
		'Некоммерческий образовательный проект по подготовке специализированных хирургов-онкологов для выпускников ординатур.',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='true'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap'
					rel='stylesheet'
				></link>
			</head>
			<StoreProvider>
				<body>
					<Header />
					<container>{children}</container>
					<CookieModal />
					<Footer />
				</body>
			</StoreProvider>
		</html>
	)
}
