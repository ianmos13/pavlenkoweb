"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Важно! Используйте next/navigation

import MenuElement from '@/components/Header/MenuElement/MenuElement';
import ButtonBox from '@/components/UI/Buttons/ButtonBox/ButtonBox';
import SupportButton from '@/components/UI/Buttons/SupportButton/SupportButton';

import styles from './Menu.module.scss';

export default function Menu(props) {
	const { currentLink, theme, elements, openMenu } = props;
	const router = useRouter();

	const refs = elements.reduce((acc, el) => {
		acc[el.ref] = false;
		return acc;
	}, {});

	const [oldLink, setOldLink] = useState(null);
	const [isOpen, setIsOpen] = useState(refs);
	const [openRefName, setOpenRefName] = useState(null);

	useEffect(() => {
		if (currentLink !== oldLink) {
			setOldLink(currentLink);
			openMenu(false);
		}
	}, [currentLink]);

	const handleClickMenu = async refName => {
		setIsOpen({ ...refs, [refName]: !isOpen[refName] });
		setOpenRefName(isOpen[refName] ? null : refName);
	};

	const handleDonateClick = () => {
		router.push('/pozshertvovanie');
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
				<SupportButton theme={theme} onClick={handleDonateClick} />
			</ButtonBox>
			{openRefName && (
				<div
					className={styles.closeArea}
					onClick={() => handleClickMenu(openRefName)}
				></div>
			)}
		</div>
	);
}
