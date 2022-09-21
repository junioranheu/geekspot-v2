import nProgress from 'nprogress';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { Fetch } from '../../../../utils/api/fetch';
import CONSTS_COMENTARIOS from '../../../../utils/consts/data/constComentarios';
import COMENTARIOS from '../../../../utils/consts/outros/comentarios';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import { Auth } from '../../../../utils/context/usuarioContext';
import { Aviso } from '../../../../utils/outros/aviso';
import horarioBrasilia from '../../../../utils/outros/horarioBrasilia';
import Textarea from '../../../outros/textarea';
import { FecharModal } from '../../fecharModal';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
    dados: any;
    itemId: number | null;
    getComentarios: (itemId: number) => Promise<void>;
}

export default function ModalResponderComentario({ handleModal, dados, itemId, getComentarios }: iParametros) {

    const token = Auth?.get()?.token ?? '';

    const refTextarea = useRef<any>(null);
    const refBtn = useRef<any>(null);
    const [texto, setTexto] = useState('');

    const [aviso, setAviso] = useState('');
    useEffect(() => {
        function gerarAvisoAleatoria() {
            const frases = [
                `Não se esqueça de sempre ser cordial ao responder à essa pergunta, ein?`,
                `O ${CONSTS_SISTEMA.NOME_SISTEMA} é um lugar legal, portanto seja legal ao responder essa pergunta também, beleza?`,
                `Não digite aqui informações pessoais que você não gostaria que fossem publicamente vistas, ok?`,
                `Nós, do ${CONSTS_SISTEMA.NOME_SISTEMA}, nunca pediremos sua senha ou informações que podem ser danosas à sua imagem. Cuidado, ok?`
            ];

            const random = Math.floor(Math.random() * frases.length);
            setAviso(frases[random]);
        }

        gerarAvisoAleatoria();
    }, []);

    async function handleEnviar() {
        if (!token) {
            Aviso.warn('Parece que você não está autenticado. Tente novamente mais tarde', 5000);
            return false;
        }

        if (!texto) {
            refTextarea.current.select();
            return false;
        }

        if (texto.length < 10) {
            Aviso.warn('O texto está muito curto, escreva mais algumas palavrinhas, por favor', 5000);
            refTextarea.current.select();
            return false;
        }

        nProgress.start();
        refBtn.current.disabled = true;

        const url = CONSTS_COMENTARIOS.API_URL_PUT_RESPONDER_COMENTARIO;
        const dto = {
            comentarioId: dados?.comentarioId,
            itemId: dados?.itemId,
            resposta: texto,
            dataResposta: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
        };

        const resposta = await Fetch.putApi(url, dto, token);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            setTexto('');
            refTextarea.current.select();
            refBtn.current.disabled = false;
            Aviso.warn(`${resposta?.mensagemErro}. Houve um problema em enviar sua resposta. Tente novamente mais tarde`, 5000);
            return false;
        }

        nProgress.done();
        setTexto('');
        refBtn.current.disabled = false;
        Aviso.success('Resposta enviada com sucesso', 5000);
        itemId && getComentarios(itemId);
        FecharModal.fecharModalClicandoNoBotao(handleModal);
    }

    return (
        <div className={Styles.main}>
            <span className={Styles.titulo}>Responda à pergunta de @{dados?.usuarios?.nomeUsuarioSistema}</span>
            <span className={`${Styles.texto} margem1`}>&#8220;{dados?.mensagem}&#8221;</span>

            <div className={`${Styles.div100} margem1`}>
                <Textarea
                    placeholder='Responda à pergunta'
                    height={null}
                    max={COMENTARIOS.MAX_CARACTERES}
                    texto={texto}
                    setTexto={setTexto}
                    referenciaTextarea={refTextarea}

                    isMostrarBotao={true}
                    textoBotao='Responder'
                    handleFuncaoBotao={handleEnviar}
                    referenciaBotao={refBtn}
                    isEnabledBotao={true}
                />
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.div100}>
                <span className={Styles.textoPequeno}>{aviso}</span>
            </div>
        </div>
    )
}