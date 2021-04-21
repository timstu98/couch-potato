import "./button.css";

const Button = (props) => {
    return (
        <div>
            <button onClick={props.linkedTo}>{props.buttonName}</button>
        </div>
    )
}

export default Button