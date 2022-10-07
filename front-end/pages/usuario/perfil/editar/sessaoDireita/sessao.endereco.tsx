import useViaCep from '@rsiqueira/use-viacep';
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import Botao from '../../../../../components/outros/botao';
import InputMascara from '../../../../../components/outros/inputMascara';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

interface iFormDadosEndereco {
    cep: string | null;
    estado: string | null;
    cidade: string | null;
    bairro: string | null;
    rua: string | null;
    numeroResidencia: string | null;
    referenciaLocal: string | null;
}

export default function SessaoEndereco({ usuario }: iParametros) {

    const refBtn = useRef<any>(null);

    const [formDataDadosEndereco, setFormDataDadosEndereco] = useState<iFormDadosEndereco>({
        cep: usuario?.usuariosInformacoes?.cep ?? '',
        estado: usuario?.usuariosInformacoes?.estado ?? '',
        cidade: usuario?.usuariosInformacoes?.cidade ?? '',
        bairro: usuario?.usuariosInformacoes?.bairro ?? '',
        rua: usuario?.usuariosInformacoes?.rua ?? '',
        numeroResidencia: usuario?.usuariosInformacoes?.numeroResidencia ?? '',
        referenciaLocal: usuario?.usuariosInformacoes?.referenciaLocal ?? ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataDadosEndereco({ ...formDataDadosEndereco, [e.target.name]: e.target.value });
    }

    // CEP usando o hook do Via Cep;
    const { cep, loading, error } = useViaCep(formDataDadosEndereco.cep?.toString());
    useEffect(() => {
        function handleViaCep(formDataDadosEnderecoCep: string) {
            // console.log(formDataDadosEnderecoCep, formDataDadosEnderecoCep?.length, error);

            // Se o CEP tiver tracinho e ter menos que 9 caracteres limpe os valores (12605-110);
            if (error || (formDataDadosEnderecoCep?.includes('-') && formDataDadosEnderecoCep?.length !== 9)) {
                setFormDataDadosEndereco({ ...formDataDadosEndereco, estado: '', cidade: '', bairro: '', rua: '' });
                return false;
            }

            // Se o CEP não tiver tracinho e ter menos que 8 caracteres limpe os valores (12605110);
            if (!formDataDadosEnderecoCep?.includes('-') && formDataDadosEnderecoCep?.length !== 8) {
                setFormDataDadosEndereco({ ...formDataDadosEndereco, estado: '', cidade: '', bairro: '', rua: '' });
                return false;
            }

            // Se o resultado do hook useViaCep tiver vazio, pare o processo (isso serve para os casos iniciais);
            if (!cep?.uf) {
                return false;
            }

            // Se tiver tudo ok, busque o CEP;
            // console.log(cep);
            setFormDataDadosEndereco({
                ...formDataDadosEndereco,
                estado: cep?.uf ?? '',
                cidade: cep?.localidade ?? '',
                bairro: cep?.bairro ?? '',
                rua: cep?.logradouro ?? ''
            });
        }

        if (formDataDadosEndereco?.cep) {
            handleViaCep(formDataDadosEndereco.cep);
        }
    }, [formDataDadosEndereco?.cep, error]);

    return (
        <Fragment>
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Endereço' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>CEP</span>

                        <InputMascara
                            className='input'
                            name='cep'
                            onChange={handleChange}
                            value={formDataDadosEndereco?.cep?.toString()}
                            mascara='99999-999'
                            onBlur={() => null}
                            placeholder='_____-___'
                            isDisabled={false}
                        />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Estado</span>
                        <input readOnly={true} disabled={true} className='input' type='text' value={formDataDadosEndereco?.estado?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Cidade</span>
                        <input readOnly={true} disabled={true} className='input' type='text' value={formDataDadosEndereco?.cidade?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Bairro</span>
                        <input readOnly={true} disabled={true} className='input' type='text' value={formDataDadosEndereco?.bairro?.toString()} />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Rua</span>
                        <input readOnly={true} disabled={true} className='input' type='text' value={formDataDadosEndereco?.rua?.toString()} />
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

