import Botao from '../../../../components/outros/botao';
import Styles from './index.module.scss';

export default function divBotoes({ item }: any) {
    return (
        <div className='margem1_5 flexColumn'>
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
    )
}