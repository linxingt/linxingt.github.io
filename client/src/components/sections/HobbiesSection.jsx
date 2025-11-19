import React, { useRef, useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { useWindowSize } from '../../hooks/useWindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, FreeMode, Autoplay, Pagination, Navigation, Thumbs } from 'swiper/modules';

import './styles/Hobbies.scss';

const HobbiesSection = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    const { isMobile } = useWindowSize();
    const [photosData, setPhotosData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        api.get("/api/photos")
            .then(res => {
                setPhotosData(res.data);
            }).catch(err => {
                console.error("Erreur fetch photos:", err);
                setError("Impossible de charger les photos.");
            }).finally(setLoading(false));
    }, []);

    if (loading) {
        return <section className='hobbiesSection' id='hobbies'><h2>Chargement des loisirs...</h2></section>;
    }

    if (error) {
        return <section className='hobbiesSection' id='hobbies'><h2>Erreur: {error}</h2></section>;
    }

    if (photosData.length === 0) {
        return <section className='hobbiesSection' id='hobbies'><h2>Aucune photo à afficher.</h2></section>;
    }

    return (
        <section className='hobbiesSection' id='hobbies'>
            <h2>LOISIRS</h2>
            <p className='phrase'>Quand je ne suis pas au travail, je capte des moments. Voici une sélection de mes oeuvres photographiques :</p>
            <div className="hobbiesContainer">
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    slidesPerView={'auto'}
                    spaceBetween={30}
                    grabCursor={true}
                    centeredSlides={true}
                    effect={'coverflow'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[EffectCoverflow, FreeMode, Autoplay, Pagination, Navigation, Thumbs]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper2"
                >
                    {photosData.map((photo, index) => (
                        <SwiperSlide
                            key={photo._id || index}
                            style={{
                                'backgroundImage': `url(${photo.lien})`,
                            }}
                        >
                            <div className='partText'>
                                <h3 className="title">
                                    {photo.name}
                                </h3>
                                <h5 className="subtitle">
                                    - {photo.info}, {photo.year}
                                </h5>
                                {!isMobile &&
                                    <p className="text">
                                        {photo.description}
                                    </p>
                                }
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {photosData.map((photo, index) => (
                        <SwiperSlide key={`thumb-${photo._id || index}`}>
                            <img src={photo.lien} alt={photo.name} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
export default HobbiesSection;