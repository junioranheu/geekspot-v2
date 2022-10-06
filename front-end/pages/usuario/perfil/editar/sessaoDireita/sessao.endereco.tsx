import useViaCep from '@rsiqueira/use-viacep';
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import iUsuario from '../../../../../utils/types/usuario';
import iViaCep from '../../../../../utils/types/viaCep';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

interface iFormDadosEndereco {
    cep: string | null;
    numeroResidencia: string | null;
    referenciaLocal: string | null;
}

export default function SessaoEndereco({ usuario }: iParametros) {

    const refBtn = useRef<any>(null);

    const [formDataDadosEndereco, setFormDataDadosEndereco] = useState<iFormDadosEndereco>({
        cep: usuario?.usuariosInformacoes?.cep ?? '',
        numeroResidencia: usuario?.usuariosInformacoes?.numeroResidencia ?? '',
        referenciaLocal: usuario?.usuariosInformacoes?.referenciaLocal ?? ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataDadosEndereco({ ...formDataDadosEndereco, [e.target.name]: e.target.value });
    }

    // CEP usando o hook do Via Cep;
    const { cep, loading, error } = useViaCep(formDataDadosEndereco.cep?.toString());
    const [dadosEnderecoHookViaCep, setDadosEnderecoHookViaCep] = useState<iViaCep>({
        cep: cep?.cep ?? '',
        uf: cep?.uf ?? '',
        localidade: cep?.localidade ?? '',
        bairro: cep?.bairro ?? '',
        logradouro: cep?.logradouro ?? '',
        ddd: cep?.ddd ?? '',
        complemento: cep?.complemento ?? '',
        mensagemErro: error ?? ''
    });

    useEffect(() => {
        function handleViaCep() {
            // console.log(formDataDadosEndereco.cep);
            // console.log(cep);

            if (error || formDataDadosEndereco.cep?.length !== 8) {
                const resetarDados = {
                    cep: '',
                    uf: '',
                    localidade: '',
                    bairro: '',
                    logradouro: '',
                    ddd: '',
                    complemento: '',
                    mensagemErro: ''
                } as iViaCep;

                setDadosEnderecoHookViaCep(resetarDados); 
                return false;
            }

            const dados = {
                cep: cep?.cep ?? '',
                uf: cep?.uf ?? '',
                localidade: cep?.localidade ?? '',
                bairro: cep?.bairro ?? '',
                logradouro: cep?.logradouro ?? '',
                ddd: cep?.ddd ?? '',
                complemento: cep?.complemento ?? '',
                mensagemErro: error ?? ''
            } as iViaCep;

            setDadosEnderecoHookViaCep(dados);
        }

        handleViaCep();
    }, [cep, loading, error, formDataDadosEndereco.cep]);

    return (
        <Fragment>
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Endereço' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>CEP</span>
                        <input maxLength={8} className='input' type='text' name='cep' onChange={handleChange} value={formDataDadosEndereco.cep?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Estado</span>
                        <input readOnly={true} disabled={true} className='input' type='text' value={dadosEnderecoHookViaCep?.uf?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Cidade</span>
                        <input readOnly={true} disabled={true} className='input' type='text' value={dadosEnderecoHookViaCep?.localidade?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Bairro</span>
                        <input readOnly={true} disabled={true} className='input' type='text' value={dadosEnderecoHookViaCep?.bairro?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Rua</span>
                        <input readOnly={true} disabled={true} className='input' type='text' value={dadosEnderecoHookViaCep?.logradouro?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Número da residência</span>
                        <input className='input' type='text' name='numeroResidencia' onChange={handleChange} value={formDataDadosEndereco.numeroResidencia?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Referência</span>
                        <input className='input' type='text' name='referenciaLocal' onChange={handleChange} value={formDataDadosEndereco.referenciaLocal?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className='divBotaoInvertido'>
                        <Botao texto='Salvar alterações do seu endereço' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={refBtn} isEnabled={true} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

