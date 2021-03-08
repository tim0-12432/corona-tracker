import styles from "./Loading.module.css";
import virus from "./../../images/virus.png";

export default function Loading() {
    return (
        <div className={ styles.loading }>
            <img src={ virus } alt="O" />
        </div>
    );
}