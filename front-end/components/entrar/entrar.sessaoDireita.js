import Video1 from '../../static/video/backgroundEntrar.mp4';
import Styles from '../../styles/entrar.module.css';

export default function SessaoDireita() {
    return (
        <section className={Styles.divDireita}>
            <video className={Styles.video} autoPlay loop muted playsInline disablePictureInPicture controls={false}>
                <source src={Video1} type='video/mp4' />
            </video>
        </section>
    )
}