import "../css/dropbox.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function DropBox() {
    return (
        <div className="box" onClick={() => {
            console.log("123");
        }}>
            <div className="text">{"下载中"}</div>
            <div className="icon-box">
                <ExpandMoreIcon fontSize="medium" className="icon"></ExpandMoreIcon>
            </div>
        </div>
    );
}

export default DropBox;
