import '../App.css';
import { useState } from 'react';
import { FaFileCode } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Col, Button } from 'reactstrap';
import Customeditor from './CustomEditor';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
/* 
    EditorSection Component :
    This component contains the layout of the editor section and the file explorer.
*/
const EditorSection = (
    { layout, editorMode, fileExplorerBg, editorData, seteditorData, preview, setPreview, collapsed, setCollapsed, width, setWidth }) => {
    const [flipIcon, setFlipIcon] = useState(true) // This is responsible for toggling the file explorer icon.
    // As editor data consists html,css and js data. This index acts like an idetifier for the user's language selection 
    //For instance if html is chosen by the user the then index is set to 0. Similarly for css index is 1 and for js its 2.
    const [index, setIndex] = useState(0); 
    //Allows toggling and sets the width of all the components based on the theme selected
    const toggleExplorer = () => {
        setCollapsed(!collapsed);
        setFlipIcon(!flipIcon)
        if (width === "12" && layout.default) {
            setWidth("10")
        } else if (layout.default) {
            setWidth("12")
        } else if (layout.tri) {
            setWidth("5");
        }
    }
    //Populates the selected laguage's contents or code.
    const insertConent = (index) => {
        setIndex(index);
    }
    return (
        <>
        {/* Based on the collapsed value, the file explorer is hidden. Initially the File Explorer is hidden. */}
            {collapsed &&
                <Col md={2} style={layout.tri ? { backgroundColor: fileExplorerBg, height: "94%" } : { backgroundColor: fileExplorerBg }} >
                    <h3 className="mb-3 mt-2" style={{ color: "rgba(182, 179, 179, 1)" }}>File Explorer</h3>
                    <div className="fileExplorer-items" onClick={() => insertConent(0)}  >
                        <IconContext.Provider value={{ color: "rgba(252, 199, 10, 1)", className: "global-class-name" }}>
                            <FaFileCode /> {editorData[0].name + "." + editorData[0].extension} {/* HTML FILE */}
                        </IconContext.Provider>
                    </div>
                    <div className="fileExplorer-items" onClick={() => insertConent(1)}>
                        <IconContext.Provider value={{ color: "rgba(252, 199, 10, 1)", className: "global-class-name" }}>
                            <FaFileCode /> {editorData[0].name + "." + editorData[1].extension} {/* CSS FILE*/}
                        </IconContext.Provider>
                    </div>
                    <div className="fileExplorer-items" onClick={() => insertConent(2)}>
                        <IconContext.Provider value={{ color: "rgba(252, 199, 10, 1)", className: "global-class-name" }}>
                            <FaFileCode /> {editorData[0].name + "." + editorData[2].extension} {/* JS FILE */}
                        </IconContext.Provider>
                    </div>
                </Col>}
            <Col md={width}>
                {/* Here the language selected is how and the toggle button of file Explorer is present */}
                <h2 style={{paddingBottom :"0.2em"}}><span>{layout.default && <Button color={"light"} onClick={toggleExplorer}>{flipIcon ? <IoChevronForwardOutline /> : <IoChevronBackOutline />}</Button>}{" "}<span className="custom-badge">{editorData[index]["language"].toUpperCase() }</span></span> </h2>
                {/* This component contains the editor. (More details about the componet are present in respective component file ) */}
                {<Customeditor editorData={editorData} index={index} onChange={seteditorData} displayPreview={setPreview} editormode={editorMode} />}
            </Col>
            {/*
                This is the Live view section, which shows the output of the code
                In App.js there is already a Live view section present. Then why is it present here again?
                This Live View is only present if the layout is triple else this is hidden.
                The Live View Section in the App.js is only visible in default layout otherwise it is hidden
            */}
            {layout.tri && <Col md={5} className="mt-2">
                <span className="preview-badge" style={{ width: "5em", padding: "0.5em" }}>PREVIEW</span>
                <iframe className={"mt-3"} title="live-preview" srcDoc={preview} sandbox="allow-scripts" width="100%" height="87.3%" ></iframe>
            </Col>}
        </>
    );
}

export default EditorSection;