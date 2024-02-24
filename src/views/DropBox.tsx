import "../css/dropbox.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function DropBox() {
    return (
        <div className="box" onClick={() => {
            console.log("123");
        }}>
            <div className="text"></div>
            <div className="icon-box">
                <ExpandMoreIcon fontSize="medium" className="icon"></ExpandMoreIcon>
            </div>
            <select className="cards">
                <option className="card" value="">下载中</option>
                <option className="card" value="">已完成</option>
            </select>
        </div>
    );
}

export default DropBox;
