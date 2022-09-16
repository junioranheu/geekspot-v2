import { Dispatch, ReactNode, useEffect } from 'react';
import Xis from '../svg/xis';
import Styles from './_modal.lateral.module.scss';

interface parametros {
    handleModal: Dispatch<boolean>;
    isOpen: boolean;
    titulo: string | null;
    children: ReactNode;
}

export default function ModalLateralLayout({ handleModal, isOpen, titulo, children }: parametros) {

    // Efeito de blur no fundo;
    useEffect(() => {
        if (isOpen) {
            // console.log('Hamburguer aberto');
            document.getElementsByClassName('sessaoPrincipal')[0].classList.add('backgroundBlur');
            document.getElementsByTagName('footer')[0].classList.add('backgroundBlur');
            document.getElementsByTagName('nav')[0].classList.add('backgroundBlur');
            document.getElementsByTagName('nav')[1].classList.add('backgroundBlur');
            document.body.style.overflow = 'hidden';
        } else {
            // console.log('Hamburguer fechado');
            document.getElementsByClassName('sessaoPrincipal')[0].classList.remove('backgroundBlur');
            document.getElementsByTagName('footer')[0].classList.remove('backgroundBlur');
            document.getElementsByTagName('nav')[0].classList.remove('backgroundBlur');
            document.getElementsByTagName('nav')[1].classList.remove('backgroundBlur');
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    // Ao "destruir" componente (force que volte ao normal, sem blur ao fundo);
    useEffect(() => {
        return () => {
            // console.log('Componente destruído');
            document.getElementsByClassName('sessaoPrincipal')[0].classList.remove('backgroundBlur');
            document.getElementsByTagName('footer')[0].classList.remove('backgroundBlur');
            document.getElementsByTagName('nav')[0].classList.remove('backgroundBlur');
            document.getElementsByTagName('nav')[1].classList.remove('backgroundBlur');
        }
    }, []);

    if (!isOpen) {
        return null;
    }

    return (
        <section className={`${Styles.sessaoModalLateral} animate__animated animate__slideInRight animate__faster`}>
            <div className={Styles.divTop}>
                {
                    titulo && (
                        <div className={Styles.titulo} dangerouslySetInnerHTML={{ __html: titulo }} />
                    )
                }

                <div className={Styles.direita}>
                    <a onClick={() => handleModal(false)}><Xis height='1.7rem' width='1.7rem' cor='var(--branco)' /></a>
                </div>
            </div>

            {children}
        </section>
    )
}