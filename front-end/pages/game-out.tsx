import Botao from '../components/outros/botao';

export default function GameOut() {
    document.title = 'GameOut, o GeekSpot em 2017';

    return (
        <main className={'paddingPadrao margem3_5'}>
            <div>
                <h1>O GeekSpot nasceu em 2016. Infelizmente não podemos vê-lo novamente, com sua cara original. Todos seus vestígios foram apagados da face da Terra. 😧</h1>
                <h1>Mas ele ganhou um novo nome, e uma nova retocada em sua cara, em 2017. Nessa época seu nome era GameOut.</h1>
                <h1>Agora, em 2022, retornou das cinzas, com seu nome original, GeekSpot!</h1>
                <Botao texto='Ver o GeekSpot em 2017' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
            </div>
        </main>
    )
}

