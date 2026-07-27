"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';
import styles from "./BannerSlider.module.scss";
import {useDispatch} from "react-redux";
import {setTheme} from "@/redux/features/headerSlice";
import Banner from "@/components/Index/BannersSection/BannerSlider/Banner/Banner";
import {useMediaQuery} from "react-responsive";

export default function BannerSlider(props) {
    const { theme, data } = props
    const isMobile = useMediaQuery({ query: '(max-width: 739px)' });
    const [bannerTheme, setBannerTheme] = useState(theme)
    const [activeIndex, setActiveIndex] = useState(0)
    const [slideHeight, setSlideHeight] = useState(null)
    const dispatch = useDispatch()
    const swiperRef = React.useRef(null)
    const slideRefs = useRef([])
    const measureFrameRef = useRef(null)

    const handleSlideRef = useCallback((index) => (node) => {
        slideRefs.current[index] = node
    }, [])

    const applySwiperHeight = useCallback((height) => {
        setSlideHeight(height)

        const swiper = swiperRef.current
        if (!swiper) return

        swiper.el.style.height = `${height}px`
        swiper.wrapperEl.style.height = `${height}px`
        swiper.update()
    }, [])

    const measureSlideHeight = useCallback((el) => {
        const width = el.offsetWidth
        if (!width) return 0

        const clone = el.cloneNode(true)
        clone.style.cssText = [
            'position:absolute',
            'left:-9999px',
            'top:0',
            'visibility:hidden',
            'pointer-events:none',
            'height:auto',
            `width:${width}px`,
        ].join(';')
        document.body.appendChild(clone)

        const originalImages = el.querySelectorAll('img')
        const clonedImages = clone.querySelectorAll('img')
        originalImages.forEach((img, index) => {
            const clonedImg = clonedImages[index]
            if (!clonedImg || !img.complete) return

            const imageHeight = img.getBoundingClientRect().height
            if (imageHeight > 0) {
                clonedImg.style.width = '100%'
                clonedImg.style.height = `${imageHeight}px`
            }
        })

        const height = clone.offsetHeight
        document.body.removeChild(clone)

        return height
    }, [])

    const updateMaxHeight = useCallback(() => {
        if (measureFrameRef.current) {
            cancelAnimationFrame(measureFrameRef.current)
        }

        measureFrameRef.current = requestAnimationFrame(() => {
            let maxHeight = 0

            slideRefs.current.forEach((el) => {
                if (el) {
                    maxHeight = Math.max(maxHeight, measureSlideHeight(el))
                }
            })

            if (maxHeight > 0) {
                applySwiperHeight(maxHeight)
            }

            measureFrameRef.current = null
        })
    }, [applySwiperHeight, measureSlideHeight])

    const handleSlideChange = (swiper) => {
        if(swiper && data.length > 0) {
            const currentSlideIndex = swiper.realIndex ? swiper.realIndex : 0
            const newTheme = data[currentSlideIndex].background
            dispatch(setTheme(newTheme))
            setBannerTheme(newTheme)
        }
    }

    useEffect(() => {
        if(swiperRef.current && data.length > 0) {
            const currentSlideIndex = swiperRef.current.realIndex ? swiperRef.current.realIndex : 0
            const newTheme = data[currentSlideIndex].background
            dispatch(setTheme(newTheme))
            setBannerTheme(newTheme)
        }
    }, [data, swiperRef])

    useEffect(() => {
        slideRefs.current = slideRefs.current.slice(0, data.length)
        updateMaxHeight()
        window.addEventListener('resize', updateMaxHeight)

        return () => {
            window.removeEventListener('resize', updateMaxHeight)
            if (measureFrameRef.current) {
                cancelAnimationFrame(measureFrameRef.current)
            }
        }
    }, [data, updateMaxHeight])

    return (
        <section className={`${styles.container} ${styles[`${bannerTheme}Container`]}`} >
            <Swiper
                allowTouchMove={isMobile}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                    updateMaxHeight()
                }}
                onRealIndexChange={(swiper) => {
                    handleSlideChange(swiper)
                    setActiveIndex(swiper.realIndex)
                }}
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                className={styles.swiperContainer}
                centeredSlides={true}
                loop={true}
                modules={[Autoplay, EffectFade]}
                autoplay={{
                  delay: 10000,
                  disableOnInteraction: false,
                }}
            >
                {data.map((banner, idx) => (
                    <SwiperSlide key={idx}>
                        <Banner
                            swiperRef={swiperRef}
                            containerRef={handleSlideRef(idx)}
                            isHeightReady={slideHeight !== null}
                            onContentLoad={updateMaxHeight}
                            data={banner}
                            theme={banner.background}
                            currentSlide={activeIndex + 1}
                            totalSlide={data.length}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};