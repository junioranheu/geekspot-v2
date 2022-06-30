
import Image from 'next/image';
import { Fragment } from 'react';
import ImgCinza from '../../static/image/cinza.webp';
import Styles from '../../styles/widget.module.css';

export default function ContainerWidget({ titulo, descricao, listaWidgets }) {

    function setarTamanhoImagem(tamanho) {
        const res = tamanho === 1 ? 250 : 450;
        return res;
    }

    return (
        <div className='flexColumn'>
            <b className='titulo'>{titulo}</b>
            <span className='texto'>{descricao}</span>

            <div className={`margem1 ${Styles.containerWidgets}`}>
                {
                    listaWidgets?.map((item, i) => (
                        <Fragment key={item.id}>
                            <Image
                                src={item.imagem}
                                width={setarTamanhoImagem(item.tamanho)}
                                height={setarTamanhoImagem(item.tamanho)}
                                onError={() => setSrc(ImgCinza)}
                                alt=''
                            />
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

