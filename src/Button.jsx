const Button = (props) => {
    console.log('Props of Button:', props);

    function test() {
        console.log('Button clicked');
    }
    return(
        <button onClick={() => test}>{props.name}</button>
    )
}

export default Button;