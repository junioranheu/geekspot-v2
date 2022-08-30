import Image from 'next/image';
import ImgCinza from '../../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../../utils/data/constUpload';
import Styles from './index.module.scss';

export default function SessaoEsquerda({ item }: any) {
    return (
        <div className={Styles.sessaoEsquerda}>
            <div>
                <Image
                    src={(item.itensImagens ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.itensImagens[0]?.caminhoImagem}` : ImgCinza)}
                    width={500}
                    height={500}
                    alt=''
                    className={Styles.efeitoImagemHover}
                />
            </div>

            <div>
                {
                    item.itensImagens?.map((item: any, i: number) => (
                        <h1 key={i}>{item.caminhoImagem}</h1>
                    ))
                }
            </div>
        </div>
    )
}

