import styles from "./CircleButton.css";

function CircleButton({ icon, onClick }) {
  return (
    <button
      className={`${styles.btn} ${
        icon.includes("Arrow")
          ? `${styles.arrow} ${styles[icon]}`
          : styles[icon]
      }`}
      onClick={onClick}
    />
  );
}  
   
export default CircleButton;