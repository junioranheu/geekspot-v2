import { ChangeEvent, Dispatch, MutableRefObject, useEffect, useState } from 'react';
import Botao from './botao';
import Styles from './styles/textarea.module.scss';

interface iParametros {
    placeholder: string;
    height: number | null;
    max: number;
    texto: string;
    setTexto: Dispatch<string>;
    referenciaTextarea: MutableRefObject<any> | null;

    isMostrarBotao: boolean;
    textoBotao: string | null;
    handleFuncaoBotao: any | null;
    referenciaBotao: MutableRefObject<any> | null;
    isEnabledBotao: boolean | null;
}

export default function Textarea({
    placeholder, height, max, texto, setTexto, referenciaTextarea,
    isMostrarBotao, textoBotao, handleFuncaoBotao, referenciaBotao, isEnabledBotao
}: iParametros) {

    const [qtdCaracteresRestantes, setQtdCaracteresRestantes] = useState(max);
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const verificarQtdCaracteresRestantes = max - e.target.value.length;

        if (verificarQtdCaracteresRestantes < 0) {
            return false;
        }

        setQtdCaracteresRestantes(verificarQtdCaracteresRestantes);
        setTexto(e.target.value);
    }

    useEffect(() => {
        if (texto === '') {
            setQtdCaracteresRestantes(max);
        }
    }, [texto, max])

    return (
        <div className={Styles.textarea}>
            <textarea
                className='textarea'
                placeholder={placeholder}
                style={(height ? { height: `${height}px` } : {})}
                onChange={(e) => handleChange(e)}
                value={texto}
                ref={referenciaTextarea}
            >
            </textarea>

            <div className={Styles.contador}>
                {qtdCaracteresRestantes}
            </div>

            {
                isMostrarBotao && (
                    <div>
                        <Botao
                            texto={(textoBotao ?? '')}
                            url={null}
                            isNovaAba={false}
                            handleFuncao={handleFuncaoBotao}
                            Svg={null}
                            refBtn={referenciaBotao}
                            isEnabled={(isEnabledBotao ?? false)}
                        />
                    </div>
                )
            }
        </div>
    )
}