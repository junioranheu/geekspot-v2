import ContainerWidget from '../components/widget/containerWidget';

export default function Home() {
    return (
        <main className={'paddingPadrao margem50'}>
            <h2>GeekSpot</h2>

            <ContainerWidget
                titulo='calma são paulo'
                descricao='é cada estampa'
            // widgets=[]
            />
        </main>
    )
}
