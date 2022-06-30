
import Image from 'next/image';
import { Fragment } from 'react';
import ImgCinza from '../../static/image/cinza.webp';
import Styles from '../../styles/widget.module.css';

export default function ContainerWidget({ titulo, descricao, listaWidgets }) {
    return (
        <div className='flexColumn'>
            <b className='titulo'>{titulo}</b>
            <span className='texto'>{descricao}</span>

            <div className={`margem1 ${Styles.containerWidgets}`}>
                {
                    listaWidgets?.map((item, i) => (
                        <Fragment>
                            {/* <span>{item.nome}</span> */}

                            {
                                item.imagem && (
                                    <Image
                                        className={Styles.thumb}
                                        src={item.imagem}
                                        width={200}
                                        height={200}
                                        onError={() => setSrc(ImgCinza)}
                                        alt=''
                                    />
                                )
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

