import React from 'react';
import "../Styles/Smoke.css";

const Smoke = (props) => {
    const arr = [
      14,6,10,8,3,2,12,11,9,5,4,6,3,0,2,1,10,9,8,6,2,4,10,7,9,15,12,11,13,10,5,7,4,6
    ];
    const dir = props.dir === "left" ? "flex-start" : "flex-end";
    return (
        <div className='Smoke' style={{justifyContent: dir}}>
            {
                arr.map((val, index) => {
                    return <span key={index} style={{animationDelay: `${(val + props.offset)* Math.random()}s`, backgroundColor: `${props.col}`}}></span>
                })
            }
        </div>
    )
}

export default Smoke;