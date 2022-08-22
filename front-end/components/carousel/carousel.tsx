import Image, { StaticImageData } from 'next/image';
import Router from 'next/router';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import Styles from './carousel.module.scss';

interface iParametros {
    listaSlides: {
        imagem: StaticImageData;
        url: string;
    }[];
}

export default function Carousel({ listaSlides }: iParametros) {
    return (
        <Swiper className={Styles.carousel}
            slidesPerView={2}
            loop={true}
            centeredSlides={true}
            spaceBetween={50}
            speed={900}

            autoplay={{
                delay: 4000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            }}

            breakpoints={{
                1: {
                    slidesPerView: 1,
                }
            }}

            modules={[Autoplay, Navigation]}
            navigation
        >
            {
                listaSlides?.map((item, i: number) => (
                    <SwiperSlide key={i}>
                        <Image src={item.imagem} alt='' className={Styles.imagem} onClick={() => Router.push(item.url)} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}