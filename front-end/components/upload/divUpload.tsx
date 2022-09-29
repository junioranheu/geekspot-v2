import Image from 'next/image';
import ImgCinza from '../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../utils/consts/data/constUpload';
import Botao from '../outros/botao';
import Styles from './divUpload.module.scss';

interface iParametros {
    imagem: string | null;
    titulo: string;
    infoAleatoriaUm: string;
    infoAleatoriaDois: string | null;
    textoBotaoDireita: string | null;
}

export default function DivUpload({ imagem, titulo, infoAleatoriaUm, infoAleatoriaDois, textoBotaoDireita }: iParametros) {
    return (
        <div className={Styles.main}>
            <Image src={(imagem ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${imagem}` : ImgCinza)} width={100} height={100} alt='' />

            <div className={Styles.infos}>
                <span className={Styles.titulo}>{titulo}</span>
                <span className={Styles.texto}>{infoAleatoriaUm}</span>
                <span className={Styles.texto}>{infoAleatoriaDois && infoAleatoriaDois}</span>
                {imagem && <span className={`${Styles.texto} ${Styles.vermelho} pointer`}>Remover</span>}
            </div>

            {
                textoBotaoDireita && (
                    <div className={Styles.divBotao}>
                        <span className='separador'></span>
                        <Botao texto={textoBotaoDireita} url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                )
            }
        </div>
    )
}

