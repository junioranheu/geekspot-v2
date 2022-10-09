import nProgress from 'nprogress';
import { Dispatch, Fragment, useRef, useState } from 'react';
import ModalDesativarConta from '../../../../../components/modal/modal.desativarConta';
import ModalLayout from '../../../../../components/modal/_modal.layout';
import ModalWrapper from '../../../../../components/modal/_modal.wrapper';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import AvisoSvg from '../../../../../components/svg/aviso';
import Seguranca from '../../../../../components/svg/seguranca';
import { Fetch } from '../../../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../../../utils/consts/data/constUsuarios';
import { Aviso } from '../../../../../utils/outros/aviso';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;

    setIsHouveAlteracao: Dispatch<boolean>;
}

export default function SessaoMinhaConta({ usuario, setIsHouveAlteracao }: iParametros) {

    const [isModalDesativarConta, setIsModalDesativarConta] = useState(false);
    const refBtnVerificarConta = useRef<any>(null);

    async function handleVerificarConta() {
        nProgress.start();
        refBtnVerificarConta.current.disabled = true;

        const url = CONSTS_USUARIOS.API_URL_POST_EMAIL_VERIFICAR_CONTA;
        const resposta = await Fetch.postApi(url, null);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            Aviso.warn(resposta?.mensagemErro ?? 'Houve um erro ao verificar sua conta', 5000);
            return false;
        }

        nProgress.done();
        Aviso.success('Um <b>e-mail de verificação de conta</b> foi enviado para você! Verifique seu correio eletrônico agora mesmo', 10000);
    }

    return (
        <Fragment>
            {/* Modal desativar conta */}
            <ModalWrapper isOpen={isModalDesativarConta}>
                <ModalLayout handleModal={() => setIsModalDesativarConta(!isModalDesativarConta)} isExibirApenasLogo={true} titulo='Desativar conta' tamanho='pequeno' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalDesativarConta
                        handleModal={() => setIsModalDesativarConta(!isModalDesativarConta)}
                        setIsHouveAlteracao={setIsHouveAlteracao}
                    />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Minha conta' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className='divBotaoInvertido'>
                        <Botao
                            texto={`‏‏‎ ‎‏‏‎ ‎${(usuario?.isVerificado ? 'Sua conta já está verificada ✅' : '‏‏‎ ‎‏‏‎ ‎Reenviar e-mail de verificação de conta')}`}
                            url={null}
                            isNovaAba={false}
                            handleFuncao={() => (usuario?.isVerificado ? null : handleVerificarConta())}
                            Svg={<Seguranca width={16} url={null} title={null} isCorPrincipal={false} />}
                            refBtn={refBtnVerificarConta}
                            isEnabled={(!usuario?.isVerificado)}
                        />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={`${Styles.botaoFonteVermelha} divBotaoInvertido`}>
                        <Botao
                            texto='&nbsp;&nbsp;Quero desativar minha conta'
                            url={null}
                            isNovaAba={false}
                            handleFuncao={() => setIsModalDesativarConta(true)}
                            Svg={<AvisoSvg width={16} url={null} title={null} isCorPrincipal={false} />}
                            refBtn={null}
                            isEnabled={true}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

