import Botao from '../../../../components/outros/botao';
import iItem from '../../../../utils/types/item';
import Styles from './index.module.scss';

interface iParametros {
    item: iItem;
}

export default function DivBotoes({ item }: iParametros) {
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
                <Botao texto='Adicionar à lista de favoritos' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
            </div>
        </div>
    )
}