import FlipClockCountdownx from '@leenguyen/react-flip-clock-countdown'; // https://www.npmjs.com/package/@leenguyen/react-flip-clock-countdown
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

interface iParametros {
    dataAlvo: string;
    isShowLabel: boolean;
    msgAoFinalizar: string | null;
    handleCompleteCountdown: () => void | null;
}

export default function FlipClockCountdown({ dataAlvo, isShowLabel, msgAoFinalizar, handleCompleteCountdown }: iParametros) {
    return (
        <FlipClockCountdownx
            to={dataAlvo}
            labels={['DIAS', 'HORAS', 'MINUTOS', 'SEGUNDOS']}
            labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', color: 'var(--cor-principal)' }}
            showLabels={isShowLabel}
            digitBlockStyle={{ background: '#000000', width: 20, height: 20, fontSize: 12 }}
            dividerStyle={{ color: '#cor-invalida-para-tirar-o-divider', height: 1 }}
            separatorStyle={{ color: 'var(--cor-principal)', size: '3.5px' }}
            showSeparators={true}
            duration={0.5}
            onComplete={() => handleCompleteCountdown && handleCompleteCountdown()}
        >
            {msgAoFinalizar && (<h1>{msgAoFinalizar}</h1>)}
        </FlipClockCountdownx>
    )
}