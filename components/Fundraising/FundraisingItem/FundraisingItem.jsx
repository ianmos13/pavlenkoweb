"use client";

import styles from "./FundraisingItem.module.scss";
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import Banner from "@/components/Fundraising/Banner/Banner";
import FundraisingInfo from "@/components/Fundraising/FundraisingInfo/FundraisingInfo";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import CookieButton from "@/components/UI/Buttons/CookieButton/CookieButton";
import {
  DonationComponentFundraising
} from "@/components/Fundraising/DonationComponentFundraising/DonationComponentFundraising";

const FundraisingItem = ({ mode, data, goalsData, onBack, onPaymentSuccess }) => {
  const selectedGoal = goalsData?.find(
    (goal) => String(goal.slug) === String(data.fundraisingGoal)
  );
  const bannerData = {
    mode: mode,
    headerText: data.fundraisingName,
    buttonLink: "#donation",
    buttonText: "Поддержать",
    image: selectedGoal?.image,
    primary: selectedGoal?.primary,
  };
  return (
    <>
      {mode === "preview" && (
        <div className={styles.previewModalWrapper}>
          <div className={styles.previewModalContainer}>
            <div className={`${styles.previewModal} container`}>
              <p className={styles.previewModalText}>
                Режим предпросмотра страницы сбора. Для редактирования и завершения
                создания сбора необходимо вернуться назад.
              </p>
              <ButtonBox className={styles.previewModalButton}>
                <CookieButton
                  theme={"preview"}
                  className={styles.previewModalButton}
                  onClick={onBack}
                  text={'Назад'}
                />
              </ButtonBox>
            </div>
            </div>
        </div>
      )}

      <Banner
        id='fundraisingItem'
        theme={"published"}
        data={bannerData}
        mode={mode}
      />
      <FundraisingInfo data={data} />
      <DonationComponentFundraising
        donationId="fundraising_dontaion"
        mode={mode}
        fundraisingSlug={data.slug}
        onPaymentSuccess={onPaymentSuccess}
      />
    </>
  );
};

export default FundraisingItem;
