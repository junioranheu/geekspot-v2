import Router from 'next/router';
import SetaTres from '../../../../components/svg/seta.tres';
import ajustarUrl from '../../../../utils/outros/ajustarUrl';
import iAjudaItem from '../../../../utils/types/ajuda.item';
import Styles from './ajuda.listaItens.module.scss';

interface iParametros {
    listaAjudasItens: iAjudaItem[] | null | undefined;
    queryBuscada: string;
}

export default function AjudaListaItens({ listaAjudasItens, queryBuscada }: iParametros) {
    return (
        <div className={`${Styles.divItens} margem3`}>
            {
                listaAjudasItens && listaAjudasItens?.length > 0 ? (
                    listaAjudasItens?.map((item: iAjudaItem, i: number) => (
                        <div
                            key={item?.ajudaItemId}
                            className={Styles.item}
                            onClick={() => Router.push(`/ajuda/item/${item?.ajudaItemId}/${ajustarUrl(item?.titulo)}`)}
                        >
                            <div className={Styles.itemInner}>
                                <span className='cor-principal-hover pointer' title={item?.titulo}>{item?.titulo}</span>
                                <SetaTres width={16} url={null} title={item?.titulo} isCorPrincipal={true} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <span className='texto'>Eita... parece que não foi encontrado nenhuma ajuda com o termo <b className='cor-principal'>{queryBuscada}</b></span>
                    </div>
                )
            }
        </div>
    )
}

