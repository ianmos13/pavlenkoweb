import VideoPlayer from '@/components/UI/VideoPlayer/VideoPlayer'
import styles from './BiographyVideoComponent.module.scss'


export default function BiographyVideoComponent({videoCaption, preview, videoPath}) {
	return (
		<section className={`${styles.container} container`}>
			<VideoPlayer
				caption={videoCaption}
				preview={preview}
				videoPath={videoPath}
				newsVideo={true}
			/>
		</section>
	)
}
