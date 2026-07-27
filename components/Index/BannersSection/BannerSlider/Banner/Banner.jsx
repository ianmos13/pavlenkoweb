"use client"

import styles from './Banner.module.scss'

import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import LearnMoreButton from "@/components/UI/Buttons/LearnMoreButton/LearnMoreButton";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";
import bannerBackground from "@/assets/images/banner_background.svg";
import liIcon from "@/assets/images/banner_li_icon.svg";

export default function Banner(props) {
    const { theme, data, swiperRef, currentSlide, totalSlide, isHeightReady, containerRef, onContentLoad } = props
    const router = useRouter();

    const [swiper, setSwiper] = useState(swiperRef.current)

    useEffect(() => {
      if (swiperRef.current) {
        setSwiper(swiperRef.current)
      }
    }, [swiperRef]);

    const goToPage = () => {
        router.push(data.buttonLink);
    };
    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${styles[`${theme}Container`]}`}
            style={{ height: isHeightReady ? '100%' : 'auto' }}>
            <div className={`${styles.infoContainer} ${data.body ? styles.body : '' }`}>
                <div className={styles.titleContainer}>
                    <h2> <TitleBody data={data} /> </h2>
                </div>
                { data.body && (
                    <>
                        <div className={styles.description}>
                            <h4>{data.body}</h4>
                        </div>
                        <div className={styles.spaceForButton}></div>
                        <ButtonBox className={styles.button}>
                            <LearnMoreButton
                                onClick={goToPage}
                                text={data.buttonText}
                                theme={'red'}
                            />
                        </ButtonBox>
                        <div className={styles.infoImageContainer}>
                            <Image src={bannerBackground} alt="Support Logo" />
                        </div>
                    </>
                )}
                { data.listData && data.listData.length > 0  && (
                  <div className={styles.listDataContainer}>
                    {data.listData.map((elem, idx) => (
                      <div key={idx} className={styles.element}>
                        <div className={styles.liMarker}>
                          <Image src={liIcon} alt="li icon" />
                        </div>
                        {elem}
                      </div>
                    ))}
                  </div>
                )}
                { data.cardsData && data.cardsData.length > 0 && (
                    <div className={styles.cardsContainer}>
                        {data.cardsData.map((card, idx) => (
                            <div key={idx} className={styles.cardContainer}>
                                <div className={styles.cardTitleContainer}>
                                    <h3 className={`secondary`}>{card.title}</h3>
                                </div>
                                <p className={styles.cardText}>{card.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={`${styles.imageContainer} ${data.imageOverview ? styles.imageOverviewContainer : ''}`}>
              { data.imageOverview ? (
                <div className={styles.imageOverviewContainerInner}>
                  <img src={data.image} alt="" onLoad={onContentLoad} />
                </div>
              ) : (
                <img src={data.image} alt="" onLoad={onContentLoad} />
              )}
            </div>
            <PaginationBlock swiper={swiper} current={currentSlide} total={totalSlide} />
        </div>
    )
}

const TitleBody = ({ data }) => {
    return (
        <>
            { data.headerData.map((header, idx) => (
                <span
                    key={idx}
                    className={`${header.className} ${styles[header.className]}`}
                >
                    {`${header.text} `}
                </span>
            ))}
        </>
    )
}

const PaginationBlock = ({swiper, current, total }) => {
    const nextSlide = () => {
        if(current !== total)
            swiper.slideNext()
    }

    const prevSlide = () => {
        if(current !== 1)
            swiper.slidePrev()
    }
    return (
        <div className={styles.pagination}>
            <div
                className={`${styles.navigation} ${styles.navigationPrev} ${current === 1 ? styles.disabled : ''}`}
                onClick={prevSlide}
            >
                <svg className={styles.icon} />
            </div>
            <div
                className={`${styles.navigation} ${styles.navigationNext} ${current === total ? styles.disabled : ''}`}
                onClick={nextSlide}
            >
                <svg className={styles.icon} />
            </div>
        </div>
    )
}