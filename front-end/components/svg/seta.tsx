interface iParametros {
    width: string;
}

export default function Seta({ width }: iParametros) {
    return (
        <svg viewBox='0 0 24 24' width={width} role='presentation'>
            <path d='M7 12h10l-5-5 5 5-5 5' fill='transparent' strokeWidth='2' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'></path>
        </svg>
    )
}