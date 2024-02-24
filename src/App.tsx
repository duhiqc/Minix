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
import { useState } from 'react';

interface ComponentInfo {
  index: number;
  top: number;
}

function App() {
  const [showBackground, setShowBackground] = useState(true);
  //下载栏的list
  const [components, setComponents] = useState<ComponentInfo[]>([]);

  //默认调用


  const handleAddComponent = () => {
    const newIndex = components.length;
    const newTop = newIndex * 122;

    const newComponent: ComponentInfo = {
      index: newIndex,
      top: newTop,
    };

    setComponents([...components, newComponent]);
  };

  const handleRemoveComponent = (index: number) => {
    const updatedComponents = components.filter(component => component.index !== index);

    // 重新计算剩余组件的 top 值
    const rearrangedComponents = updatedComponents.map((component, idx) => ({
      ...component,
      top: idx * 122,
    }));

    setComponents(rearrangedComponents);
  };

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
          transform: "translate(-50%, -50%)",
          visibility: components.length === 0 ? 'visible' : 'hidden'
        }} />
      </div>
      <Toaster />
      <DropBox></DropBox>
      <div className="line"></div>

      <ToolBox>
        <Button index={0} onClick={() => {
          handleAddComponent();
        }}>
          <AddIcon fontSize="medium"></AddIcon>
        </Button>
        <Button index={1} onClick={() => {
        }}>
          <ClearIcon fontSize="small"></ClearIcon>
        </Button>
        <Button index={2}>
          <PlayArrowIcon></PlayArrowIcon>
        </Button>
        <Button index={3}>
          <PauseIcon fontSize="small"></PauseIcon>
        </Button>

      </ToolBox>

      <TaskView>
        {components.map(component => {
          // setAllowAdding(false);
          return (
            <div key={component.index} style={{
              position: 'absolute',
              top: component.top,
              width: 370,
              height: 118,
              marginLeft: 15
            }}>
              <TaskItem index={component.index} onRemove={() => handleRemoveComponent(component.index)}></TaskItem>
            </div>
          );
        })}
      </TaskView>
      <div data-tauri-drag-region className="titlebar"></div>
      <button style={{
        position: "absolute",
        top: 70
      }} onClick={() => {
        console.log(components);
      }}>123</button>
    </div>
  );
}

export default App;
