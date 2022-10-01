import { Router } from 'next/router';
import nProgress from 'nprogress';
import { useEffect } from 'react';

// https://stackoverflow.com/questions/63664479/detect-when-a-user-leaves-page-in-next-js
export default function useAvisoAlteracoesNaoSalvas(unsavedChanges: boolean, mensagem: string | null) {
    useEffect(() => {
        const warningText = mensagem ? mensagem : 'Verifique se você não tem alguma alteração que não foi salva antes de sair dessa página 🖖\n\nQuer mesmo sair agora?';

        const handleWindowClose = (e: BeforeUnloadEvent) => {
            if (!unsavedChanges) return;
            e.preventDefault();
            return (e.returnValue = warningText);
        };

        const handleBrowseAway = () => {
            if (!unsavedChanges) return;
            if (window.confirm(warningText)) return;
            nProgress.done();
            Router.events.emit('routeChangeError');
            throw 'routeChange aborted.';
        };

        window.addEventListener('beforeunload', handleWindowClose);
        Router.events.on('routeChangeStart', handleBrowseAway);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
            Router.events.off('routeChangeStart', handleBrowseAway);
        };
    }, [unsavedChanges, mensagem]);
}