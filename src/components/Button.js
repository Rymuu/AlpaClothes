

const Button = (props) => {
    return (
        <>
            <button
                type={props.type}
                className={props.classes}
                onClick={props.function}>
                {props.title}
            </button>
            <br /><br />
        </>
    );
}

export default Button;