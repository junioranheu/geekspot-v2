export default function Xis({ height, width, cor }) {
    return (
        <svg height={height} width={width} viewBox='0 0 24 24'>
            <path fill={cor} stroke={cor} d='M17 7L7 17M7 7l5.03 5.03L17 17' strokeWidth='2' strokeLinecap='round'></path>
        </svg>
    )
}