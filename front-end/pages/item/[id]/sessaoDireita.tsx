import { useEffect, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Cep from '../../../components/outros/cep';
import FlipClockCountdown from '../../../components/outros/flipClockCountdown';
import Boleto from '../../../components/svg/boleto';
import Mastercard from '../../../components/svg/mastercard';
import Pix from '../../../components/svg/pix';
import Visa from '../../../components/svg/visa';
import definirPreco from '../../../utils/outros/definirPreco';
import gerarNumeroAleatorio from '../../../utils/outros/gerarNumeroAleatorio';
import horarioBrasilia from '../../../utils/outros/horarioBrasilia';
import Styles from './index.module.scss';

export default function SessaoDireita({ item }: any) {

    const [dataAlvo, setDataAlvo] = useState('');
    useEffect(() => {
        const data = horarioBrasilia().add(gerarNumeroAleatorio(1, 24), 'hours').format();
        setDataAlvo(data);
    }, []);

    const [textoParcelas, setTextoParcelas] = useState('');
    useEffect(() => {
        const numeroAleatorio = gerarNumeroAleatorio(2, 5);
        const parcela = Math.round(item?.preco / numeroAleatorio);
        let msg = `Em até ${numeroAleatorio}x de R$ ${parcela} sem juros`;

        if (parcela === 0) {
            msg = '';
        }

        const verificarSeTotalEMaiorQueOPreco = (numeroAleatorio * parcela) > item?.preco;
        if (verificarSeTotalEMaiorQueOPreco) {
            msg = '';
        }

        setTextoParcelas(msg);
    }, [item?.preco]);

    return (
        <div className={Styles.sessaoDireita}>
            <span className={Styles.textoCinza}>{item?.itensTipos?.tipo}</span>
            <span className='titulo'>{item?.nome}</span>

            <div className={`${Styles.divDados} margem0_5 flexColumn`}>
                <div className={Styles.headerDivDados}>
                    Preço especial por tempo limitado

                    {
                        dataAlvo && (
                            <div>
                                <FlipClockCountdown
                                    dataAlvo={dataAlvo}
                                    isShowLabel={false}
                                    msgAoFinalizar={null}
                                    handleCompleteCountdown={(() => null)}
                                />
                            </div>
                        )
                    }
                </div>

                <div className={Styles.bodyDivDados}>
                    <span className={Styles.textoNegrito}>{definirPreco(item?.preco, item?.precoDesconto)}</span>
                    {textoParcelas && <span className={Styles.texto}>{textoParcelas}</span>}

                    <div className={`${Styles.divFormasPagamento} margem0_5`}>
                        <Pix />
                        <Visa />
                        <Mastercard />
                        <Boleto />
                    </div>

                    <div>
                        <Cep />
                    </div>

                    <div className={Styles.botaoCustom}>
                        <Botao texto='Eu quero' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                </div>
            </div>

            <div className='margem1 flexColumn'>
                <div className={Styles.botaoCustom2}>
                    <Botao
                        texto={`Fazer oferta ${(item?.usuarios?.nomeUsuarioSistema && `à @${item?.usuarios?.nomeUsuarioSistema}`)}`}
                        url={null}
                        isNovaAba={false}
                        handleFuncao={() => null}
                        Svg={null}
                        refBtn={null}
                        isEnabled={true}
                    />
                </div>

                <div className={`${Styles.botaoCustom2} margem1`}>
                    <Botao texto='Adicionar ao carrinho' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                </div>
            </div>
        </div>
    )
}

