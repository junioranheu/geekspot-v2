import Router from 'next/router';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import removerHTML from '../../../utils/outros/removerHTML';
import iAjudaTopico from '../../../utils/types/ajuda.topico';
import Styles from './ajuda.topico.module.scss';

interface iParametros {
    listaTopicos: iAjudaTopico[];
}

export default function AjudaTopico({ listaTopicos }: iParametros) {
    return (
        <div className={`${Styles.main} margem3`}>
            {
                listaTopicos && listaTopicos?.length > 0 ? (
                    listaTopicos?.map((item: iAjudaTopico, i: number) => (
                        <div
                            key={item?.ajudaTopicoId}
                            className={Styles.topico}
                            onClick={() => Router.push(`/ajuda/${item?.ajudaTopicoId}/${ajustarUrl(removerHTML(item?.topico))}`)}
                        >
                            <div className={Styles.titulo} title={removerHTML(item?.topico)} dangerouslySetInnerHTML={{ __html: item?.topico }} />
                            <span className={Styles.subtitulo}>{item?.descricao}</span>
                            <span className={Styles.saibaMais} title='Saiba mais sobre o assunto em questão'>Saiba mais</span>
                        </div>
                    ))
                ) : (
                    <div>
                        <span className='texto'>Eita... pra onde foram os tópicos de ajuda?</span>
                    </div>
                )
            }
        </div>
    )
}

