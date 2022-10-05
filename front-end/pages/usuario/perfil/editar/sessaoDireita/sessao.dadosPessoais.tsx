import { ChangeEvent, Fragment, useRef, useState } from 'react';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import formatarData from '../../../../../utils/outros/formatarData';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

interface iFormDadosPessoais {
    nomeCompleto: string;
    email: string;
    senha: string;
    dataAniversario: string | Date | null;
    cpf: string | null;
    telefone: string | null;
}

export default function SessaoDadosPessoais({ usuario }: iParametros) {

    const refBtn = useRef<any>(null);

    const [formDataDadosPessoais, setFormDataDadosPessoais] = useState<iFormDadosPessoais>({
        nomeCompleto: usuario?.nomeCompleto ?? '',
        email: usuario?.email ?? '',
        senha: '',
        dataAniversario: usuario?.usuariosInformacoes?.dataAniversario ?? '',
        cpf: usuario?.usuariosInformacoes?.cpf ?? '',
        telefone: usuario?.usuariosInformacoes?.telefone ?? '',
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataDadosPessoais({ ...formDataDadosPessoais, [e.target.name]: e.target.value });
    }

    return (
        <Fragment>
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
                        <span className={Styles.item}>Senha</span>
                        <input className='input' type='text' name='senha' onChange={handleChange} value={formDataDadosPessoais.senha} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Aniversário</span>
                        <input className='input' type='text' name='dataAniversario' onChange={handleChange} value={formatarData((formDataDadosPessoais?.dataAniversario?.toString() ?? ''), 1)} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>CPF</span>
                        <input className='input' type='text' name='cpf' onChange={handleChange} value={formDataDadosPessoais.cpf?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Telefone</span>
                        <input className='input' type='text' name='telefone' onChange={handleChange} value={formDataDadosPessoais.telefone?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className='divBotaoInvertido'>
                        <Botao texto='Salvar alterações dos seus dados pessoais' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={refBtn} isEnabled={true} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

