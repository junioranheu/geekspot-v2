import Image from 'next/image';
import ImgCinza from '../../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../../utils/data/constUpload';
import Styles from './index.module.scss';

export default function SessaoEsquerda({ item }: any) {
    return (
        <div className={Styles.sessaoEsquerda}>
            <Image
                src={(item.imagem ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.imagem}` : ImgCinza)}
                width={500}
                height={500}
                alt=''
                className={Styles.efeitoImagemHover}
            />
        </div>
    )
}

