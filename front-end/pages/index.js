import ContainerWidget from '../components/widget/containerWidget';

export default function Home() {
    document.title = 'GeekSpot — Início';

    const listaWidgets = [
        [
            { id: 1, nome: 'a', preco: '10', url: 'x', tamanho: 1, imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjU1ODI0Ny9iY2NlYjc5ZTYyZTcxODFlYjYyNGU2MzAxOWIzMTM0MS5qcGc' },
            { id: 2, nome: 'b', preco: '20', url: 'x', tamanho: 1, imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yMjcxNTg2Ni8yN2IzNjcyNmQ3OTFmNjVhNDkyN2FhMmUwMjUwODJmZi5qcGc' },
            { id: 3, nome: 'c', preco: '30', url: 'x', tamanho: 2, imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy81ODQ5NDIzL2Y3NzA0NmM5MmUxZjFlMWEwMmQ2NDM1YWVlYWM4ODBmLmpwZw' },
            { id: 4, nome: 'd', preco: '40', url: 'x', tamanho: 1, imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xMDM5NzQxNi8yYzRiYjkxMWFmMjRkODFkNTY5MzIzNDNlNzU2N2ZkOS5qcGc' },
            { id: 5, nome: 'e', preco: '50', url: 'x', tamanho: 1, imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy82ODIwMzY3LzIzZWZmZTRmYjkxMzYxMDVkZTAwODYxZDdkZGNkZjQ1LmpwZw' },
            { id: 6, nome: 'f', preco: '60', url: 'x', tamanho: 2, imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy81MTc1NTQ1L2ViNjU2YmU2MTU0YWYzYWNhMTZjMmFlMzIxYWQzN2IzLmpwZw' }
        ],
        [
            { id: 7, nome: 'g', preco: '70', url: 'x', tamanho: 2, imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xNjA3MDYvMjY2NmE5OGMxZGUyM2M0NmYyMmUwZTYwZDQzNDUxMTkuanBn' },
            { id: 8, nome: 'h', preco: '80', url: 'x', tamanho: 1, imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy85ODczNzE2L2ZmOWVmZGRjMTI2YjAxZGMzMTJjMTMzOWJlMDBhMWI4LmpwZw' },
            { id: 9, nome: 'i', preco: '90', url: 'x', tamanho: 1, imagem: 'https://photos.enjoei.com.br/public/255x255/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yMzYxMzg0OS80OGZlMWFlNTdiYzZlNzA4Yjk0MjhiZTZmZmZlNzdiMi5qcGc' },
            { id: 10, nome: 'j', preco: '100', url: 'x', tamanho: 2, imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xODU1MjAvMmQ0MWI1NDQ4MjU0MTI1MGI0MGVlZmNjZDAzYTY1MzQuanBn' },
            { id: 11, nome: 'k', preco: '110', url: 'x', tamanho: 2, imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yMzYxMzg0OS83NDZmOTQ1YzkyZjBlMmRjYzc4Y2ZlNGI1ZDQxYzBkMi5qcGc' },
        ]
    ];

    return (
        <main className={'paddingPadrao margem6'}>
            {
                listaWidgets?.map((item, i) => (
                    <ContainerWidget
                        titulo='isso é um teste'
                        descricao='sim, apenas um teste'
                        listaWidgets={item}
                    />
                ))
            }
        </main>
    )
}
