import Image from 'next/image';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Fragment, useEffect, useState } from 'react';
import ModalAvisoLogin from '../../../../components/modal/modal.aviso/login';
import ModalLayout from '../../../../components/modal/_modal.layout';
import ModalWrapper from '../../../../components/modal/_modal.wrapper';
import Botao from '../../../../components/outros/botao';
import ImgCinza from '../../../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../../../utils/consts/data/constUpload';
import CONSTS_USUARIOS_SEGUIR from '../../../../utils/consts/data/constUsuariosSeguir';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import { Auth } from '../../../../utils/context/usuarioContext';
import ajustarUrl from '../../../../utils/outros/ajustarUrl';
import { Aviso } from '../../../../utils/outros/aviso';
import { Fetch } from '../../../../utils/outros/fetch';
import formatarData from '../../../../utils/outros/formatarData';
import horarioBrasilia from '../../../../utils/outros/horarioBrasilia';
import letraMaiusculaPrimeiraPalavraApenas from '../../../../utils/outros/letraMaiusculaPrimeiraPalavraApenas';
import iItem from '../../../../utils/types/item';
import Styles from './index.module.scss';

export default function DivOwner({ item }: iItem) {

    const token = Auth?.get()?.token ?? '';
    const usuarioLogadoId = Auth?.get()?.usuarioId ?? 0;

    const urlPerfilDonoItem = (item?.usuarios?.nomeUsuarioSistema ? `/usuario/${item?.usuarioId}/${ajustarUrl(item?.usuarios?.nomeUsuarioSistema?.toString())}` : '/');
    const [isModalAvisoLoginOpen, setIsModalAvisoLoginOpen] = useState(false);

    const [isJaSigo, setIsJaSigo] = useState(false);
    async function getIsJaSegue(token: string, usuarioId: number) {
        const url = `${CONSTS_USUARIOS_SEGUIR.API_URL_GET_IS_JA_SIGO_ESSE_USUARIO}?usuarioSeguidoId=${usuarioId}`;
        const isJaSigo = await Fetch.getApi(url, token);
        // console.log(isJaSigo);
        setIsJaSigo(isJaSigo);
    }

    useEffect(() => {
        if (token && item?.usuarioId) {
            getIsJaSegue(token, item?.usuarioId);
        }
    }, [token, item?.usuarioId])

    async function handleSeguir(usuarioId: number) {
        if (!token) {
            setIsModalAvisoLoginOpen(true);
            return false;
        }

        nProgress.start();
        const dto = {
            usuarioSeguidoId: usuarioId,
            usuarioSeguidorId: usuarioLogadoId,
            isAtivo: 1,
            dataRegistro: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
        }

        const url = CONSTS_USUARIOS_SEGUIR.API_URL_POST_ADICIONAR;
        const resposta = await Fetch.postApi(url, dto, token);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            Aviso.warn('Houve um problema em seguir este usuário. Tente novamente mais tarde', 5000);
            return false;
        }

        nProgress.done();
        Aviso.success('Usuário seguido com sucesso', 5000);
        getIsJaSegue(token, item?.usuarioId)
    }

    async function handleDeixarDeSeguir(usuarioId: number) {
        if (!token) {
            setIsModalAvisoLoginOpen(true);
            return false;
        }

        nProgress.start();
        const url = `${CONSTS_USUARIOS_SEGUIR.API_URL_POST_DELETAR}?usuarioSeguidoId=${usuarioId}`;
        const resposta = await Fetch.postApi(url, null, token);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            Aviso.warn('Houve um problema em seguir este usuário. Tente novamente mais tarde', 5000);
            return false;
        }

        nProgress.done();
        // Aviso.success('Você deixou de seguir este usuário. Caso mude de ideia clique para segui-lo novamente', 5000);
        getIsJaSegue(token, item?.usuarioId)
    }

    return (
        <Fragment>
            {/* Modal */}
            <ModalWrapper isOpen={isModalAvisoLoginOpen} >
                <ModalLayout handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)} isExibirApenasLogo={true} titulo='Entre agora mesmo' tamanho='pequeno' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalAvisoLogin
                        handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)}
                        titulo={null}
                        descricao='Para seguir este usuário é necessário entrar em sua conta antes'
                    />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <div className={`${Styles.divOwner} margem1_5 flexColumn`}>
                <div className={Styles.divOwnerInner}>
                    <div className='flexRow'>
                        <div className={Styles.divFoto} onClick={() => Router.push(urlPerfilDonoItem)}>
                            <Image
                                src={(item?.usuarios?.foto ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${item?.usuarios?.foto}` : ImgCinza)}
                                title={`Visitar perfil de @${item?.usuarios?.nomeUsuarioSistema}`}
                                width={30}
                                height={30}
                                alt=''
                            />
                        </div>

                        <div>
                            <span className='pointer cor-principal-hover' onClick={() => Router.push(urlPerfilDonoItem)} title={`Visitar perfil de @${item?.usuarios?.nomeUsuarioSistema}`}>
                                {(item?.usuarios?.nomeUsuarioSistema ? `@${item?.usuarios?.nomeUsuarioSistema}` : '-')}
                            </span>

                            <span>{(item?.usuarios?.nomeCompleto ?? '-')}</span>
                        </div>
                    </div>

                    {
                        usuarioLogadoId !== item?.usuarioId && (
                            <div className={Styles.botaoCutomDivOwner}>
                                {
                                    isJaSigo ? (
                                        <Botao texto='Deixar de seguir' url={null} isNovaAba={false} handleFuncao={() => handleDeixarDeSeguir(item?.usuarioId)} Svg={null} refBtn={null} isEnabled={true} />
                                    ) : (
                                        <Botao texto='Seguir' url={null} isNovaAba={false} handleFuncao={() => handleSeguir(item?.usuarioId)} Svg={null} refBtn={null} isEnabled={true} />
                                    )
                                }
                            </div>
                        )
                    }
                </div>

                <span className='separadorHorizontal'></span>

                <div className={Styles.divOwnerInner}>
                    <div>
                        <span>À troca/venda</span>
                        <span>xxx</span>
                    </div>

                    <div>
                        <span>Negócios feitos</span>
                        <span>xxx</span>
                    </div>
                </div>

                <span className='separadorHorizontal'></span>

                <div className={Styles.divOwnerInner}>
                    <div>
                        <span>Tempo médio de envio</span>
                        <span>xxx</span>
                    </div>

                    <div>
                        <span>No {CONSTS_SISTEMA.NOME_SISTEMA} desde</span>
                        <span>{(item?.usuarios?.dataRegistro.toString() ? letraMaiusculaPrimeiraPalavraApenas(formatarData(item?.usuarios?.dataRegistro, 3)) : '-')}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}