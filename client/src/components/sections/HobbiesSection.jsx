import { useRef, useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import './styles/Hobbies.scss';
import { EffectCoverflow, Autoplay, Pagination, Navigation, Mousewheel } from 'swiper/modules';
const HobbiesSection = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [swiperKey, setSwiperKey] = useState(0);
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

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        setSwiperKey(prev => prev + 1);
        
        if (isFullscreen) {
            setTimeout(() => {
                document.getElementById('hobbies').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    return (
        <section className={`hobbiesSection ${isFullscreen ? 'RectangleOverlay' : ''}`} id='hobbies'>
            {!isFullscreen && <h2>LOISIRS</h2>}
            {!isFullscreen && <p className='hobbyPhrase'>Quand je ne suis pas au travail, je capte des moments. Voici une sélection de mes oeuvres photographiques :</p>}
            <div className='hobbiesContainer'>
                <Swiper
                    key={swiperKey}
                    slidesPerView={isFullscreen ? 1 : 'auto'}
                    spaceBetween={isFullscreen ? 0 : 30}
                    grabCursor={true}
                    centeredSlides={true}
                    effect={isFullscreen ? 'slide' : 'coverflow'}
                    coverflowEffect={isFullscreen ? undefined : {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoHeight={!isFullscreen}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    mousewheel={isFullscreen}
                    pagination={{
                        clickable: true,
                    }}
                   breakpoints={!isFullscreen ? {
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
                    } : undefined}
                    navigation={true}
                    modules={[EffectCoverflow, Mousewheel, Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className={`mySwiper ${isFullscreen ? 'isFs' : ''}`}
                    onClick={toggleFullscreen}
                >
                    {photosData.map((photo, index) => (
                        <SwiperSlide
                            key={photo._id || index}
                        >
                            <div className="swiper-zoom-container">
                                <img src={photo.lien} />
                            </div>
                            {!isFullscreen && (
                                <div className='partText'>
                                    <h3 className="title">{photo.name}</h3>
                                    <h5 className="subtitle">- Photographie de Xingtong LIN, {photo.year}</h5>
                                    {!isMobile && <p className="text">{photo.description}</p>}
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            </div>
        </section>
    );
}
export default HobbiesSection;