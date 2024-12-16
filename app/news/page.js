import NewsLibrary from '@/components/News/NewsLibrary/NewsLibrary'
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import React from "react";
import HeaderText from "@/components/UI/HeaderText/HeaderText";

export default function page() {
	return (
		<>
			<HeaderText>Новости школы</HeaderText>
			<AnimatedComponent>
				<NewsLibrary />
			</AnimatedComponent>
		</>
	)
}
