import nProgress from 'nprogress';
import { ChangeEvent, Dispatch, KeyboardEvent, useRef, useState } from 'react';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../utils/consts/data/constUsuarios';
import { Aviso } from '../../../utils/outros/aviso';
import Botao from '../../outros/botao';
import { FecharModal } from '../fecharModal';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
}

interface iFormRecuperarSenha {
    email: string;
}

export default function ModalRecuperarSenha({ handleModal }: iParametros) {

    const refEmail = useRef<any>(null);
    const refBtn = useRef<any>(null);

    const [formRecuperarSenha, setFormRecuperarSenha] = useState<iFormRecuperarSenha>({
        email: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormRecuperarSenha({ ...formRecuperarSenha, [e?.target?.name]: e?.target?.value });
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    async function handleRecuperarSenha() {
        if (!formRecuperarSenha.email) {
            Aviso.warn('O <b>e-mail</b> está vazio', 5000);
            refEmail && refEmail.current?.select();
            return false;
        }

        nProgress.start();
        const url = CONSTS_USUARIOS.API_URL_POST_EMAIL_RECUPERAR_SENHA;
        const dto = {
            email: formRecuperarSenha.email
        };

        const resposta = await Fetch.postApi(url, dto);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            Aviso.error((resposta?.mensagemErro ?? 'Houve um problema ao tentar recuperar sua senha. Tente novamente mais tarde'), 10000);
            return false;
        }

        nProgress.done();
        Aviso.success('Um <b>e-mail de recuperação de senha</b> foi enviado para você!<br/>Verifique sua caixa de e-mail agora mesmo', 10000);
        FecharModal.fecharModalClicandoNoBotao(handleModal);
    }

    return (
        <div className={Styles.main}>
            <span className={Styles.titulo}>Preencha o campo abaixo para recuperar sua senha</span>

            <div className={`${Styles.div100} margem1`}>
                <input
                    className='input'
                    type='text'
                    placeholder='E-mail'
                    name='email'
                    value={formRecuperarSenha.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    ref={refEmail}
                />
            </div>

            <div className={`${Styles.botaoCustom} margem0_5`} onClick={handleRecuperarSenha}>
                <Botao texto='Recuperar senha' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={refBtn} isEnabled={true} />
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.div100}>
                <span className={Styles.textoPequeno}>Não se esqueça de conferir a lixeira do seu correio eletrônico também, belê? 🫶</span>
            </div>
        </div>
    )
}