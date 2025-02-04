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
				{/* Yandex.Metrika */}
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `
                         (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
						   m[i].l=1*new Date();
						   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
						   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
						   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
						
						   ym(87098408, "init", {
								clickmap:true,
								trackLinks:true,
								accurateTrackBounce:true,
								webvisor:true
						   });
                        `,
					}}
				/>
				{/* Noscript для Yandex.Metrika */}
				<noscript>
					<div>
						<img
							src="https://mc.yandex.ru/watch/87098408"
							style={{ position: "absolute", left: "-9999px" }}
							alt=""
						/>
					</div>
				</noscript>
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
