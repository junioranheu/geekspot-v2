import Link from 'next/link';
import { useEffect, useState } from 'react';
import Seguranca from '../../../../components/svg/seguranca';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import Styles from './index.module.scss';

export default function DivAvisoProtecao() {

    const [aviso, setAviso] = useState('');
    useEffect(() => {
        function gerarAvisoAleatoria() {
            const frases = [
                `Para proteger suas compras, nunca transfira dinheiro ou se comunique fora do ${CONSTS_SISTEMA.NOME_SISTEMA}.`,
                `Para sempre se manter seguro dentro do ${CONSTS_SISTEMA.NOME_SISTEMA}, nunca transfira sua grana ou faça comunicações externas.`,
                `Não bobeie! Fique esperto com possíveis geeks do mal. Esteja sempre em alerta.`,
                `Nunca passe sua senha a ninguém. Isso é perigoso!`,
                `Cuidado com os golpes! Existem geeks do mal por aí.`,
                `Não engane e não seja enganado.`,
                `Tome sempre cuidado nas trocas. É bom se precaver.`,
                `Lembre-se: nós, do ${CONSTS_SISTEMA.NOME_SISTEMA}, nunca pediremos sua senha.`,
                `Troque, compre ou venda com segurança.`,
                `Não aceite doces de estranhos!`,
                `${CONSTS_SISTEMA.NOME_SISTEMA} é um lugar seguro. Faça seus negócios de forma segura aqui.`
            ];

            const random = Math.floor(Math.random() * frases.length);
            setAviso(frases[random]);
        }

        gerarAvisoAleatoria();
    }, []);

    return (
        <div className={`${Styles.divAvisoProtecao} margem0_5 flexColumn`}>
            <span className='separadorHorizontal'></span>

            <div className={Styles.divInnerAvisoProtecao}>
                <div className={Styles.divSvgSeguranca}>
                    <Seguranca width={24} url={null} title={null} />
                </div>

                <span className={Styles.textoAviso}>{aviso} Veja mais <Link href='/ajuda/'><a className='cor-principal' target='_blank'>dicas de segurança</a></Link></span>
            </div>
        </div>
    )
}