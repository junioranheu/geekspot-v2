import ImagemA from '../../static/image/perfil_padrao/a.webp';
import ImagemB from '../../static/image/perfil_padrao/b.webp';
import ImagemC from '../../static/image/perfil_padrao/c.webp';
import ImagemD from '../../static/image/perfil_padrao/d.webp';
import ImagemE from '../../static/image/perfil_padrao/e.webp';
import ImagemF from '../../static/image/perfil_padrao/f.webp';
import ImagemG from '../../static/image/perfil_padrao/g.webp';
import ImagemH from '../../static/image/perfil_padrao/h.webp';
import ImagemI from '../../static/image/perfil_padrao/i.webp';
import ImagemJ from '../../static/image/perfil_padrao/j.webp';

export default function gerarImagemPerfilRandom() {
    const listaImagens = [ImagemA, ImagemB, ImagemC, ImagemD, ImagemE, ImagemF, ImagemG, ImagemH, ImagemI, ImagemJ];

    const random = Math.floor(Math.random() * listaImagens.length);
    return listaImagens[random];
}