import "./App.css";
import "./css/theme.css";
import Button from "./views/Button";
import DropBox from "./views/DropBox";
import ToolBox from "./views/ToolBox";
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import TaskView from "./views/TaskView";
import TaskItem from "./views/TaskItem";
import { Toaster } from "react-hot-toast";
import background from "./assets/EmptyList.png";
import { useState } from "react";

function App() {
  const [showBackground, setShowBackground] = useState(true);

  return (
    <div className="container">
      <div style={{
        position: "absolute",
        width: "100%",
        height: "calc(100% - 78px)",
        left: 0,
        bottom: 0,
        visibility: showBackground ? "visible" : "hidden"
      }}>
        <img src={background} style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }} />
      </div>
      <Toaster />
      <DropBox></DropBox>
      <div className="line"></div>

      <ToolBox>
        <Button index={0} onClick={() => {
          // setTaskViewVisible("visible");
        }}>
          <AddIcon fontSize="medium"></AddIcon>
        </Button>
        <Button index={1}>
          <ClearIcon fontSize="small"></ClearIcon>
        </Button>
        <Button index={2}>
          <PlayArrowIcon></PlayArrowIcon>
        </Button>
        <Button index={3}>
          <PauseIcon fontSize="small"></PauseIcon>
        </Button>
      </ToolBox>

      {/* <Dialog></Dialog> */}

      <TaskView>
        <TaskItem index={0}></TaskItem>
      </TaskView>
      <div data-tauri-drag-region className="titlebar"></div>
    </div>
  );
}

export default App;
