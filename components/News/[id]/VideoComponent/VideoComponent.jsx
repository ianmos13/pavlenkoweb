import VideoPlayer from '@/components/UI/VideoPlayer/VideoPlayer'
import styles from './VideoComponent.module.scss'


export default function VideoComponent({videoCaption, preview}) {
	return (
		<section className={`${styles.container} container`}>
			<VideoPlayer
				caption={videoCaption}
				preview={preview}
			/>
		</section>
	)
}
