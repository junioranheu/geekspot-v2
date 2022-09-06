import Image from 'next/image';
import Router from 'next/router';
import Botao from '../../../../components/outros/botao';
import ImgCinza from '../../../../static/image/outros/cinza.webp';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import ajustarUrl from '../../../../utils/outros/ajustarUrl';
import formatarData from '../../../../utils/outros/formatarData';
import gerarImagemPerfilRandom from '../../../../utils/outros/gerarImagemPerfilRandom';
import letraMaiusculaPrimeiraPalavraApenas from '../../../../utils/outros/letraMaiusculaPrimeiraPalavraApenas';
import iItem from '../../../../utils/types/item';
import Styles from './index.module.scss';

export default function DivOwner({ item }: iItem) {

    const urlPerfilDonoItem = (item?.usuarios?.nomeUsuarioSistema ? `/usuario/${item?.usuarioId}/${ajustarUrl(item?.usuarios?.nomeUsuarioSistema?.toString())}` : '/');

    function handleSeguir(usuarioId: number) {
        alert(`handleSeguir, usuarioId: ${usuarioId}`);
    }

    return (
        <div className={`${Styles.divOwner} margem1_5 flexColumn`}>
            <div className={Styles.divOwnerInner}>
                <div className='flexRow'>
                    <div className={Styles.divFoto} onClick={() => Router.push(urlPerfilDonoItem)}>
                        <Image src={(item?.usuarios?.foto ?? gerarImagemPerfilRandom() ?? ImgCinza)} alt='' title={`Visitar perfil de @${item?.usuarios?.nomeUsuarioSistema}`} />
                    </div>

                    <div>
                        <span className='pointer cor-principal-hover' onClick={() => Router.push(urlPerfilDonoItem)} title={`Visitar perfil de @${item?.usuarios?.nomeUsuarioSistema}`}>
                            {(item?.usuarios?.nomeUsuarioSistema ? `@${item?.usuarios?.nomeUsuarioSistema}` : '-')}
                        </span>

                        <span>{(item?.usuarios?.nomeCompleto ?? '-')}</span>
                    </div>
                </div>

                <div className={Styles.botaoCutomDivOwner}>
                    <Botao texto='Seguir' url={null} isNovaAba={false} handleFuncao={() => handleSeguir(item?.usuarioId)} Svg={null} refBtn={null} isEnabled={true} />
                </div>
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.divOwnerInner}>
                <div>
                    <span>À venda/troca</span>
                    <span>xxx</span>
                </div>

                <div>
                    <span>Negócios feitos</span>
                    <span>xxx</span>
                </div>
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.divOwnerInner}>
                <div>
                    <span>Tempo médio de envio</span>
                    <span>xxx</span>
                </div>

                <div>
                    <span>No {CONSTS_SISTEMA.NOME_SISTEMA} desde</span>
                    <span>{(item?.usuarios?.dataRegistro.toString() ? letraMaiusculaPrimeiraPalavraApenas(formatarData(item?.usuarios?.dataRegistro, 3)) : '-')}</span>
                </div>
            </div>
        </div>
    )
}