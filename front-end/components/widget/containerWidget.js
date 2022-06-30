
import Image from 'next/image';
import { Fragment } from 'react';
import ImgCinza from '../../static/image/cinza.webp';
import Styles from '../../styles/widget.module.css';

export default function ContainerWidget({ titulo, descricao, listaWidgets }) {
    const tamanhoGrande = 1050;
    const tamanhoPequeno = 500;

    return (
        <div className='flexColumn'>
            <b className='titulo'>{titulo}</b>
            <span className='texto'>{descricao}</span>

            <div className={`margem1 ${Styles.containerWidgets}`}>
                {
                    listaWidgets?.slice(0, 6).map((item, i) => (
                        <Fragment key={item.id}>
                            {
                                item.tamanho === 2 ? (
                                    // Tamanho grande
                                    <Image
                                        src={item.imagem}
                                        width={tamanhoGrande}
                                        height={tamanhoGrande}
                                        onError={() => setSrc(ImgCinza)}
                                        alt=''
                                    />
                                ) : (
                                    // Tamanho pequeno;
                                    listaWidgets[i + 1] && listaWidgets[i + 1]?.tamanho === 1 && (
                                        <div className={Styles.divGrupoImagens}>
                                            <Image
                                                src={item.imagem}
                                                width={tamanhoPequeno}
                                                height={tamanhoPequeno}
                                                onError={() => setSrc(ImgCinza)}
                                                alt=''
                                            />

                                            <Image
                                                src={listaWidgets[i + 1].imagem}
                                                width={tamanhoPequeno}
                                                height={tamanhoPequeno}
                                                onError={() => setSrc(ImgCinza)}
                                                alt=''
                                            />
                                        </div>
                                    )
                                )
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

