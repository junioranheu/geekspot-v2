import nProgress from 'nprogress';
import { ChangeEvent, Dispatch, useEffect, useRef, useState } from 'react';
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
        <div className={`${Styles.main} margem1`}>
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
                    <Input
                        titulo='Estado'
                        placeholder=''
                        name=''
                        tipo='text'
                        isDisabled={true}
                        minCaracteres={0}
                        dataTip=''
                        value={formDataDadosEndereco?.estado}
                        mascara=''
                        referencia={null}
                        isExibirIconeDireita={false}
                        isExisteValidacaoExtra={false}
                        handleValidacaoExtra={null}
                        handleChange={() => null}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />

                    <span className='separadorHorizontal'></span>
                    <Input
                        titulo='Cidade'
                        placeholder=''
                        name=''
                        tipo='text'
                        isDisabled={true}
                        minCaracteres={0}
                        dataTip=''
                        value={formDataDadosEndereco?.cidade}
                        mascara=''
                        referencia={null}
                        isExibirIconeDireita={false}
                        isExisteValidacaoExtra={false}
                        handleValidacaoExtra={null}
                        handleChange={() => null}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />

                    <span className='separadorHorizontal'></span>
                    <Input
                        titulo='Bairro'
                        placeholder=''
                        name=''
                        tipo='text'
                        isDisabled={true}
                        minCaracteres={0}
                        dataTip=''
                        value={formDataDadosEndereco?.bairro}
                        mascara=''
                        referencia={null}
                        isExibirIconeDireita={false}
                        isExisteValidacaoExtra={false}
                        handleValidacaoExtra={null}
                        handleChange={() => null}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />

                    <span className='separadorHorizontal'></span>
                    <Input
                        titulo='Rua'
                        placeholder=''
                        name=''
                        tipo='text'
                        isDisabled={true}
                        minCaracteres={0}
                        dataTip=''
                        value={formDataDadosEndereco?.rua}
                        mascara=''
                        referencia={null}
                        isExibirIconeDireita={false}
                        isExisteValidacaoExtra={false}
                        handleValidacaoExtra={null}
                        handleChange={() => null}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />

                    <span className='separadorHorizontal'></span>
                    <Input
                        titulo='Número da residência'
                        placeholder=''
                        name='numeroResidencia'
                        tipo='text'
                        isDisabled={false}
                        minCaracteres={0}
                        dataTip=''
                        value={formDataDadosEndereco?.numeroResidencia}
                        mascara=''
                        referencia={null}
                        isExibirIconeDireita={false}
                        isExisteValidacaoExtra={false}
                        handleValidacaoExtra={null}
                        handleChange={handleChange}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />

                    <span className='separadorHorizontal'></span>
                    <Input
                        titulo='Referência do local'
                        placeholder=''
                        name='referenciaLocal'
                        tipo='text'
                        isDisabled={false}
                        minCaracteres={0}
                        dataTip=''
                        value={formDataDadosEndereco?.referenciaLocal}
                        mascara=''
                        referencia={null}
                        isExibirIconeDireita={false}
                        isExisteValidacaoExtra={false}
                        handleValidacaoExtra={null}
                        handleChange={handleChange}
                        handleKeyPress={() => null}
                        handleBlur={() => null}
                    />

                    <span className='separadorHorizontal'></span>
                    <div className='divBotaoInvertido'>
                        <Botao texto='Salvar alterações do seu endereço' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={refBtn} isEnabled={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

