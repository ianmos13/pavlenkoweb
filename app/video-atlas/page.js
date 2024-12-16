import Graduates from '@/components/VideoAtlas/Graduates/Graduates'
import VideoAtlasHeader from '@/components/VideoAtlas/VideoAtlasHeader/VideoAtlasHeader'
import VideoLibrary from '@/components/VideoAtlas/VideoLibrary/VideoLibrary'
import ExpertsSwiper from "@/components/VideoAtlas/ExpertsSwiper/ExpertsSwiper";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function page() {
	return (
		<>
			<VideoAtlasHeader />
			<AnimatedComponent>
				<VideoLibrary />
			</AnimatedComponent>
			<AnimatedComponent>
				<ExpertsSwiper />
			</AnimatedComponent>
			<AnimatedComponent>
				<Graduates />
			</AnimatedComponent>
		</>
	)
}
