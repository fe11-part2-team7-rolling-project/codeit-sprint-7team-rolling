import styles from "./Button.module.css";
import CircleButton from "./CircleButton";

function Button({
    children,
    id,
    type = "outlined",
    width,
    height = "standard",
    icon,
    disabled,
    onClick,
  }) {
    if (type === "circle") {
      return <CircleButton icon={icon} onClick={onClick} />;
    }   
  
    const className = `${styles.btn} ${styles[height]} ${styles[type]} ${
      icon ? styles[icon] : ""
    } ${width ? styles[width] : ''}`;
     
    return (
      <button
        id={id}
        type="button"
        className={className}
        disabled={disabled}
        onClick={onClick}
      >
        {children && <span className={styles.name}>{children}</span>}
      </button>
    );
  }
  
  export default Button;
  