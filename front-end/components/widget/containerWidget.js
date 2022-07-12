
import Image from 'next/image';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import ImgCinza from '../../static/image/cinza.webp';
import Styles from '../../styles/widget.module.css';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import randomizarArray from '../../utils/outros/randomizarArray';
import Seta from '../svg/seta';

export default function ContainerWidget({ usuarioId, usuarioNomeSistema, descricao, listaWidgets }) {
    const tamanhoGrande = 406;
    const tamanhoPequeno = 196;

    const [ordemTamanhosImagens, setOrdemTamanhosImagens] = useState([]);
    const [listaWidgetsAleatorio, setListaWidgetsAleatorio] = useState([]);
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

        // #01;
        const ordens = gerarOrdemTamanhosImagens(listaWidgets.length);
        // console.log(ordens);
        setOrdemTamanhosImagens(ordens);

        // #02;
        gerarFraseAleatoria();

        // #03;
        setListaWidgetsAleatorio(randomizarArray(listaWidgets));
    }, [listaWidgets]);

    function definirPreco(preco, precoDesconto) {
        let precoFinal = `R$ ${preco}`;

        if (precoDesconto) {
            precoFinal = `<b style="color: var(--cor-principal);">R$ ${precoDesconto}</b> 
                          <span style="text-decoration: line-through;">R$ ${preco}</span>`;
        }

        return (
            <div dangerouslySetInnerHTML={{ __html: precoFinal }} />
        );
    }

    const [fraseAleatoria, setFraseAleatoria] = useState('');
    function gerarFraseAleatoria() {
        const frases = [
            'aqui', 'ver tudo', 'quero', 'muito mais aqui', 'corre aqui',
            'é aqui', 'imperdível', 'aí sim, meu patrão', 'muito chic', 'iti malia',
            'ver agora', 'uhu!', 'aí sim', 'opa', 'é pra já',
            'uhuuu', 'boraaa'
        ];

        const random = Math.floor(Math.random() * frases.length);
        setFraseAleatoria(frases[random]);
    }

    return (
        <div className='flexColumn margem6'>
            <div className='flexRow'>
                <div className='flexColumn'>
                    <b className='titulo cor-principal-hover pointer' onClick={() => Router.push(`/usuario/${usuarioId}/${ajustarUrl(usuarioNomeSistema)}`)}>
                        Itens do usuário @{usuarioNomeSistema}
                    </b>

                    <span className='texto'>{descricao}</span>
                </div>

                <div className={`${Styles.infoDireita} cor-principal-hover`} onClick={() => Router.push(`/usuario/${usuarioId}/${ajustarUrl(usuarioNomeSistema)}`)}>
                    {fraseAleatoria}
                    <Seta width='1rem' />
                </div>
            </div>

            <div className={`margem1 ${Styles.containerWidgets}`}>
                {
                    listaWidgetsAleatorio?.slice(0, 6).map((item, i) => (
                        <Fragment key={item.itemId}>
                            {
                                ordemTamanhosImagens[i] === 1 ? (
                                    // Tamanho grande;
                                    <div className={`${Styles.divImagemGrande} ${Styles.wrapImagem}`} title={item.nome}>
                                        <Image
                                            src={(item.imagem ? `${CONSTANTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.imagem}` : ImgCinza)}
                                            width={tamanhoGrande}
                                            height={tamanhoGrande}
                                            alt=''
                                            onClick={() => Router.push(`/item/${item?.itemId}/${ajustarUrl(item?.nome)}`)}
                                        />

                                        <span className={Styles.infoBottomLeft}>{definirPreco(item?.preco, item?.precoDesconto)}</span>
                                    </div>
                                ) : (
                                    // Tamanho pequeno;
                                    listaWidgets[i + 1] && ordemTamanhosImagens[i + 1] === 0 && (
                                        <div className={Styles.divGrupoImagens}>
                                            <div className={Styles.wrapImagem} title={item.nome}>
                                                <Image
                                                    src={(item.imagem ? `${CONSTANTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.imagem}` : ImgCinza)}
                                                    width={tamanhoPequeno}
                                                    height={tamanhoPequeno}
                                                    alt=''
                                                    onClick={() => Router.push(`/item/${item?.itemId}/${ajustarUrl(item?.nome)}`)}
                                                />

                                                <span className={Styles.infoBottomLeft}>{definirPreco(item?.preco, item?.precoDesconto)}</span>
                                            </div>

                                            <div className={Styles.wrapImagem} title={listaWidgets[i + 1].nome}>
                                                <Image
                                                    src={(listaWidgets[i + 1].imagem ? `${CONSTANTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${listaWidgets[i + 1].imagem}` : ImgCinza)}
                                                    width={tamanhoPequeno}
                                                    height={tamanhoPequeno}
                                                    alt=''
                                                    onClick={() => Router.push(`/item/${listaWidgets[i + 1]?.itemId}/${ajustarUrl(listaWidgets[i + 1]?.nome)}`)}
                                                />

                                                <span className={Styles.infoBottomLeft}>{definirPreco(listaWidgets[i + 1]?.preco, listaWidgets[i + 1]?.precoDesconto)}</span>
                                            </div>
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

