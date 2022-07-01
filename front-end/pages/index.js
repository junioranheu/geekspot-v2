import { useEffect, useState } from 'react';
import ContainerWidget from '../components/widget/containerWidget';
import CONSTANTS_ITENS from '../utils/data/constItens';
import CONSTANTS_USUARIOS from '../utils/data/constUsuarios';
import { Fetch } from '../utils/outros/fetch';
import paginaCarregada from '../utils/outros/paginaCarregada';

export default function Home({ listaItens }) {
    console.log(listaItens);
    document.title = 'GeekSpot — Início';

    const listaWidgets = [
        [
            { id: 1, nome: 'a', preco: '10', precoDesconto: '', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjU1ODI0Ny9iY2NlYjc5ZTYyZTcxODFlYjYyNGU2MzAxOWIzMTM0MS5qcGc' },
            { id: 2, nome: 'b', preco: '20', precoDesconto: '15', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yMjcxNTg2Ni8yN2IzNjcyNmQ3OTFmNjVhNDkyN2FhMmUwMjUwODJmZi5qcGc' },
            { id: 3, nome: 'c', preco: '30', precoDesconto: '', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy81ODQ5NDIzL2Y3NzA0NmM5MmUxZjFlMWEwMmQ2NDM1YWVlYWM4ODBmLmpwZw' },
            { id: 4, nome: 'd', preco: '40', precoDesconto: '20', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xMDM5NzQxNi8yYzRiYjkxMWFmMjRkODFkNTY5MzIzNDNlNzU2N2ZkOS5qcGc' },
            { id: 5, nome: 'e', preco: '50', precoDesconto: '', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy82ODIwMzY3LzIzZWZmZTRmYjkxMzYxMDVkZTAwODYxZDdkZGNkZjQ1LmpwZw' },
            { id: 6, nome: 'f', preco: '60', precoDesconto: '', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy81MTc1NTQ1L2ViNjU2YmU2MTU0YWYzYWNhMTZjMmFlMzIxYWQzN2IzLmpwZw' }
        ],
        [
            { id: 7, nome: 'g', preco: '70', precoDesconto: '', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xNjA3MDYvMjY2NmE5OGMxZGUyM2M0NmYyMmUwZTYwZDQzNDUxMTkuanBn' },
            { id: 8, nome: 'h', preco: '80', precoDesconto: '', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy85ODczNzE2L2ZmOWVmZGRjMTI2YjAxZGMzMTJjMTMzOWJlMDBhMWI4LmpwZw' },
            { id: 9, nome: 'i', preco: '90', precoDesconto: '30', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yMzYxMzg0OS80OGZlMWFlNTdiYzZlNzA4Yjk0MjhiZTZmZmZlNzdiMi5qcGc' },
            { id: 10, nome: 'j', preco: '100', precoDesconto: '', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xODU1MjAvMmQ0MWI1NDQ4MjU0MTI1MGI0MGVlZmNjZDAzYTY1MzQuanBn' },
            { id: 11, nome: 'k', preco: '110', precoDesconto: '5', url: 'x', imagem: 'https://photos.enjoei.com.br/public/500x500/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yMzYxMzg0OS83NDZmOTQ1YzkyZjBlMmRjYzc4Y2ZlNGI1ZDQxYzBkMi5qcGc' },
            { id: 12, nome: 'k', preco: '1099', precoDesconto: '0.99', url: 'x', imagem: 'https://cdn.discordapp.com/attachments/985572242698145833/992192366255558788/Gorda.jpg' }
        ]
    ];

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(false, 200, 500, setIsLoaded);
    }, []);

    if (!isLoaded) {
        return false;
    }

    return (
        <main className={'paddingPadrao margem6'}>
            {
                listaWidgets?.map((item, i) => (
                    <ContainerWidget
                        key={i}
                        titulo='isso é um teste'
                        descricao='sim, apenas um teste'
                        listaWidgets={item}
                    />
                ))
            }

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </main>
    )
}

export async function getStaticProps() {
    // Pegar todos os usuários;
    const urlUsuarios = CONSTANTS_USUARIOS.API_URL_GET_TODOS;
    const usuarios = await Fetch.getApi(urlUsuarios, null);

    let listaItens = [];
    for (const u of usuarios) {
        // Encontrar os itens com base no usuário;
        const urlItens = `${CONSTANTS_ITENS.API_URL_GET_POR_USUARIO_ID}/${u.usuarioId}`;
        const itens = await Fetch.getApi(urlItens, null);

        if (itens.length) {
            listaItens.push(itens);
        }
    }

    return {
        props: {
            listaItens
        },
        // revalidate: 10 // segundos
    }
}