import { useState } from 'react';
import { FaFileCode } from "react-icons/fa";
import { IoChevronBackOutline, IoChevronForwardOutline, IoSunny, IoMoon } from "react-icons/io5";
import { IconContext } from "react-icons";
import './App.css';
import Customeditor from './CustomEditor';
import { Navbar, NavbarBrand, Col, Row, Button, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Container } from 'react-bootstrap';
function App() {
  const [layout, setLayout] = useState({ default: true, tri: false, fullscreen: false })
  const [lightMode, setMode] = useState(true);
  const [editorMode, setEditorMode] = useState("textmate")
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [index, setIndex] = useState(0);
  const [flipIcon, setFlipIcon] = useState(true)
  const [width, setWidth] = useState("12")
  const [collapsed, setCollapsed] = useState(false);
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
  const [preview, setPreview] = useState("<html><body>" + editorData[0]["content"] + "<style>" + editorData[1]["content"] + "</style><script>" + editorData[2]["content"] + "</script><body></html>");
  const [fileExplorerBg, setFileExplorerBg] = useState("white")
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
  const toggleLightMode = () => {
    setMode(!lightMode);
    if (editorMode === "textmate") setEditorMode("monokai");
    else setEditorMode("textmate")
    fileExplorerBg === "white" ? setFileExplorerBg("rgba(66, 66, 69, 1)") : setFileExplorerBg("white")
  }
  const insertConent = (index) => {
    setIndex(index);
  }
  const ChangeLayout = (layout) => {
    if (layout === "default") {
      setWidth("12")
      setCollapsed(false);
      setLayout({ default: true, tri: false, fullscreen: false })
    } else if (layout === "triple") {
      setWidth("5")
      setLayout({ default: false, tri: true, fullscreen: false })
      setCollapsed(true);
    }
  }
  return (
    <div className="App" style={lightMode ? { backgroundColor: "rgb(241,243,244)" } : { backgroundColor: "rgba(41, 42, 47, 1)" }}>
      <Container fluid>
        <Row>
          <Navbar color="dark" dark>
            <NavbarBrand href="/">Custom Editor</NavbarBrand>
            <Nav className="mr-auto" >

              {!lightMode ? <NavItem style={{ paddingRight: "10px" }}>
                <IconContext.Provider value={{ color: "white", size: "37px" }}>
                  <div onClick={toggleLightMode}><IoSunny /></div>
                </IconContext.Provider>
              </NavItem> :
                <NavItem style={{ paddingRight: "10px" }}>
                  <IconContext.Provider value={{ color: "white", size: "37px" }}>
                    <div onClick={toggleLightMode}><IoMoon /></div>
                  </IconContext.Provider>
                </NavItem>}
              <NavItem>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down" style={{ paddingRight: "15px" }}>
                  <DropdownToggle color="light" outline>
                    Change Layout
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => ChangeLayout("default")}>Default</DropdownItem>
                    <DropdownItem onClick={() => ChangeLayout("triple")}>Triple</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            </Nav>
          </Navbar>
        </Row>

        <Row className="editor-section mt-2" style={layout.tri ? { height: "48em" } : { height: "400px" }} >
          {collapsed &&
            <Col md={2} style={layout.tri ? { backgroundColor: fileExplorerBg, height: "94%" } : { backgroundColor: fileExplorerBg }} >
              <h3 className="mb-3 mt-2" style={{ color: "rgba(182, 179, 179, 1)" }}>File Explorer</h3>
              <div className="fileExplorer-items" onClick={() => insertConent(0)}  >
                <IconContext.Provider value={{ color: "rgba(252, 199, 10, 1)", className: "global-class-name" }}>
                  <FaFileCode /> {editorData[0].name + "." + editorData[0].extension}
                </IconContext.Provider>
              </div>
              <div className="fileExplorer-items" onClick={() => insertConent(1)}>
                <IconContext.Provider value={{ color: "rgba(252, 199, 10, 1)", className: "global-class-name" }}>
                  <FaFileCode /> {editorData[0].name + "." + editorData[1].extension}
                </IconContext.Provider>
              </div>
              <div className="fileExplorer-items" onClick={() => insertConent(2)}>
                <IconContext.Provider value={{ color: "rgba(252, 199, 10, 1)", className: "global-class-name" }}>
                  <FaFileCode /> {editorData[0].name + "." + editorData[2].extension}
                </IconContext.Provider>
              </div>
            </Col>}
          <Col md={width}>
            <h2><span><Button color={"light"} onClick={toggleExplorer}>{flipIcon ? <IoChevronForwardOutline /> : <IoChevronBackOutline />}</Button>{" "}<span className="custom-badge">{editorData[index]["language"]}</span></span> </h2>
            {<Customeditor editorData={editorData} index={index} onChange={seteditorData} displayPreview={setPreview} editormode={editorMode} />}
          </Col>
          {layout.tri && <Col md={5} className="mt-2">
            <center><span className="preview-badge" style={{ width: "5em", padding: "0.5em" }}>Preview</span></center>
            <iframe className={"mt-3"} title="live-preview" srcDoc={preview} sandbox="allow-scripts" width="100%" height="86.8%" ></iframe>
          </Col>}
        </Row>
        {layout.default && <Row className="live-view">
          <center><span className="preview-badge" style={{ width: "5em", padding: "0.4em" }}>Preview</span></center>
          <span className="mt-3"></span>
          <iframe title="live-preview" srcDoc={preview} sandbox="allow-scripts" width="100%" height="275px"></iframe>
        </Row>}
      </Container>
    </div>
  );
}

export default App;
