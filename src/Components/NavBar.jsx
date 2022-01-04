import React from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdSpeed } from "react-icons/md";
import { BsPatchQuestion } from "react-icons/bs";
import { TiSortAlphabetically } from "react-icons/ti";
import {IoClose} from "react-icons/io5";
import "../Styles/NavBar.css";
import {useDispatch, useSelector} from "react-redux";
import {bringToView, removeFromView} from "../Redux/NavViewSlice";
import { NavLink } from "react-router-dom";

const NavBar = () => {

  const dispatch = useDispatch();
  const navViewClass = useSelector((state) => state.navView.viewClass);

  const navClickHandler = () => {
    navViewClass === "BringToView" ? dispatch(removeFromView()) : dispatch(bringToView());
  }

  return (
    <React.Fragment>
      <div className="NavBar">
        <div className="LogoWrap ctr">
          <div className="Logo ptr"></div>
          <div className="Brand">TYPEArena</div>
        </div>
        <div className="NavLines ptr ctr" onClick={navClickHandler}>
          {
            navViewClass === "RemoveFromView" ?
            <HiOutlineMenuAlt4 /> : <IoClose/>
          }
        </div>
      </div>
      <div className={`SideNav ${navViewClass}`}>
        <NavLink to="/speedtest" className="SideNavIconWrap ptr">
          <MdSpeed />
          <p className="SideNavIconInfo">Speed Test</p>
        </NavLink>
        <NavLink to="/guesstheword" className="SideNavIconWrap ptr">
          <BsPatchQuestion />
          <p className="SideNavIconInfo">Guess The Word</p>
        </NavLink>
        <NavLink to="/fastestfingers" className="SideNavIconWrap ptr">
          <TiSortAlphabetically />
          <p className="SideNavIconInfo">Fastest Finger</p>
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
