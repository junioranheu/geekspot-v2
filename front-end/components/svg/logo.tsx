interface iParametros {
    width: string;
    cor: string;
}

export default function Logo({ width, cor }: iParametros) {
    return (
        <svg width={width} viewBox='0 -2 14 25' role='presentation'>
            <path fill={cor} d='M0 0h14v7H7zm0 7h7l7 7H7v7l-7-7z'></path>
        </svg>
    )
}