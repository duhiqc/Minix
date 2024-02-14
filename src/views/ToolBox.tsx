import "../css/toolbox.css"

function ToolBox(props: any) {
    return (
        <div className="toolbox">
            {props.children}
        </div>
    );
}

export default ToolBox;
