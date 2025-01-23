"use client";

import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import HeaderLogo from "@/public/images/logo.svg";
import useIsPath501 from "@/services/hook/useIsPath501";
import DonationPopup from "@/components/UI/DonationPopup/DonationPopup";
import React, {useState} from "react";
import SubscribeForm from "@/components/UI/Subscribe/SubscribeForm/SubscribeForm";
import SubscribePopup from "@/components/UI/Subscribe/SubscribePopup/SubscribePopup";

export default function Footer() {
  const isPath501 = useIsPath501();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return !isPath501 ? (
    <footer className={styles.container}>
      <div className={styles.footerBody}>
        <div className={styles.footerBox}>
          <Link href="/" className={styles.logo}>
            <Image src={HeaderLogo} alt="Logo" className={styles.image} />
          </Link>
          <div className={styles.linksBox}>
            {footerElements.map((element, idx) => (
              <div
                key={idx}
                className={`${styles.linksColumn} ${
                  element.title === "" ? styles.withoutTitleColumn : ""
                }`}>
                <p className={`small`}>{element.title}</p>
                <div className={styles.linksItem}>
                  {element.children &&
                    element.children.map((child, idxc) => (
                      <div key={idxc}>
                        { child.link === 'popup' ? (
                          <>
                            <div className={styles.link} onClick={togglePopup} >
                              <p className={`bold`}>{child.title}</p>
                            </div>
                            {isPopupOpen && (
                                <DonationPopup togglePopup={togglePopup} uuid="pop_up_dontaion_footer" />
                            )}
                          </>
                        ) : (
                          <Link
                              href={child.link}
                              className={styles.link}>
                            <p className={`bold`}>{child.title}</p>
                          </Link>
                        ) }
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerSubscribe}>
          <div className={styles.subscribeTitle}>
            <p className={`bold`}>Подписаться на&nbsp;рассылку</p>
          </div>
          <div className={styles.subscribeForm}>
            <SubscribeForm setIsPopupVisible={setIsPopupVisible} theme="footer" />
          </div>
        </div>
        <div className={styles.footerInfo}>
          <div className={styles.textInfo}>
            <p className={`small`}>
              193312 г. Санкт-Петербург, проспект Товарищеский, д.10, корп.1А,
              154
            </p>
            <p className={`small`}>© {(new Date().getFullYear())} Школа практической онкологии</p>
          </div>
          <div className={styles.linksInfo}>
            <Link href="/privacy-policy" className={styles.link}>
              <span className={`smallLink`}>Политика конфиденциальности</span>
            </Link>
            <Link
              href="/personal-data-processing-policy"
              className={styles.link}>
              <span className={`smallLink`}>
                Политика обработки персональных данных
              </span>
            </Link>
          </div>
        </div>
      </div>
      {isPopupVisible && <SubscribePopup onClose={() => setIsPopupVisible(false)} />}
    </footer>
  ) : null;
}

const footerElements = [
  {
    id: 1,
    title: "О школе",
    children: [
      {
        id: 10,
        title: "О проекте",
        link: "/about-us",
      },
      {
        id: 11,
        title: "Биография Андрея Павленко",
        link: "/biography",
      },
      {
        id: 12,
        title: "Публикации о школе",
        link: "/publications",
      },
      {
        id: 13,
        title: "Новости школы",
        link: "/news",
      },
      // {
      //   id: 14,
      //   title: "Маркет",
      //   link: "/market",
      // },
      {
        id: 15,
        title: "Сведения об образовательной организации",
        link: "/information-about-educational-organization",
      },
    ],
  },
  {
    id: 2,
    title: "Образование",
    children: [
      {
        id: 20,
        title: "Стать резидентом",
        link: "/become-resident",
      },
      {
        id: 21,
        title: "Специализации и\u00A0программа",
        link: "/specialization-and-program",
      },
      {
        id: 22,
        title: "Преподавательский состав",
        link: "/teaching-staff",
      },
      {
        id: 23,
        title: "Наши базы",
        link: "our-locations",
      },
    ],
  },
  {
    id: 3,
    title: "Полезные ресурсы",
    children: [
      {
        id: 30,
        title: "4SURGEONSCLUB",
        link: "/4surgeonsclub",
      },
      {
        id: 31,
        title: "Видеоатлас",
        link: "/video-atlas",
      },
    ],
  },
  {
    id: 4,
    title: "Партнёрам",
    children: [
      {
        id: 40,
        title: "Частным донорам",
        link: "/private-donors",
      },
      {
        id: 41,
        title: "Корпоративным партнерам",
        link: "/for-partners",
      },
      {
        id: 42,
        title: "Интеллектуальным волонтерам",
        link: "/intelligent-volunteers",
      },
      {
        id: 43,
        title: "Документы и отчеты",
        link: "/documents",
      },
    ],
  },
  {
    id: 5,
    title: "",
    children: [
      {
        id: 50,
        title: "Контакты",
        link: "/contacts",
      },
      {
        id: 51,
        title: "Поддержать",
        link: "popup",
      },
    ],
  },
];
