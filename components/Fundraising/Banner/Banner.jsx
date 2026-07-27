'use client'

import React from 'react'
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import Image from "next/image";
import defaultImage from "@/assets/images/fundraising_new_banner.webp";
import styles from './Banner.module.scss'
import {useRouter} from "next/navigation";
import SubscribeButton from "@/components/UI/Buttons/SubscribeButton/SubscribeButton";
import ShareButton from "@/components/UI/Buttons/ShareButton/ShareButton";
import useCopyLink from "@/services/hook/useCopyLink";
import CopyLinkToast from "@/components/UI/CopyLinkToast/CopyLinkToast";

export default function Banner({ theme, data, mode }) {
	const router = useRouter();
	const { copyCurrentLink, isCopied, message } = useCopyLink({
		disabled: mode === "preview",
	});

	const goToPage = () => {
		router.push(data.buttonLink);
	};

	return (
		<div className={`${styles.container} ${styles[`${theme}Container`]}`}>
			<div className={`${styles.bannerContainer} ${data.primary ? '' : styles.bannerContainerSecondary}`}>
				<div className={styles.infoContainer}>
					{ data.mode && (
						<div className={styles.tagInfo}>
							Сбор открыт
						</div>
					)}
					<div className={styles.titleContainer}>
						<h2>
							 {data.headerText}
						</h2>
					</div>
					<div className={styles.description}>
						<h4>{data.body}</h4>
					</div>
					{ data.mode ? (
						<div className={styles.buttonsContainer}>
							<ButtonBox className={styles.supportButton}>
								<SubscribeButton
									onClick={goToPage}
									text={data.buttonText}
									theme={'joinBanner'}
								/>
							</ButtonBox>
							<ButtonBox className={styles.shareButton}>
								<ShareButton
									onClick={copyCurrentLink}
									text="Поделиться"
								/>
							</ButtonBox>
						</div>
					) : (
						<ButtonBox className={styles.bannerButton}>
							<SubscribeButton
								onClick={goToPage}
								text={data.buttonText}
								theme={'join'}
							/>
						</ButtonBox>
					)}
				</div>
				<div className={styles.imageContainer}>
					{ data.image ? (
						<>
							<img src={data.image} alt="" />
						</>
					) : (
							<>
								<div className={styles.imageBackground} />
								<Image src={defaultImage} alt="" />
							</>
						)
					}
				</div>
				<div className={styles.mobileWhiteSpace} />
			</div>

			<CopyLinkToast isVisible={isCopied} message={message} />
		</div>
	)
}
