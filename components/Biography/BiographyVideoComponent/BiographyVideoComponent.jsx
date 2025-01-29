"use client";

import VideoPlayer from '@/components/UI/VideoPlayer/VideoPlayer'
import styles from './BiographyVideoComponent.module.scss'
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function BiographyVideoComponent({videoCaption, preview}) {
	const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
	const { data, loading, error } = useFetch("/biography-page-data?populate=*");

	if (error) {
		return <p>Ошибка загрузки данных: {error.message}</p>;
	}
	if (!data) return null;

	return (
		<section className={`${styles.container} container`}>
			<Loader loading={loading}>
				<AnimatedComponent>
					<VideoPlayer
						caption={videoCaption}
						preview={preview}
						videoPath={`${API_URL}${data?.video?.url}`}
						newsVideo={true}
					/>
				</AnimatedComponent>
			</Loader>
		</section>
	)
}
