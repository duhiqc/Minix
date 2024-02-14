import { IconButton } from "@material-ui/core"
import { useState } from "react";

function DropBox(props: any) {
    const [color, setColor] = useState("#d2d2d2");

    return (
        <IconButton style={{
            position: "absolute",
            left: props["index"] * 36,
            width: 32,
            height: 32,
            color: color
        }} onMouseEnter={() => {
            setColor("#4e4beb");
        }} onMouseLeave={() => {
            setColor("#d2d2d2");
        }} onClick={props["onClick"]}>
            {props.children}
        </IconButton>
    );
}

export default DropBox;
