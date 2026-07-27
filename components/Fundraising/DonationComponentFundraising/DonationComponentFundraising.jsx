"use client";

import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import SubscribeButton from "@/components/UI/Buttons/SubscribeButton/SubscribeButton";
import Image from "next/image";
import logo from "@/assets/images/fundraising_donation_image.svg";
import logo744 from "@/assets/images/fundraising_donation_image_744.svg";
import logo320 from "@/assets/images/fundraising_donation_image_320.svg";
import Modal from "@/components/UI/DonationComponent/PaymentModal/PaymentModal";
import styles from './DonationComponentFundraising.module.scss'
import React, {useEffect, useRef, useState} from "react";
import ShareButton from "@/components/UI/Buttons/ShareButton/ShareButton";
import useCopyLink from "@/services/hook/useCopyLink";
import CopyLinkToast from "@/components/UI/CopyLinkToast/CopyLinkToast";

const AMOUNT_OPTIONS = ["1000", "500", "300", "-1"];

export function DonationComponentFundraising({
	donationId,
	mode,
	fundraisingSlug = "",
	onPaymentSuccess: onPaymentSuccessProp,
}) {
	const [currentStep, setCurrentStep] = useState(1);
	const [amount, setAmount] = useState(1000);
	const [customAmount, setCustomAmount] = useState("");
	const [subscriptionConfig, setSubscriptionConfig] = useState({});
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [acceptPersonalData, setAcceptPersonalData] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);

	const [fullNameTouched, setFullNameTouched] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [personalDataTouched, setPersonalDataTouched] = useState(false);

	const isEmailValid = (value) => value.includes("@") && value.includes(".");

	const isFullNameError = fullNameTouched && fullName.trim().length === 0;
	const isEmailError = emailTouched && !isEmailValid(email.trim());
	const isPersonalDataError = personalDataTouched && !acceptPersonalData;

	const isFirstStepValid =
		fullName.trim().length > 0 &&
		isEmailValid(email.trim()) &&
		acceptPersonalData

	const loadPaymentScript = () => {
		if (typeof window !== "undefined" && !window.cp) {
			const script = document.createElement("script");
			script.src = "https://widget.cloudpayments.ru/bundles/paymentblocks.js";
			script.async = true;
			script.onload = () => {
				setIsScriptLoaded(true);
			};
			document.body.appendChild(script);
		} else {
			setIsScriptLoaded(true);
		}
	};

	const handleAmountChange = (newAmount) => {
		setAmount(newAmount);
		if (newAmount !== -1) setCustomAmount("");
	};

	const handleOpenModal = () => {
		if(mode === "preview") return;

		const finalAmount =
			amount === -1 ? parseFloat(customAmount || "0") : amount;
		if (!finalAmount || finalAmount <= 0) {
			alert("Введите сумму больше 0");
			return;
		}

		if (!isScriptLoaded) {
			loadPaymentScript();
		}
		if (isFirstStepValid) {
			setSubscriptionConfig({
				description: `Разовое пожертвование ${finalAmount} руб`,
				subscription: undefined,
				amount: finalAmount,
			});

			const formData = new FormData();
			formData.append("fullName", fullName);
			formData.append("email", email);
			formData.append("amount", finalAmount.toString());
			formData.append("frequency", "one-time");

			fetch("/api/send-donation/", {
				method: "POST",
				body: formData,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log("Email sent:", data);
				})
				.catch((error) => {
					console.error("Email error:", error);
				});

			setIsModalOpen(true);
		}
	};

	const { copyCurrentLink, isCopied, message } = useCopyLink({
		disabled: mode === "preview",
	});

	const handlePaymentSuccess = async () => {
		setIsModalOpen(false);
		setCurrentStep(2);
		if (onPaymentSuccessProp) {
			await onPaymentSuccessProp();
		}
	};

	const supportAgain = () => {
		if(mode === "preview") return;
		setIsModalOpen(false);
		setCurrentStep(1);
	};

	const sliderIndex =
		amount === 1000
			? 0
			: amount === 500
				? 1
				: amount === 300
					? 2
					: amount === -1
						? 3
						: 0;
	const optionRefs = useRef([]);
	const [sliderStyle, setSliderStyle] = useState({width: 0, left: 0});

	useEffect(() => {
		if (optionRefs.current[sliderIndex]) {
			const {offsetWidth, offsetLeft} = optionRefs.current[sliderIndex];
			setSliderStyle({width: offsetWidth, left: offsetLeft});
		}
	}, [amount, sliderIndex]);

	return (
		<section
			className={`${styles.container} container`}
			id="donation"
		>
			<div
				className={`${styles.donationContainer} ${isModalOpen ? styles.blurred : ""}`}
			>
				{currentStep === 1 && (
					<div className={styles.stepContainer}>
						<div className={styles.stepContainerInner}>
							<h2>Выберите сумму пожертвования:</h2>
							<div className={styles.donationForm}>
								<div className={styles.segmentedControl}>
									<div
										className={styles.slider}
										style={{
											width: sliderStyle.width,
											transform: `translateX(${sliderStyle.left}px)`,
										}}
									/>
									{AMOUNT_OPTIONS.map((value, index) => (
										<div
											key={value}
											className={styles.amountRadioButton}
											ref={(el) => (optionRefs.current[index] = el)}>
											<input
												type="radio"
												id={`amount${value}_${donationId}`}
												name={`amount_${donationId}`}
												value={value}
												checked={
													amount ===
													(value === "-1" ? -1 : parseInt(value))
												}
												onChange={() =>
													handleAmountChange(
														value === "-1" ? -1 : parseInt(value)
													)
												}
											/>
											<label htmlFor={`amount${value}_${donationId}`}>
												{value === "-1" ? "Другая сумма" : `${value} ₽`}
											</label>
										</div>
									))}
								</div>

								{amount === -1 && (
									<div className={styles.stepInput}>
										<input
											id={`customAmount_${donationId}`}
											type="number"
											min="1"
											step="any"
											placeholder="Введите сумму"
											value={customAmount}
											onChange={(e) => setCustomAmount(e.target.value)}
										/>
									</div>
								)}

								<div className={styles.stepInput}>
									<input
										id={`fullName_${donationId}`}
										type="text"
										placeholder="Ваше имя"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
										onBlur={() => setFullNameTouched(true)}
										className={isFullNameError ? styles.error : ""}
									/>
								</div>
								<div className={styles.stepInput}>
									<input
										id={`email_${donationId}`}
										type="email"
										placeholder="E-mail"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										onBlur={() => setEmailTouched(true)}
										className={isEmailError ? styles.error : ""}
									/>
								</div>
								<div className={styles.checkboxItem}>
									<input
										type="checkbox"
										id={`acceptPersonalData_${donationId}`}
										checked={acceptPersonalData}
										onChange={(e) =>
											setAcceptPersonalData(e.target.checked)
										}
										onBlur={() => setPersonalDataTouched(true)}
										className={
											isPersonalDataError ? styles.errorCheckbox : ""
										}
									/>
									<p>
										Подтверждаю согласие на{" "}
										<a href="/personal-data-processing-policy">
													<span>
														обработку персональных данных
													</span>
										</a>
										{" "}и{" "}
										<a href="/oferta">
											<span>офертой</span>
										</a>
									</p>
								</div>
							</div>
							<div className={styles.buttonsContainer}>
								<ButtonBox className={styles.supportButton}>
									<SubscribeButton
										text="Поддержать"
										theme="joinBanner"
										onClick={handleOpenModal}
										isDisabled={!isFirstStepValid}
									/>
								</ButtonBox>
								<ButtonBox className={styles.shareButton}>
									<ShareButton
										onClick={copyCurrentLink}
										text="Поделиться"
									/>
								</ButtonBox>
							</div>
						</div>
						<div className={styles.supportImg}>
							<Image src={logo} alt="Support Logo"/>
						</div>
					</div>
				)}
				{currentStep === 2 && (
					<div className={styles.txhSelection}>
						<div className={styles.txhSelectionForm}>
							<h2>Спасибо за вашу поддержку!</h2>
							<p>
								Поделитесь этим сбором — если у вас есть возможность. Иногда один репост помогает не меньше, чем
								донат.
							</p>
							<p>
								Вы также можете помочь повторно — это невероятно ценно и важно для нас.
							</p>
							<div className={styles.buttonsContainer}>
								<ButtonBox className={styles.shareButton}>
									<ShareButton
										theme="red"
										onClick={copyCurrentLink}
										text="Поделиться"
									/>
								</ButtonBox>
								<ButtonBox className={styles.supportButton}>
									<SubscribeButton
										text="Поддержать еще раз"
										theme="shareJoinBanner"
										onClick={supportAgain}
									/>
								</ButtonBox>
							</div>
						</div>
						<div className={styles.supportImg}>
							<Image
								className={styles.desktop}
								src={logo}
								alt="Support Logo"
							/>
							<Image
								className={styles.tablet}
								src={logo744}
								alt="Support Logo"
							/>
							<Image
								className={styles.mobile}
								src={logo320}
								alt="Support Logo"
							/>
						</div>
					</div>
				)}
				{currentStep === 1 && (
					<div className={styles.info}>
					{[
						{
							title: "наша миссия",
							text: "Повысить компетентность хирургов-онкологов в\u00A0России и\u00A0увеличить выживаемость больных с\u00A0диагнозом рак.",
						},
						{
							title: "не менее 2000",
							text: "Больших операций выполнит каждый из\u00A0наших выпускников за\u00A0свою карьеру.",
						},
						{
							title: "на 25%",
							text: "Хирурги, получившие целевую квалификацию в\u00A0школе, повышают выживаемость пациентов.",
						},
						{
							title: "перечисляя 300\u00A0руб",
							text: "Ежемесячно за\u00A0год вы становитесь спонсором одной будущей операции нашего резидента.",
						},
					].map((item, index) => (
						<div className={styles.infoItem} key={index}>
							<h3 className="secondary">{item.title}</h3>
							<p>{item.text}</p>
						</div>
					))}
				</div>
				)}
			</div>

			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					subscriptionConfig={subscriptionConfig}
					isScriptLoaded={isScriptLoaded}
					id={donationId}
					email={email}
					fundraisingSlug={fundraisingSlug}
					onPaymentSuccess={handlePaymentSuccess}
				/>
			)}

			<CopyLinkToast isVisible={isCopied} message={message} />
		</section>
	)
}
