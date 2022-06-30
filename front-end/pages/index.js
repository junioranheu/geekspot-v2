import ContainerWidget from '../components/widget/containerWidget';

export default function Home() {
    const listaWidgets = [
        { id: 1, nome: 'a', preco: '10', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjU1ODI0Ny9iY2NlYjc5ZTYyZTcxODFlYjYyNGU2MzAxOWIzMTM0MS5qcGc' },
        { id: 2, nome: 'b', preco: '20', url: 'x', imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yMjcxNTg2Ni8yN2IzNjcyNmQ3OTFmNjVhNDkyN2FhMmUwMjUwODJmZi5qcGc' },
        { id: 3, nome: 'c', preco: '30', url: 'x', imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy81ODQ5NDIzL2Y3NzA0NmM5MmUxZjFlMWEwMmQ2NDM1YWVlYWM4ODBmLmpwZw' },
        { id: 4, nome: 'd', preco: '40', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xMDM5NzQxNi8yYzRiYjkxMWFmMjRkODFkNTY5MzIzNDNlNzU2N2ZkOS5qcGc' },
        { id: 5, nome: 'e', preco: '50', url: 'x', imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy82ODIwMzY3LzIzZWZmZTRmYjkxMzYxMDVkZTAwODYxZDdkZGNkZjQ1LmpwZw' },
        { id: 6, nome: 'f', preco: '60', url: 'x', imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy81MTc1NTQ1L2ViNjU2YmU2MTU0YWYzYWNhMTZjMmFlMzIxYWQzN2IzLmpwZw' }
    ];

    return (
        <main className={'paddingPadrao margem6'}>
            <ContainerWidget
                titulo='isso é um teste'
                descricao='sim, apenas um teste'
                listaWidgets={listaWidgets}
            />
        </main>
    )
}
