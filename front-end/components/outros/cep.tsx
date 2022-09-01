import useViaCep from '@rsiqueira/use-viacep'; // https://www.npmjs.com/package/@rsiqueira/use-viacep
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import Styles from '../../styles/cep.module.scss';
import CONSTS_CEP from '../../utils/consts/cep';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import arredondarNumero from '../../utils/outros/arredondarNumero';
import { Aviso } from '../../utils/outros/aviso';
import removerCaracter from '../../utils/outros/removerCaracter';

interface iParametros {
    precoProduto: number | null;
}

export default function Cep({ precoProduto }: iParametros) {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refInputCep = useRef<any>(null);
    const refSalvar = useRef<any>(null);
    const [isMostrarInputCep, setIsMostrarInputCep] = useState(false);
    const [data, setData] = useState('');
    const { cep, loading, error } = useViaCep(data);
    const [isCepOk, setIsCepOk] = useState(false);

    const cepAuth = Auth?.get()?.cep ?? '';
    useEffect(() => {
        // console.log(cepAuth?.toString());
        // console.log(cepAuth?.toString().length);

        // Se o usuário já tiver um cep, use-o como referência;
        if (cepAuth && cepAuth?.toString().length === 8) {
            setIsMostrarInputCep(true);
            setData(cepAuth?.toString());
            setIsCepOk(true);
        }
    }, [cepAuth])

    function handleChange(e: any) {
        const re = /^[0-9\b]+$/;

        if (e.target.value === '' || re.test(e.target.value)) {
            setData(e.target.value);
        }
    }

    function handleKeyPress(e: any) {
        if (e.key === 'Enter') {
            refSalvar.current.click();
        }
    }

    function salvarCep() {
        setIsCepOk(false);
        const qtdCaracteresCep = 8;
        const qtdCaracteresFaltantes = qtdCaracteresCep - data.length;

        if (data.length === 0) {
            Aviso.warn('Nenhum <b>CEP</b> foi inserido', 5000);
            refInputCep.current.select();
            return false;
        }

        if (qtdCaracteresFaltantes > 0) {
            Aviso.warn(`O CEP <b>${data}</b> é inválido... parece que ainda ${(qtdCaracteresFaltantes === 1 ? 'falta' : 'faltam')} ${qtdCaracteresFaltantes} ${(qtdCaracteresFaltantes === 1 ? 'carácter' : 'caracteres')}`, 5000);
            refInputCep.current.select();
            return false;
        }

        if (error) {
            Aviso.warn(`Os dados do CEP <b>${data}</b> não foram encontrados`, 5000);
            refInputCep.current.select();
            return false;
        }

        // Se passou por todas as verificações, o CEP está ok;
        setIsCepOk(true);

        // Atribuir CEP ao Local Storage se o usuário estiver logado;
        if (isAuth) {
            const dadosUsuario = { cep: removerCaracter(cep?.cep, '-') }
            Auth.update(dadosUsuario);
        }
    }

    function verificarFrete(cep: string, precoProduto: number | null) {
        // console.log(cep);
        if (!cep) {
            return false;
        }

        // Verificar em qual CEP o parâmetro se encaixa;
        let cepNoRangeCorreto;
        CONSTS_CEP.forEach(element => {
            if (cep >= element[2] && cep <= element[3]) {
                // console.log(element);
                cepNoRangeCorreto = element;
            }
        });

        if (!cepNoRangeCorreto) {
            return false;
        }

        if (!precoProduto) {
            return false;
        }

        // Simular frete: valor simulado de frete (com base na lista de CEPs) + 1% do preço do produto;
        const freteSimulado = cepNoRangeCorreto[4] + ((1 / 100) * precoProduto);
        // console.log(precoProduto, freteSimulado);

        // Retornar mensagem;
        const msg = `R$ ${arredondarNumero(freteSimulado, 2)} de frete para ${cep}`;
        return msg;
    }

    return (
        <Fragment>
            {
                isCepOk && cep ? (
                    <div className={Styles.divInputCep}>
                        <span className={Styles.texto}>{verificarFrete(removerCaracter(cep?.cep, '-'), precoProduto)}</span>
                        <span className={`${Styles.texto} cor-principal pointer`} onClick={() => { setIsCepOk(false), setData(''), setIsMostrarInputCep(true) }} ref={refSalvar}>Alterar CEP</span>
                    </div>
                ) : (
                    isMostrarInputCep ? (
                        <div className={Styles.divInputCep}>
                            <span className={Styles.texto}>Digite seu cep</span>
                            <input type='text' placeholder='_____-__' onChange={(e) => handleChange(e)} onKeyPress={handleKeyPress} ref={refInputCep} value={data} maxLength={8} />
                            <span className={`${Styles.texto} cor-principal pointer`} onClick={() => salvarCep()} ref={refSalvar}>Verificar frete</span>
                        </div>
                    ) : (
                        <div className={Styles.divInputCep}>
                            <span className={`${Styles.texto} cor-principal-hover pointer`} onClick={() => setIsMostrarInputCep(true)}>Verificar frete</span>
                        </div>
                    )
                )
            }
        </Fragment>
    )
}