import { IconButton } from "@material-ui/core";
import "../css/taskview.css";
import closeIcon from "../assets/Close.svg";
import { useRef, useState } from "react";
import folder from "../assets/Folder.svg";
import link from "../assets/Link.svg";
import thread from "../assets/Threads.svg";
import download from "../assets/Download.svg";
import { readText, writeText } from '@tauri-apps/api/clipboard';
import { show_message } from "./Dialog";
import { open } from '@tauri-apps/api/dialog';
import { convertDownloadLinkToUtf8 } from "./Files";
import timeout from "../assets/timeout.svg";

function TaskItem(props: any) {
    //下载栏信息
    const [fileName, setFileName] = useState("新建任务");
    const [infoView, setInfoView] = useState(false);
    const [progressView, setProgressView] = useState(true);
    //下载信息
    const [link, setLink] = useState("");
    const [path, setPath] = useState("/Users/lqc/Downloads/")
    const [threads, setThreads] = useState("64");
    //控制组组件的删除
    const [isComponentVisible, setIsComponentVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    function test() {
        if (progress <= 100) {
            setTimeout(() => {
                setProgress(progress + 1);
            }, 500);
        }
    }

    return (
        <>
            {isComponentVisible && (
                <div style={{
                    position: "absolute",
                    top: props["index"] * 122,
                    left: 0,
                    width: "100%",
                    height: 118
                    // backgroundColor: 'grey'
                }}>
                    {/* 标题文字 */}
                    <div style={{
                        position: "absolute",
                        fontFamily: "system-ui",
                        fontSize: 14,
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        KhtmlUserSelect: "none",
                        msUserSelect: "none",
                        MozUserSelect: "none",
                        lineHeight: "26px",
                        top: -1,
                        left: 8,
                        color: "#c3c3c3",
                        cursor: "default"
                    }}>
                        {fileName}
                    </div>

                    {/* 信息栏 */}
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: -1,
                        width: "100%",
                        height: 92,
                        backgroundColor: '#1d1d1d',
                        border: '1px solid #414141',
                        borderRadius: 12,
                        boxShadow: "0px 1px 8px black",
                        visibility: infoView ? "visible" : "hidden",
                        overflow: "hidden"
                    }}>
                        <InfoContent url={link} setShow={setIsComponentVisible}></InfoContent>
                        <div style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: `${progress}%`,
                            height: 4,
                            backgroundColor: "#3036ba",
                        }}></div>
                        {/* 删除任务的按钮 */}
                        <IconButton style={{
                            position: "absolute",
                            top: 7,
                            right: 14,
                            width: 34,
                            height: 34,
                            // backgroundColor: "grey"
                            color: 'white',
                        }} onClick={() => {
                            setTimeout(() => {
                                props["setShow"](false);
                            }, 120);
                        }}>
                            <img src={closeIcon} style={{
                                width: 18,
                                height: 18,
                                pointerEvents: "none"
                            }} />
                        </IconButton>
                        {/* 暂停和结束按钮 */}
                        <IconButton style={{
                            position: "absolute",
                            top: 44,
                            right: 14,
                            width: 34,
                            height: 34,
                            color: "white",
                            fontFamily: "SEGOEICONS",
                            fontSize: 18,
                            fontWeight: "10"
                        }}>
                            &#xe768;
                        </IconButton>
                    </div>

                    {/* 卡片 */}
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: -1,
                        width: "100%",
                        height: 92,
                        backgroundColor: '#1d1d1d',
                        border: '1px solid #414141',
                        borderRadius: 12,
                        boxShadow: "0px 1px 8px black",
                        visibility: progressView ? "visible" : "hidden"
                    }}>
                        <LinkLine setLink={setLink}></LinkLine>
                        <PathLine path={path} setPath={setPath}></PathLine>
                        <ThreadLine threads={threads} setThreads={setThreads}></ThreadLine>
                        <IconButton style={{
                            position: "absolute",
                            top: 8,
                            right: 12,
                            width: 34,
                            height: 34,
                            // backgroundColor: "grey"
                            color: 'white',
                        }} onClick={() => {
                            setIsComponentVisible(false);
                        }}>
                            <img src={closeIcon} style={{
                                width: 18,
                                height: 18,
                                pointerEvents: "none"
                            }} />
                        </IconButton>
                        <button style={{
                            position: "absolute",
                            top: 51,
                            right: 14,
                            width: 30,
                            height: 30,
                            backgroundColor: '#3036ba',
                            borderRadius: 6,
                            boxShadow: '1px 0px 0px #3036ba, -1px 0px 0px #3036ba, 0px 1px 0px #1d1b7b, 0px -1px 0px #4e4beb',
                            border: 'none'
                        }} onClick={() => {
                            console.log(link);
                            if (isTrueDownloadLink(link)) {
                                setProgressView(false);
                                setInfoView(true);
                                setFileName(convertDownloadLinkToUtf8(link));

                            } else {
                                show_message("请输入正确的链接", "err");
                            }
                        }}>
                            <img src={download} style={{
                                position: 'absolute',
                                top: "50%",
                                left: "50%",
                                width: 18,
                                height: 18,
                                transform: "translate(-50%, -50%)",
                                color: '#313131',
                                pointerEvents: "none"
                            }} />
                        </button>
                    </div>
                </div>
            )}
        </>

    )
}

export default TaskItem;

function InfoContent(props: any) {
    return (
        <div style={{
            position: "absolute",
            width: 300,
            height: 30,
            top: 8,
            left: 14,
            borderRadius: 6,
            backgroundColor: "transparent",
        }}>
            <div style={{
                position: "absolute",
                left: -4,
                top: 1,
                width: 32,
                height: 30,
                color: 'white'
                // backgroundColor: 'grey'
            }} onClick={async () => {
            }}>
                <img src={link} style={{
                    position: "absolute",
                    width: 18,
                    height: 18,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none"
                }} />
            </div>

            <input type="text" style={{
                position: "absolute",
                width: "calc(100% - 32px)",
                height: 30,
                top: 0,
                right: 2,
                borderRadius: 6,
                outline: "none",
                padding: 0,
                borderStyle: "solid",
                border: "none",
                backgroundColor: "transparent",
                color: 'whitesmoke',
                fontFamily: "system-ui",
                fontSize: 14,
                textIndent: 2,
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
            }} onClick={async () => {
                await writeText(props["url"]);
                show_message("复制成功", "copy");
            }} value={props["url"]} readOnly>
            </input>
        </div>
    )
}

function isTrueDownloadLink(url: string): boolean {
    const validProtocols = /^(https?|ftp):\/\//i;
    return validProtocols.test(url);
}

function LinkLine(props: any) {
    const [shadow, setShadow] = useState("1px -1px 0px #303030, -1px -1px 0px #303030, 0px 1px 0px #303030");
    const defaultStyle = "1px -1px 0px #303030, -1px -1px 0px #303030, 0px 1px 0px #303030";
    const actionStyle = "1px -1px 0px #303030, -1px -1px 0px #303030, 0px 2px 1px #3035ba";
    const [linear, setLinear] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div style={{
            position: "absolute",
            width: 300,
            height: 30,
            top: 11,
            left: 14,
            boxShadow: shadow,
            borderRadius: 6,
            backgroundColor: "#141414",
        }}>
            <IconButton style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 32,
                height: 30,
                color: 'white'
                // backgroundColor: 'grey'
            }} onClick={async () => {
                const read_text = await readText();
                if (readText !== null) {
                    if (inputRef.current) {
                        inputRef.current.value = read_text as string;
                        const isTip = inputRef.current.clientWidth < inputRef.current.scrollWidth
                        if (isTip) {
                            setLinear("linear-gradient(to left, #030303, transparent)");
                        } else {
                            setLinear("");
                        }
                        if (!isTrueDownloadLink(read_text as string)) {
                            const str = read_text as string;
                            if (str.length > 0) {
                                show_message("请输入正确的链接", "err")
                            }
                        } else {
                            props["setLink"](read_text as string);
                        }
                    }
                } else {
                    console.log("空");
                }
            }}>
                <img src={link} style={{
                    position: "absolute",
                    width: 18,
                    height: 18,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none"
                }} />
            </IconButton>

            <input ref={inputRef} type="text" style={{
                position: "absolute",
                width: "calc(100% - 32px)",
                height: 30,
                top: 0,
                right: 0,
                borderRadius: 6,
                outline: "none",
                padding: 0,
                borderStyle: "solid",
                border: "none",
                backgroundColor: "#141414",
                color: 'whitesmoke',
                fontFamily: "system-ui",
                fontSize: 14,
                textIndent: 2
            }} onFocus={() => {
                setShadow(actionStyle);
            }} onBlur={(e) => {
                setShadow(defaultStyle);
                //判断链接是否可用
                if (!isTrueDownloadLink(e.currentTarget.value)) {
                    if (e.currentTarget.value.length > 0) {
                        show_message("请输入正确的链接", "err")
                    }
                } else {
                    props["setLink"](e.currentTarget.value);
                }
            }} onChange={(e) => {
                //判断是否给文字使用渐变效果
                const input = e.target;
                const isTip = input.clientWidth < input.scrollWidth
                if (isTip) {
                    setLinear("linear-gradient(to left, #030303, transparent)");
                } else {
                    setLinear("");
                }
            }} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.currentTarget.blur();
                }
            }}>
            </input>
            <div style={{
                position: "absolute",
                right: 0,
                height: "100%",
                width: 36,
                pointerEvents: "none",
                borderRadius: "0 6px 6px 0",
                background: linear
                // boxShadow: "1px -1px 0px #303030, -1px -1px 0px #303030, 0px 1px 0px #303030",
            }}></div>
        </div>
    )
}

function PathLine(props: any) {
    const path = props["path"];
    const setPath = props["setPath"];

    return (
        <div style={{
            position: "absolute",
            width: 225,
            height: 30,
            bottom: 11,
            left: 14,
            boxShadow: "1px -1px 0px #303030, -1px -1px 0px #303030, 0px 1px 0px #303030",
            borderRadius: 6,
            backgroundColor: "#141414"
        }}>
            <IconButton style={{
                position: "absolute",
                width: 24,
                height: 24,
                top: 3,
                left: 4,
                backgroundColor: '#1d1d1d',
                borderRadius: 4,
                boxShadow: "0px 0px 1px #303030",
                color: 'white'
            }} onClick={async () => {
                const dirPath = await open({
                    directory: true,
                });
                if (dirPath !== null) {
                    setPath(dirPath as string);
                }
            }}>
                <img src={folder} style={{
                    position: "absolute",
                    width: 16,
                    height: 16,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none"
                }} />
            </IconButton>
            <input type="text" style={{
                position: "absolute",
                width: "calc(100% - 30px)",
                height: 30,
                top: 0,
                left: 30,
                borderRadius: 6,
                outline: "none",
                padding: 0,
                borderStyle: "solid",
                border: "none",
                backgroundColor: "#141414",
                color: 'whitesmoke',
                fontFamily: "system-ui",
                fontSize: 14,
                textIndent: 2
            }} onClick={async () => {
                await writeText(path);
                show_message("复制成功", "copy");
            }}
                value={path} readOnly>
            </input>
        </div>
    )
}

function ThreadLine(props: any) {
    const threads = props["threads"];
    const setThreads = props["setThreads"];

    return (
        <div style={{
            position: "absolute",
            width: 66,
            height: 30,
            bottom: 11,
            right: 56,
            boxShadow: "1px -1px 0px #303030, -1px -1px 0px #303030, 0px 1px 0px #303030",
            borderRadius: 6,
            backgroundColor: "#141414"
        }}>
            <div style={{
                position: 'absolute',
                width: 30,
                height: 30,
                // backgroundColor: 'white'
            }}>
                <img src={thread} style={{
                    position: 'absolute',
                    top: "50%",
                    left: "50%",
                    width: 16,
                    height: 16,
                    transform: "translate(-50%, -50%)",
                    color: '#313131'
                }} />
            </div>
            <input type="text" style={{
                position: "absolute",
                width: 36,
                height: 30,
                top: 0,
                right: 0,
                borderRadius: 6,
                outline: "none",
                padding: 0,
                borderStyle: "solid",
                border: "none",
                backgroundColor: "#141414",
                color: 'whitesmoke',
                fontFamily: "system-ui",
                fontSize: 14,
                textIndent: 2
            }} value={threads}
                onChange={(e) => {
                    setThreads(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.currentTarget.blur();
                    }
                }}
                onBlur={(e) => {
                    function isNumber(input: string): boolean {
                        return !isNaN(Number(input));
                    }

                    function isBetweenZeroAnd64(num: number): boolean {
                        return num > 0 && num <= 64;
                    }

                    function isDecimal(input: string): boolean {
                        return /^\d+\.\d+$/.test(input);
                    }

                    const count = e.currentTarget.value;
                    if (count.length === 0) {
                        e.currentTarget.value = '1';
                    } else {
                        if (isNumber(count)) {
                            const thread = parseInt(count);
                            if (isBetweenZeroAnd64(thread)) {
                                if (isDecimal(count)) {
                                    e.currentTarget.value = Math.round(parseFloat(count)).toString();
                                }
                            } else {
                                if (thread > 64) {
                                    e.currentTarget.value = "64";
                                } else {
                                    e.currentTarget.value = "1";
                                }
                            }
                        } else {
                            show_message("请输入数字", "err");
                            e.currentTarget.value = "1";
                        }
                    }
                }} />
        </div>
    )
}
