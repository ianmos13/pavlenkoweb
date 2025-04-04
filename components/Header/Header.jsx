"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Menu from "@/components/Header/Menu/Menu";

import Logo from "@/public/images/logo.svg";
import LogoDark from "@/public/images/logo-dark.svg";
import Burger from "@/public/images/icons/burger.svg";
import BurgerDark from "@/public/images/icons/burger-dark.svg";
import CloseIcon from "@/public/images/icons/close-icon.svg";
import CloseIconDark from "@/public/images/icons/close-icon-dark.svg";
import useIsPath501 from "@/services/hook/useIsPath501";

import styles from "./Header.module.scss";
import { useSelector } from "react-redux";

const darkPages = [
  "/about-us",
  "/application-form",
  "/specialization-and-program",
  "/information-about-educational-organization",
];
const ultraLitePages = [
  "/biography",
  "/4surgeonsclub",
  "/video-atlas",
  "/for-partners",
  "/intelligent-volunteers",
];

export default function Header() {
  const isPath501 = useIsPath501();
  const pathname = usePathname();
  const bannerTheme = useSelector((state) => state.header?.theme || "dark");

  const defaultTheme =
    pathname === "/" || darkPages.includes(pathname)
      ? "dark"
      : ultraLitePages.includes(pathname)
      ? "ultraLite"
      : "light";

  const [theme, setTheme] = useState(defaultTheme);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [burgerImageSrc, setBurgerImageSrc] = useState(Burger);
  const burgerButtonRef = useRef(null);

  useEffect(() => {
    if (pathname === "/") {
      setTheme(bannerTheme ? bannerTheme : defaultTheme);
    } else {
      setTheme(defaultTheme);
    }
  }, [bannerTheme]);

  useEffect(() => {
    setTheme(defaultTheme);
  }, [pathname]);

  useEffect(() => {
    if (theme === "dark")
      isBurgerOpen ? setBurgerImageSrc(CloseIcon) : setBurgerImageSrc(Burger);
    else
      isBurgerOpen
        ? setBurgerImageSrc(CloseIconDark)
        : setBurgerImageSrc(BurgerDark);
  }, [theme]);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 739) {
      if (isBurgerOpen) {
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";

        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isBurgerOpen]);

  return !isPath501 ? (
    <header className={`${styles.container} ${styles[`${theme}Container`]}`}>
      <div className={styles.headerBody}>
        <Link href="/" className={styles.logo}>
          <Image
            src={theme === "dark" ? Logo : LogoDark}
            alt="Logo"
            className={styles.image}
          />
        </Link>

        <div className={styles.menu}>
          <Menu
            currentLink={pathname}
            theme={theme}
            elements={menuElements}
            openMenu={setIsBurgerOpen}
          />
        </div>
        <div className={styles.mobileMenu}>
          <button
            ref={burgerButtonRef}
            className={styles.burgerButton}
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
            <Image src={burgerImageSrc} alt="" />
          </button>
        </div>
      </div>
      <div
        className={`${styles.dropdownMenu} ${
          isBurgerOpen ? styles.active : ""
        }`}>
        <Menu
          currentLink={pathname}
          theme={theme}
          elements={menuElements}
          openMenu={setIsBurgerOpen}
        />
      </div>
    </header>
  ) : null;
}

const menuElements = [
  {
    id: 1,
    title: "О школе",
    ref: "aboutSchool",
    link: "",
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
        title: "Команда школы",
        link: "/school-team",
      },
      {
        id: 14,
        title: "Новости школы",
        link: "/news",
      },
      // {
      //   id: 15,
      //   title: "Маркет",
      //   link: "/market",
      // },
      {
        id: 16,
        title: "Сведения об образовательной организации",
        link: "/information-about-educational-organization",
      },
    ],
  },
  {
    id: 2,
    title: "Образование",
    ref: "education",
    link: "",
    children: [
      {
        id: 20,
        title: "Стать резидентом",
        link: "/become-resident",
      },
      {
        id: 21,
        title: "Специализации и программа",
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
        link: "/our-locations",
      },
      {
        id: 24,
        title: "Анкета на обучение",
        link: "/application-form",
      },
    ],
  },
  {
    id: 3,
    title: "Полезные ресурсы",
    ref: "resources",
    link: "",
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
    ref: "partners",
    link: "/for-partners",
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
    title: "Контакты",
    ref: "contacts",
    link: "/contacts",
  },
];
