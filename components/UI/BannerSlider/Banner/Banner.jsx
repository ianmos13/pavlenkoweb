'use client'

import styles from './Banner.module.scss'
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import LearnMoreButton from "@/components/UI/Buttons/LearnMoreButton/LearnMoreButton";
import {useRouter} from "next/navigation";

export default function Banner(props) {
    const { theme, data, size, swiper, currentSlide, totalSlide } = props
    const router = useRouter();

    const goToPage = () => {
        router.push(data.buttonLink);
    };

    return (
        <div className={`${styles.container} ${styles[`${theme}Container`]} ${styles[`${size}Container`]}`}
            style={{height: swiper ? swiper.height : '100%'}}>
            <div className={styles.infoContainer}>
                <div className={styles.titleContainer}>
                    { size==='large' ? (
                        <h1> <TitleBody data={data} /> </h1>
                    ) : (
                        <h2> <TitleBody data={data} /> </h2>
                    )}
                </div>
                { data.body && (
                    <>
                        <div className={styles.description}>
                            <h4>{data.body}</h4>
                        </div>
                        <ButtonBox className={styles.button}>
                            <LearnMoreButton
                                onClick={goToPage}
                                text={data.buttonText}
                                theme={'red'}
                            />
                            { size==='large' && (
                                <div className={styles.tabletPagination}>
                                    <PaginationBlock swiper={swiper} current={currentSlide} total={totalSlide} />
                                </div>
                            )}
                            { size==='medium' && (
                                <div className={styles.tabletPagination}>
                                    <PaginationBlock swiper={swiper} current={currentSlide} total={totalSlide} />
                                </div>
                            )}
                        </ButtonBox>
                    </>
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
                { size === 'large' && (
                    <div className={styles.paginationContainer}>
                        <PaginationBlock swiper={swiper} current={currentSlide} total={totalSlide} />
                    </div>
                )}
            </div>
            <div className={styles.imageContainer}>
                <img src={data.image} alt="" ></img>
            </div>
            <div className={styles.mobilePagination}>
                <PaginationBlock swiper={swiper} current={currentSlide} total={totalSlide} />
            </div>
        </div>
    )
}

const TitleBody = ({data}) => {
    return (
        <>
            { data.headerData.map((header, idx) => (
                <span
                    key={idx}
                    className={`${header.className} ${styles[header.className]}`}
                >
                    {header.text}
                </span>
            ))}
        </>
    )
}

const PaginationBlock = ({swiper, current, total }) => {
    const nextSlide = () => {
        swiper.slideNext()
    }

    const prevSlide = () => {
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
            <div className={styles.paginationFraction}>
                <span className={styles.paginationActive}>{current}</span>
                <span>/</span>
                <span>{total}</span>
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