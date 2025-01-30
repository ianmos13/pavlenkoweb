'use client'

import "swiper/css"
import {EffectCoverflow} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import styles from './MentorsAndGraduates.module.scss'

import MentorCardItem from "@/components/UI/MentorCardItem/MentorCardItem";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import React, {useEffect, useRef, useState} from "react";

const MentorsAndGraduates = ({ people }) => {
  return (
    <AnimatedComponent>
        <section className={styles.block}>
            <div className={styles.titleContainer}>
                <h2>Наставники и их выпускники</h2>
            </div>
            <div className={styles.gridContainer}>
                {people.map((person, index) => (
                    <div key={index}>
                        <div className={styles.personContainer}>
                            <div className={styles.personItem}>
                                <MentorCardItem
                                    name={person.name}
                                    specialty={person.position}
                                    biography={person.biography}
                                    avatar={person.avatar}
                                    photo={person.photo}
                                    location={person.city}
                                />
                            </div>
                            <div className={styles.graduatesContainer}>
                                    {person.graduates.map((graduate, i) => (
                                        <MentorCardItem
                                            key={i}
                                            size="small"
                                            name={graduate.name}
                                            specialty={graduate.position}
                                            biography={graduate.biography}
                                            avatar={graduate.avatar}
                                            photo={graduate.photo}
                                            location={graduate.city}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className={styles.personSwiperContainer}>
                            <PersonSwiperContainer data={person} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </AnimatedComponent>
  );
};
export default MentorsAndGraduates;

const PersonSwiperContainer = (props) => {
    const { data } = props
    const [swiperData, setSwiperData] = useState([]);
    const swiperRef = useRef(null)

    useEffect(() => {
        const finalData = (!data?.graduates || (data?.graduates && data?.graduates.length < 2)) ?
            ([data]).concat(data?.graduates || []) :
            [data.graduates[0]].concat(data).concat(data.graduates.slice(1))
        setSwiperData(finalData)
        const initialSlide = finalData.length < 3 ? 0 : 1
        if(swiperRef.current && swiperRef.current.realIndex !== 1 && initialSlide === 1) {
            swiperRef.current.slideNext()
        }
    }, [data]);

    return (
        <Swiper
            onSwiper={swiper => (swiperRef.current = swiper)}
            className={styles.swiperContainer}
            effect={"coverflow"}
            centeredSlides={true}
            slidesPerView={"auto"}
            initialSlide={0}
            modules={[EffectCoverflow]}
            coverflowEffect={{
                rotate: 0,
                slideShadows: false,
                stretch: -15,
                depth: 185,
                modifier: 2
            }}>
            {swiperData && swiperData?.map((card, idx) => (
                <SwiperSlide key={idx} className={styles.swiperSlide}>
                    <div className={styles.personSwiperItem}>
                        <Card
                            name={card.name}
                            size={card.graduates ? "" : "small"}
                            specialty={card.position}
                            biography={card.biography}
                            avatar={card.avatar}
                            photo={card.photo}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

const Card = ({ avatar, size, name, biography, specialty }) => {
    return (
        <div className={`${styles.mentorCard} ${size === 'small' ? styles.mentorSmallCard : '' }`}>
            <div className={styles.imageWrapper}>
                <img
                    src={avatar}
                    alt={`${name}'s photo`}
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.personData}>
                    <div className={styles.name}>
                        <h5>{name}</h5>
                    </div>
                    <div className={styles.biography}><p>{biography}</p></div>
                </div>
                <div className={styles.details}>
                    <div className={styles.specialty}>
                        <p> {specialty}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}