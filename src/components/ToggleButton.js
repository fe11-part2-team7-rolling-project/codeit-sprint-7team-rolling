import styles from "./ToggleButton.css";

function ToggleButton({ list, selectedButtonName, onClick }) {
  return (
    <div className={styles.toggleArea}>
      {list.map((item) => (
        <button
          key={item}
          className={`${styles.button} ${
            item === selectedButtonName ? styles.active : ""
          }`}
          onClick={onClick}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
   
export default ToggleButton;