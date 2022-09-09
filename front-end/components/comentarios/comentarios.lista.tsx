import Styles from './comentarios.module.scss';

interface iParametros {
    listaComentarios: Array<any>;
}

export default function ComentariosLista({ listaComentarios }: iParametros) {
    return (
        <div className={Styles.mainLista}>
            <span className={Styles.texto}>Últimas perguntas</span>

            {
                listaComentarios?.length > 0 ? (
                    listaComentarios?.map((item, i: number) => (
                        <div key={item?.id}>
                            <span>{item?.mensagem}</span>
                            <span>{item?.data}</span>
                            <span>{item?.resposta}</span>
                        </div>
                    ))
                ) : (
                    <span className={Styles.textoPequeno}>Este produto ainda não recebeu nenhum comentário</span>
                )
            }
        </div>
    )
}