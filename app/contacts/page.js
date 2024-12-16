import Main from '@/components/Contacts/Main/Main'
import HeaderText from "@/components/UI/HeaderText/HeaderText";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function page() {
	return (
		<>
			<HeaderText theme="contacts">Контакты</HeaderText>
			<AnimatedComponent>
				<Main />
			</AnimatedComponent>
		</>
	)
}
