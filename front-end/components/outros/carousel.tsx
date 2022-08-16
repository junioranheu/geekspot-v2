import Image from 'next/image';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImagemTeste1 from '../../static/image/teste1.webp';
import ImagemTeste2 from '../../static/image/teste2.webp';
import Styles from '../../styles/carousel.module.scss';

interface iParametros {
    // texto: string;
    // url: string | null;
    // isNovaAba: boolean;
    // Svg: ReactNode;
    // refBtn: Ref<any>;
    // isEnabled: boolean;
}

export default function Carousel({ }: iParametros) {
    return (
        <Swiper className={Styles.carousel}
            slidesPerView={1}
            loop={true}

            breakpoints={{
                1: {
                    slidesPerView: 1,
                }
            }}

            modules={[Navigation]}
            navigation
        >
            <SwiperSlide>
                <Image src={ImagemTeste1} alt='' className={Styles.imagem} />
            </SwiperSlide>

            <SwiperSlide>
                <Image src={ImagemTeste2} alt='' className={Styles.imagem} />
            </SwiperSlide>
        </Swiper>
    )
}