import Button from "./Button";

const Component1 = (props) => {
    console.log("Component1 rendered");
    return (
        <>
            <h1>Component 1</h1>
            {/* <Button name="Component1"/> */}
            <h2>Props from Parent component: {props.count}</h2>
        </>
    )
}

export default Component1;