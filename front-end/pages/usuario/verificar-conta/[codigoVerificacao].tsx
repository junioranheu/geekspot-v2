import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import paginaCarregada from '../../../utils/outros/paginaCarregada';

export default function VerificarConta() {
    document.title = `Verificar conta — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const router = useRouter();
    const { codigoVerificacao } = router.query;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // const url = `${CONSTS_USUARIOS.API_URL_GET_BY_ID}/${id}`;
        // const usuario = await Fetch.getApi(url, null) as iUsuario;

        console.log(codigoVerificacao);
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, [codigoVerificacao]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem3'>
            <div className='centralizarTexto'>
                <h1>aaaaaaaaaaaea</h1>
            </div>

            <div className='margem2'>
                Teste
            </div>
        </section>
    )
}
