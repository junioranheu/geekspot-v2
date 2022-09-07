import { Dispatch, ReactNode, useState } from 'react';
import { FecharModal } from './fecharModal';
import BotaoFecharModal from './_botaoFecharModal';
import Styles from './_modal.module.scss';

interface parametros {
    handleModal: Dispatch<boolean>;
    titulo: string | null;
    children: ReactNode;
    tamanho: string; // 'gigante', 'grande', 'medio' ou '';
    isCentralizado: boolean;
    isFecharModalClicandoNoFundo: boolean;
}

export default function ModalLayout({ handleModal, titulo, children, tamanho, isCentralizado, isFecharModalClicandoNoFundo }: parametros) {
    const [animarDiv, setAnimarDiv] = useState('');

    return (
        <div className={Styles.fundo} onMouseDown={(e) => FecharModal.fecharModalClicandoNoFundo(isFecharModalClicandoNoFundo, handleModal, e, setAnimarDiv)}>
            <div className={animarDiv}>
                <div className={`${Styles.modal} ${(tamanho === 'gigante' ? Styles.modalGigante : tamanho === 'grande' ? Styles.modalGrande : tamanho === 'pequeno' ? Styles.modalPequeno : '')} ${FecharModal.animacaoOpen}`}>
                    <div className={Styles.divCabecalho}>
                        <BotaoFecharModal fecharModal={() => FecharModal.fecharModalClicandoNoBotao(handleModal)} />

                        {
                            titulo && (
                                <div className={Styles.cabecalhoTitulo}>
                                    <div dangerouslySetInnerHTML={{ __html: titulo }} />
                                </div>
                            )
                        }
                    </div>

                    {/* children = conteúdo do "body" do modal passada como children */}
                    <div className={Styles.divPrincipal}>
                        <div className={`${Styles.conteudo} ${(isCentralizado && Styles.centralizarConteudo)}`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}