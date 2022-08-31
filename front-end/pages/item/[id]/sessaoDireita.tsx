import { useEffect, useState } from 'react';
import Botao from '../../../components/outros/botao';
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
        const msg = `Em até ${numeroAleatorio}x de R$ ${Math.round(item?.preco / numeroAleatorio)} sem juros`;
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
                    <span className={Styles.texto}>{textoParcelas}</span>

                    <div className={`${Styles.divFormasPagamento} margem0_5`}>
                        <Pix />
                        <Visa />
                        <Mastercard />
                        <Boleto />
                    </div>

                    <div>
                        <span className={Styles.texto}>R$ 0,99 de frete para o cep 12605-110</span>
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

