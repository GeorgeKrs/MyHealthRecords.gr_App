import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className="p-2 mt-2 d-flex flex-column">
      <label className={styles.label}>{props.LabelName}</label>
      <input
        type="text"
        className={styles.inputValues + " mt-2"}
        placeholder={props.Placeholder}
      ></input>
    </div>
  );
};

export default Input;
