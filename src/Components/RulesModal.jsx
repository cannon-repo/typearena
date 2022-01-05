import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleRuleView } from '../Redux/RulesViewSlice';

const RulesModal = (props) => {

    const dispatch = useDispatch();

    const closeRulesModal = () => {
        dispatch(toggleRuleView());
    }

    return (
      <div className="RulesModalWrap">
        <div className="Backface" onClick={closeRulesModal}></div>
        <div className="RulesModal">
            {
                props.rules.map((val,index) => {
                return (
                    <li key={index} className="List">
                    {val}
                    </li>
                );
                })
            }
        </div>
      </div>
    );
}

export default RulesModal;