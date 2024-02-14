import "../css/taskview.css";

function TaskView(props: any) {
    return (
        <div className="taskview">
            {props.children}
        </div>
    )
}

export default TaskView;
