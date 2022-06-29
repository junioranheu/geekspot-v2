
import Styles from '../../styles/widget.module.css';

export default function ContainerWidget({titulo, descricao}) {
    return (
        <div>
            <b className={Styles.aea}>{titulo}</b>
            <span>{descricao}</span>
        </div>
    )
}

