import moment from 'moment';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, useRef, useState } from 'react';
import ModalAlterarSenha from '../../../../../components/modal/modal.alterarSenha';
import ModalLayout from '../../../../../components/modal/_modal.layout';
import ModalWrapper from '../../../../../components/modal/_modal.wrapper';
import Botao from '../../../../../components/outros/botao';
import InputMascara from '../../../../../components/outros/inputMascara';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import { Fetch } from '../../../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../../../utils/consts/data/constUsuarios';
import CONSTS_SISTEMA from '../../../../../utils/consts/outros/sistema';
import { Aviso } from '../../../../../utils/outros/aviso';
import verificarDadosCriarConta from '../../../../../utils/outros/verificarDadosCriarConta';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

interface iFormDadosPessoais {
    nomeCompleto: string;
    nomeUsuarioSistema: string;
    email: string;
    senha: string;
    dataAniversario: string | Date | null;
    cpf: string | null;
    telefone: string | null;
}

export default function SessaoDadosPessoais({ usuario }: iParametros) {

    const refBtn = useRef<any>(null);
    const [isModalAlterarSenha, setIsModalAlterarSenha] = useState(false);

    const [formDataDadosPessoais, setFormDataDadosPessoais] = useState<iFormDadosPessoais>({
        nomeCompleto: usuario?.nomeCompleto ?? '',
        email: usuario?.email ?? '',
        nomeUsuarioSistema: usuario?.nomeUsuarioSistema ?? '',
        senha: `AEA_${CONSTS_SISTEMA.NOME_SISTEMA}`,
        dataAniversario: usuario?.usuariosInformacoes?.dataAniversario ?? '',
        cpf: usuario?.usuariosInformacoes?.cpf ?? '',
        telefone: usuario?.usuariosInformacoes?.telefone ?? '',
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataDadosPessoais({ ...formDataDadosPessoais, [e?.target?.name]: e?.target?.value });
    }

    async function handleSubmit() {
        let isContinuarUm = verificarDadosCriarConta(formDataDadosPessoais, null, null, null, null, null, false);
        if (!isContinuarUm) {
            refBtn.current.disabled = false;
            return false;
        }

        nProgress.start();
        refBtn.current.disabled = true;

        const url = CONSTS_USUARIOS.API_URL_PUT_ATUALIZAR_DADOS_PESSOAIS;
        const dto = {
            nomeCompleto: formDataDadosPessoais.nomeCompleto,
            email: formDataDadosPessoais.email,
            nomeUsuarioSistema: formDataDadosPessoais.nomeUsuarioSistema,
            usuariosInformacoes: {
                dataAniversario: formDataDadosPessoais.dataAniversario ? formDataDadosPessoais.dataAniversario : '0001-01-01',
                cpf: formDataDadosPessoais.cpf,
                telefone: formDataDadosPessoais.telefone,
            }
        };

        const resposta = await Fetch.putApi(url, dto) as iUsuario;
        if (!resposta || resposta?.erro) {
            nProgress.done();
            refBtn.current.disabled = false;
            Aviso.warn(resposta?.mensagemErro ?? 'Houve um erro ao atualizar os dados', 5000);
            return false;
        }

        nProgress.done();
        refBtn.current.disabled = false;
        Aviso.success('Os seus <b>dados pessoais</b> foram atualizados com sucesso', 5000);
    }

    return (
        <Fragment>
            {/* Modal alterar senha */}
            <ModalWrapper isOpen={isModalAlterarSenha}>
                <ModalLayout handleModal={() => setIsModalAlterarSenha(!isModalAlterarSenha)} isExibirApenasLogo={true} titulo='Alterar senha' tamanho='pequeno' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalAlterarSenha handleModal={() => setIsModalAlterarSenha(!isModalAlterarSenha)} />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Dados pessoais' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Nome completo</span>
                        <input className='input' type='text' name='nomeCompleto' onChange={handleChange} value={formDataDadosPessoais.nomeCompleto} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>E-mail</span>
                        <input className='input' type='text' name='email' onChange={handleChange} value={formDataDadosPessoais.email} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Nome de usuário</span>
                        <input className='input' type='text' name='nomeUsuarioSistema' onChange={handleChange} value={formDataDadosPessoais.nomeUsuarioSistema} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Senha</span>
                        <input readOnly={true} disabled={true} className='input' type='password' name='senha' onChange={handleChange} value={formDataDadosPessoais.senha} />

                        <div>
                            <Botao texto='Alterar senha' url={null} isNovaAba={false} handleFuncao={() => setIsModalAlterarSenha(true)} Svg={null} refBtn={refBtn} isEnabled={true} />
                        </div>
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Aniversário</span>
                        <input
                            className='input'
                            type='date'
                            name='dataAniversario'
                            onChange={handleChange}
                            value={moment(formDataDadosPessoais?.dataAniversario).format('yyyy-MM-DD')}
                        />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>CPF</span>

                        <InputMascara
                            className='input'
                            name='cpf'
                            onChange={handleChange}
                            value={formDataDadosPessoais.cpf?.toString()}
                            mascara='999.999.999-99'
                            onBlur={() => null}
                            placeholder='___.___.___-__'
                            isDisabled={false}
                        />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Telefone</span>

                        <InputMascara
                            className='input'
                            name='telefone'
                            onChange={handleChange}
                            value={formDataDadosPessoais.telefone?.toString()}
                            mascara='(99) 99999-9999'
                            onBlur={() => null}
                            placeholder='(__) _____-____'
                            isDisabled={false}
                        />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className='divBotaoInvertido'>
                        <Botao texto='Salvar alterações dos seus dados pessoais' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={refBtn} isEnabled={true} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

