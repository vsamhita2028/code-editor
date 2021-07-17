import '../App.css';
import { useState } from 'react';
import { IconContext } from "react-icons";
import { AiFillCode } from "react-icons/ai";
import { IoSunny, IoMoon } from "react-icons/io5";
import { Navbar, NavbarBrand, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/*
  Appbar component contains the topbar which facilitates the change of the theme and layout
 */
const Appbar = ({ lightMode, toggleLightMode, ChangeLayout }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false); //The states the allows toggling the dropdown change Layout Button
  const toggle = () => setDropdownOpen(prevState => !prevState); // This function is responsible for toggling the dropdown

  return (
    <>
      <Navbar color="dark" dark>
        <NavbarBrand href="#">
          <IconContext.Provider value={{ color: "white", size: "37px" }}>
            <div ><AiFillCode /> EDIT||</div>
          </IconContext.Provider>
        </NavbarBrand>
        <Nav className="mr-auto" >
          {/* The teranary operator is responsible to switch the icon that represents light mode and dark mode */}
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
          {/* Change layout out drop dwon button  */}
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

    </>
  );
}

export default Appbar;