import useViaCep from '@rsiqueira/use-viacep'; // https://www.npmjs.com/package/@rsiqueira/use-viacep
import { useEffect, useRef, useState } from 'react';
import Styles from '../../styles/cep.module.scss';
import { Auth } from '../../utils/context/usuarioContext';
import { Aviso } from '../../utils/outros/aviso';

export default function Cep() {

    const refSalvar = useRef<any>(null);
    const [isMostrarInputCep, setIsMostrarInputCep] = useState(false);
    const [data, setData] = useState('');
    const { cep, loading, error } = useViaCep(data);
    const [isCepOk, setIsCepOk] = useState(false);

    const cepAuth = Auth?.get()?.cep ?? '';
    useEffect(() => {
        console.log(cepAuth?.toString());
        // console.log(cepAuth?.toString().length);

        // Se o usuário já tiver um cep, use-o como referência;
        if (cepAuth && cepAuth?.toString().length === 8) {
            setIsMostrarInputCep(true);
            setData(cepAuth?.toString());
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
            return false;
        }

        if (qtdCaracteresFaltantes > 0) {
            Aviso.warn(`O CEP <b>${data}</b> é inválido... parece que ainda ${(qtdCaracteresFaltantes === 1 ? 'falta' : 'faltam')} ${qtdCaracteresFaltantes} ${(qtdCaracteresFaltantes === 1 ? 'carácter' : 'caracteres')}`, 5000);
            return false;
        }

        if (error) {
            Aviso.warn(`Os dados do CEP <b>${data}</b> não foram encontrados`, 5000);
            return false;
        }

        // console.log(cep);
        setIsCepOk(true);
    }

    function verificarFrete(cep: string) {
        const msg = `R$ 0,99 de frete para o cep ${cep}`;
        return msg;
    }

    return (
        <div className={Styles.main}>
            {
                isCepOk && cep ? (
                    <span className={Styles.texto}>{verificarFrete(cep?.cep)}</span>
                ) : (
                    isMostrarInputCep ? (
                        <div className={Styles.divInputCep}>
                            <span className={Styles.texto}>Digite seu cep</span>
                            <input type='text' placeholder='_____-__' onChange={(e) => handleChange(e)} onKeyPress={handleKeyPress} value={data} maxLength={8} />
                            <span className={`${Styles.texto} cor-principal pointer`} onClick={() => salvarCep()} ref={refSalvar}>Verificar frete</span>
                        </div>
                    ) : (
                        <span className={`${Styles.texto} cor-principal-hover pointer`} onClick={() => setIsMostrarInputCep(true)}>Verificar frete</span>
                    )
                )
            }
        </div>
    )
}