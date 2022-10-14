import nProgress from 'nprogress';
import { ChangeEvent, Dispatch, Fragment, useEffect, useRef, useState } from 'react';
import Botao from '../../../../../components/outros/botao';
import Input from '../../../../../components/outros/input';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import { Fetch } from '../../../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../../../utils/consts/data/constUsuarios';
import { Aviso } from '../../../../../utils/outros/aviso';
import validarCEP from '../../../../../utils/outros/validacoes/validar.cep';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;

    isHouveAlteracao: boolean;
    setIsHouveAlteracao: Dispatch<boolean>;
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

export default function SessaoEndereco({ usuario, isHouveAlteracao, setIsHouveAlteracao }: iParametros) {

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
        !isHouveAlteracao && setIsHouveAlteracao(true);
    }

    // Buscar CEP usando o ViaCEP;
    useEffect(() => {
        function limparFormDataDadosEndereco() {
            setFormDataDadosEndereco({ ...formDataDadosEndereco, estado: '', cidade: '', bairro: '', rua: '' });
        }

        function handleViaCep(cepTratado: string) {
            fetch(`http://viacep.com.br/ws/${cepTratado}/json/`)
                .then(res => res.json())
                .then(data => {
                    if (data.erro) {
                        limparFormDataDadosEndereco();
                        return false;
                    }

                    setFormDataDadosEndereco({
                        ...formDataDadosEndereco,
                        estado: data?.uf ?? '',
                        cidade: data?.localidade ?? '',
                        bairro: data?.bairro ?? '',
                        rua: data?.logradouro ?? ''
                    });
                }).catch(erro => {
                    // console.log(erro);
                    limparFormDataDadosEndereco();
                    return false;
                });
        }

        if (formDataDadosEndereco?.cep) {
            const cepTratado = formDataDadosEndereco.cep.replace('-', '').replaceAll('_', '');

            if (cepTratado.length < 8) {
                limparFormDataDadosEndereco();
            } else {
                handleViaCep(cepTratado);
            }
        }
    }, [formDataDadosEndereco?.cep]);

    async function handleSubmit() {
        if (!formDataDadosEndereco?.cep || formDataDadosEndereco?.cep?.replace('-', '').replaceAll('_', '').length < 8) {
            Aviso.warn('O <b>CEP</b> está vazio ou inválido', 5000);
            return false;
        }

        nProgress.start();
        refBtn.current.disabled = true;

        const url = CONSTS_USUARIOS.API_URL_PUT_ATUALIZAR_DADOS_ENDERECO;
        const dto = {
            usuariosInformacoes: {
                cep: formDataDadosEndereco.cep,
                estado: formDataDadosEndereco.estado,
                cidade: formDataDadosEndereco.cidade,
                bairro: formDataDadosEndereco.bairro,
                rua: formDataDadosEndereco.rua,
                numeroResidencia: formDataDadosEndereco.numeroResidencia,
                referenciaLocal: formDataDadosEndereco.referenciaLocal
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
        Aviso.success('Os <b>dados do seu endereço</b> foram atualizados com sucesso', 5000);
    }

    return (
        <Fragment>
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Endereço' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <Input
                        titulo='CEP'
                        placeholder='_____-___'
                        name='cep'
                        tipo='text'
                        isDisabled={false}
                        minCaracteres={0}
                        dataTip='Onde você mora? 👀'
                        value={formDataDadosEndereco?.cep}
                        mascara='99999-999'
                        referencia={null}
                        isExibirIconeDireita={true}
                        isExisteValidacaoExtra={true}
                        handleValidacaoExtra={validarCEP(formDataDadosEndereco?.cep)}
                        handleChange={handleChange}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />

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
                        <Botao texto='Salvar alterações do seu endereço' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={refBtn} isEnabled={true} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

