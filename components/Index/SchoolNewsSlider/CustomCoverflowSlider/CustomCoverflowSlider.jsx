"use client";
import React, {useEffect, useRef, useState} from 'react';
import styles from "./CustomCoverflowSlider.module.scss";
import {useMediaQuery} from "react-responsive";
import CardItem from "@/components/Index/SchoolNewsSlider/CardItem/CardItem";

const properties = {
    newsCard: {
        mobile: 312,
        tablet: 312,
        desktop: 421
    },
    imageGallery: {
        mobile: 262,
        tablet: 623,
        desktop: 623
    }
}

const CustomCoverflowSlider = ({ data, type }) => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 739px)' });
    const [activeIndex, setActiveIndex] = useState(5);
    const [isDragging, setIsDragging] = useState(false);
    const [isSwipe, setIsSwipe] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [slides, setSlides] = useState([...data]);
    const sliderRef = useRef(null);

    const sliderSize = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
    const sliderSpace = properties[type][sliderSize]
    const scalePercent = 0.15;

    const handlePrev = () => {
        setActiveIndex((prev) => {
            if (prev === 5) {
                setTimeout(() => {
                    setSlides([slides[slides.length - 1], ...slides.slice(0, -1)])
                    setActiveIndex(prev);
                }, 500);
            }
            return prev - 1;
        });
        setIsSwipe(false)
    };

    const handleNext = () => {
        setActiveIndex((prev) => {
            if (prev === slides.length - 5) {
                const firstEl = slides[0]
                setTimeout(() => {
                    setSlides([...slides.slice(1), firstEl]);
                    setActiveIndex(prev)
                }, 500);
            }
            return prev + 1;
        });
        setIsSwipe(false)
    };

    useEffect(() => {
        let newSlides = [...data]
        while (newSlides.length < 12) {
            newSlides = newSlides.concat(data)
        }
        setSlides(newSlides)
    }, [data.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            setIsSwipe(true)
            if (e.shiftKey && e.key === "ArrowLeft") {
                handlePrev();
            } else if (e.shiftKey && e.key === "ArrowRight") {
                handleNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [slides]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX || e.touches?.[0].clientX);
        sliderRef.current && Array.from(sliderRef.current.children).forEach((el) => {
            el.style.transition = "transform 0.5s ease, z-index 0.5s ease"
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX || e.touches?.[0].clientX;
        const deltaX = currentX - startX;
        setCurrentTranslate(deltaX);
        (Math.abs(currentTranslate) > 50) ? setIsSwipe(true) : null
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (Math.abs(currentTranslate) > 50) {
            if (currentTranslate > 0) {
                handlePrev();
            } else {
                handleNext();
            }
        } else {
            setCurrentTranslate(0);
        }
        setTimeout(() => {
            sliderRef.current && Array.from(sliderRef.current.children).forEach((el) => {
                el.style.transition = "none"
            });
        }, 500);
    };

    return (
        <div className={styles.sliderContainer}>
            <div
                ref={sliderRef}
                className={`${styles.slider} ${styles[`${type}Slider`]}`}

                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
            >
                {slides.map((article, index) => {
                    const offset = index - activeIndex;
                    const scale = Math.max(0.4, 1 - Math.abs(offset) * scalePercent);
                    let xValue = sliderSpace
                    for(let i = 1; i < Math.abs(offset) ; i+=1)
                      xValue += sliderSpace * (i > 3 ? 0.45 : (1 - scalePercent * i - 0.01 ))
                    const translateX = xValue * Math.sign(offset);
                    return (
                        <div
                            key={index}
                            className={`${styles.slide} ${isSwipe ? styles.disableSlideAction : ''}`}
                            style={{
                                transform: `translateX(${translateX}px) scale(${scale})`,
                                zIndex: slides.length - Math.abs(offset),
                            }}
                        >
                            <SliderElement article={article} type={type} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomCoverflowSlider;

const SliderElement = ({ article, type }) => {
    return (
        <>
            { type === 'newsCard' && (
                <CardItem
                    key={article.id}
                    header={article.header}
                    title={article.title}
                    body={article.body}
                    category={article.category}
                    date={article.date}
                    link={article.link}
                />
            )}
            { type === 'imageGallery' && (
                <div className={styles.imageContainer} >
                    <img src={article} alt="" />
                </div>
            )}
        </>
    )
}