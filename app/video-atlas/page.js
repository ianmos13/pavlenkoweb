import Graduates from '@/components/VideoAtlas/Graduates/Graduates'
import VideoAtlasHeader from '@/components/VideoAtlas/VideoAtlasHeader/VideoAtlasHeader'
import VideoLibrary from '@/components/VideoAtlas/VideoLibrary/VideoLibrary'
import ExpertsSwiper from "@/components/VideoAtlas/ExpertsSwiper/ExpertsSwiper";

export default function page() {
	return (
		<>
			<VideoAtlasHeader />
			<VideoLibrary />
			<ExpertsSwiper />
			<Graduates />
		</>
	)
}
