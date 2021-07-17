import './App.js';
import { Row } from 'reactstrap';
import { useState } from 'react';
import Appbar from "./Components/Appbar"
import { Container } from 'react-bootstrap';
import EditorSection from "./Components/EditorSection";
/* 
  The whole page is divided into 3 sections :
  1) Appbar
  2) Editor + FileExplorer
  3) Live view / Output
*/
function App() {
  // All layout and theme states
  // 1. Layout states :
  const [layout, setLayout] = useState({ default: true, tri: false })  // This sets the layout of the webpage : Default or Triple View
  const [collapsed, setCollapsed] = useState(false); // To toggle File explorer. This sets it's visibility
  const [width, setWidth] = useState("12") // To change layout I have used this state to dynamically change width of a bootstrap column
  // 2. Theme State
  const [lightMode, setMode] = useState(true); // To toggle from lightMode to dark Mode. By default its in Light Mode
  const [editorMode, setEditorMode] = useState("textmate") // To facilitate the toggle of editor's mode/theme between Textmate & Monokai
  const [fileExplorerBg, setFileExplorerBg] = useState("white") // To toggle the theme of the fileExplorer this is use.

  // editorData : This holds the data of the editor, upon selection of a file from file explorer it populates the data into the editor 
  const [editorData, seteditorData] = useState([
    {
      id: 1,
      name: "index",
      language: "html",
      extension: "html",
      content: ""
    },
    {
      id: 2,
      name: "index",
      language: "css",
      extension: "css",
      content: ""
    },
    {
      id: 3,
      name: "indexsss",
      language: "javascript",
      extension: "js",
      content: ""
    },
  ])

  // The Live view of html+css+js is stored in the variable preview 
  const [preview, setPreview] = useState("<html><body>" + editorData[0]["content"] + "<style>" + editorData[1]["content"] + "</style><script>" + editorData[2]["content"] + "</script><body></html>");
  
  // This function is responsible for toggling the theme of all the components
  const toggleLightMode = () => {
    setMode(!lightMode);
    if (editorMode === "textmate") setEditorMode("monokai");
    else setEditorMode("textmate")
    fileExplorerBg === "white" ? setFileExplorerBg("rgba(66, 66, 69, 1)") : setFileExplorerBg("white")
  }

  // This function is rsponsible for changing the layout of all the components
  const ChangeLayout = (layout) => {
    if (layout === "default") {
      setWidth("12")
      setCollapsed(false);
      setLayout({ default: true, tri: false })
    } else if (layout === "triple") {
      setWidth("5")
      setLayout({ default: false, tri: true })
      setCollapsed(true);
    }
  }
  return (
    <div className="App" style={lightMode ? { backgroundColor: "rgb(241,243,244)" } : { backgroundColor: "rgba(41, 42, 47, 1)" }}>
      <Container fluid style={{paddingBottom : "0.5em"}}>
        <Row>
          {/* Appbar Component  */}
          <Appbar lightMode={lightMode} toggleLightMode={toggleLightMode} ChangeLayout={ChangeLayout} /> 
        </Row>

        <Row className="editor-section mt-2 mb-3" style={layout.tri ? { height: "48em" } : { height: "400px" }} >
          {/*  Editor and the File Explore are present in the EditorSection Component  */}
          <EditorSection
            layout={layout} editorMode={editorMode} fileExplorerBg={fileExplorerBg} editorData={editorData} seteditorData={seteditorData}
            preview={preview} setPreview={setPreview} collapsed={collapsed} setCollapsed={setCollapsed} width={width} setWidth={setWidth}
          />
        </Row>
        {/* This shows the live view of the changes made in the editor */}
        {layout.default && <Row className="live-view">
          <center><span className="preview-badge" style={{ width: "5em", padding: "0.4em" }}>PREVIEW</span></center>
          <span className="mt-3"></span>
          <iframe title="live-preview" srcDoc={preview} sandbox="allow-scripts" width="100%" height="255px"></iframe>
        </Row>}
      </Container>
    </div>
  );
}

export default App;
