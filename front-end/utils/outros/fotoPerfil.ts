import ImgCinza from '../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../utils/consts/data/constUpload';
import { Auth } from '../context/usuarioContext';

export default function fotoPerfil() {
    const foto = (Auth?.get()?.foto ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${Auth?.get()?.foto}` : Auth?.get()?.fotoPerfilAlternativa ?? ImgCinza);
    return foto;
}