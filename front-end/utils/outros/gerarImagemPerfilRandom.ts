import ImagemA from '../../static/image/perfil/a.webp';
import ImagemB from '../../static/image/perfil/b.webp';
import ImagemC from '../../static/image/perfil/c.webp';
import ImagemD from '../../static/image/perfil/d.webp';
import ImagemE from '../../static/image/perfil/e.webp';
import ImagemF from '../../static/image/perfil/f.webp';
import ImagemG from '../../static/image/perfil/g.webp';
import ImagemH from '../../static/image/perfil/h.webp';

export default function gerarImagemPerfilRandom() {
    const listaImagens = [ImagemA, ImagemB, ImagemC, ImagemD, ImagemE, ImagemF, ImagemG, ImagemH];

    const random = Math.floor(Math.random() * listaImagens.length);
    return listaImagens[random];
}