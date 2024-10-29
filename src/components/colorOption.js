import checkIcon from '../img/check_Icon.png';
import styles from './ColorOption.css';

function ColorOption({ clickItem, onClick }) {

  return (
    <div className={styles.backgroundOptions}>
      <button
        type='button'
        value='beige'
        className={`${styles.option} ${styles.colorBeige}`}
        onClick={onClick}>
        {'beige' === clickItem
          && <img className={styles.backgroundChecked} src={checkIcon} alt="check" />}
      </button>
     
      <button
        type='button'
        value='purple'
        className={`${styles.option}
        ${styles.colorPurple}`}
        onClick={onClick}>
        {'purple' === clickItem
          && <img className={styles.backgroundChecked} src={checkIcon} alt="check" />}
      </button>

      <button
        type='button'
        value='blue'
        className={`${styles.option} ${styles.colorBlue}`}
        onClick={onClick}>
        {'blue' === clickItem
          && <img className={styles.backgroundChecked} src={checkIcon} alt="check" />}
      </button>

      <button
        type='button'
        value='green'
        className={`${styles.option} ${styles.colorGreen}`}
        onClick={onClick}>
        {'green' === clickItem
          && <img className={styles.backgroundChecked} src={checkIcon} alt="check" />}
      </button>
    </div>
  );
}

export default ColorOption;
