import React from "react";
import "../Styles/Home.css";
import Smoke from "./Smoke";
import {GoKeyboard} from "react-icons/go";
import Typed from "react-typed";

const Home = () => {
  return (
    <React.Fragment>
      <Smoke col="rgb(55,0,55)" dir="left" offset={0} />
      <Smoke col="#000055" dir="right" offset={10} />
      <div className="Home">
        <div className="HeroWrap">
            <GoKeyboard className="HeroIcon"/>
            <p className="Hero">TYPEARENA</p>
            <div className="SmallHero">
                <Typed strings={['Whats Your Typing Speed?','Wandering???...','Lets Find Out','Click Nav Icon To Begin']} typeSpeed={40} backSpeed={30}/>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;