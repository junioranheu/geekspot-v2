import Image, { StaticImageData } from 'next/image';
import Router from 'next/router';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Styles from './carousel.module.scss';

interface iParametros {
    isLoop: boolean;
    isShowPagination: boolean;
    listaSlides: {
        imagem: StaticImageData;
        url: string;
    }[];
}

export default function Carousel({ listaSlides, isLoop, isShowPagination }: iParametros) {
    return (
        <Swiper className={Styles.carousel}
            slidesPerView={1}
            loop={isLoop}
            centeredSlides={true}
            spaceBetween={50}
            speed={900}
            pagination={isShowPagination}

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

            modules={[Autoplay, Navigation, Pagination]}
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