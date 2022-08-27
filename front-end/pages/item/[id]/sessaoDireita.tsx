import { useEffect, useState } from 'react';
import Botao from '../../../components/outros/botao';
import FlipClockCountdown from '../../../components/outros/flipClockCountdown';
import Boleto from '../../../components/svg/boleto';
import Mastercard from '../../../components/svg/mastercard';
import Pix from '../../../components/svg/pix';
import Visa from '../../../components/svg/visa';
import gerarNumeroAleatorio from '../../../utils/outros/gerarNumeroAleatorio';
import horarioBrasilia from '../../../utils/outros/horarioBrasilia';
import Styles from './index.module.scss';

export default function SessaoDireita({ item }: any) {

    const [dataAlvo, setDataAlvo] = useState('');
    useEffect(() => {
        const data = horarioBrasilia().add(gerarNumeroAleatorio(1, 24), 'hours').format();
        setDataAlvo(data);
    }, []);

    function gerarTextoParcelas(preco: number) {
        const msg = `2x de R$ ${(preco / 2)} sem juros`;
        return msg;
    }

    return (
        <div className={Styles.sessaoDireita}>
            <span className='titulo'>{item?.nome}</span>

            <div className={`${Styles.divDados} margem1 flexColumn`}>
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
                    <span className={Styles.textoNegrito}>R$ {item?.preco}</span>
                    <span className={Styles.texto}>{gerarTextoParcelas(item?.preco)}</span>

                    <div className={Styles.divFormasPagamento}>
                        <Pix />
                        <Visa />
                        <Mastercard />
                        <Boleto />
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

