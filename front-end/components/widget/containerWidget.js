
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import ImgCinza from '../../static/image/cinza.webp';
import Styles from '../../styles/widget.module.css';

export default function ContainerWidget({ titulo, descricao, listaWidgets }) {
    const tamanhoGrande = 366;
    const tamanhoPequeno = 176;

    const [ordemTamanhosImagens, setOrdemTamanhosImagens] = useState([]);
    useEffect(() => {
        function gerarOrdemTamanhosImagens(qtd) {
            let ordens = [];

            for (let index = 0; index < qtd; index++) {
                // Se o index for 0, isso significa que é o primeiro caso... vamos randomizar se o primeiro caso vai ser 1 [grande] ou 0 [pequeno];
                if (index === 0) {
                    // Se tiver apenas 1 item, automaticamente deve ser 1 [grande];
                    if (qtd === 1) {
                        ordens.push(1);
                        continue;
                    }

                    // Randomizar 1 [grande] ou não;
                    var randomBoolean = Math.random() < 0.5; // Aleatório, true ou false;
                    ordens.push((randomBoolean ? 1 : 0));
                    continue;
                }

                // Verificar se:
                // #01 - O último é 1 [grande];
                // #02 - Ou se o último é 0 [pequeno] e o penúltimo é 1 [grande];
                // #03 - Se o index for 1 [o segundo da lista] e o último for 0 [pequeno];
                // Caso sim... o próximo tem que ser 0 [pequeno];
                const isOkParaSerPequeno =
                    (ordens[index - 1] === 1) ||
                    (ordens[index - 1] === 0 && ordens[index - 2] === 1) ||
                    (index === 1 && ordens[index - 1] === 0);

                if (isOkParaSerPequeno) {
                    // Verificar se for o último item e o anterior for 1 [grande], esse AINDA deve ser 1 [grande]!
                    const isDeveSeGrande = (index === qtd - 1) && (ordens[index - 1] === 1);
                    // console.log(index === qtd, ordens[index - 1] === 1, isDeveSeGrande);

                    if (isDeveSeGrande) {
                        ordens.push(1); // Grande;
                    } else {
                        ordens.push(0); // Pequeno;
                    }
                } else {
                    ordens.push(1); // Grande;
                }
            }

            return ordens;
        }

        const ordens = gerarOrdemTamanhosImagens(listaWidgets.length);
        // console.log(ordens);
        setOrdemTamanhosImagens(ordens);
    }, [listaWidgets.length]);

    return (
        <div className='flexColumn margem6'>
            <b className='titulo'>{titulo}</b>
            <span className='texto'>{descricao}</span>

            <div className={`margem1 ${Styles.containerWidgets}`}>
                {
                    listaWidgets?.slice(0, 6).map((item, i) => (
                        <Fragment key={item.id}>
                            {
                                ordemTamanhosImagens[i] === 1 ? (
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
                                    listaWidgets[i + 1] && ordemTamanhosImagens[i + 1] === 0 && (
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

