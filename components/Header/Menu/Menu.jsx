import React, {useEffect, useState} from 'react'

import MenuElement from '@/components/Header/MenuElement/MenuElement'
import ButtonBox from '@/components/UI/Buttons/ButtonBox/ButtonBox'
import SupportButton from '@/components/UI/Buttons/SupportButton/SupportButton'

import styles from './Menu.module.scss'
import DonationPopup from "@/components/Header/DonationPopup/DonationPopup";

export default function Menu(props) {
	const { currentLink, theme, elements, openMenu } = props

	const refs = elements.reduce((acc, el) => {
		acc[el.ref] = false
		return acc
	}, {})

	const [oldLink, setOldLink] = useState(null);
	const [isOpen, setIsOpen] = useState(refs)
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	useEffect(() => {
		if (currentLink !== oldLink) {
			setOldLink(currentLink);
			openMenu(false);
		}
	}, [currentLink]);

	const handleClickMenu = async refName => {
		setIsOpen({ ...refs, [refName]: !isOpen[refName] })
	}

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	return (
		<div className={`${styles.container} ${styles[`${theme}Container`]}`}>
			{elements.map((element, idx) => (
				<MenuElement
					key={idx}
					theme={theme}
					element={element}
					isOpen={isOpen[element.ref]}
					handleClickMenu={handleClickMenu}
				/>
			))}
			<ButtonBox className={styles.menuButton}>
				<SupportButton theme={theme} onClick={togglePopup} />
			</ButtonBox>
			{isPopupOpen && (
				<DonationPopup togglePopup={togglePopup} />
			)}
		</div>
	)
}
