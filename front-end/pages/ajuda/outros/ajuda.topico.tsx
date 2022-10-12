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
                        <div className={Styles.topico} key={item?.ajudaTopicoId}>
                            <div className={Styles.titulo} dangerouslySetInnerHTML={{ __html: item?.titulo }} />
                            <span className={Styles.subtitulo}>{item?.descricao}</span>
                            <span className={Styles.saibaMais}>Saiba mais</span>
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

