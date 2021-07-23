import React from 'react';
import { OptionSelectorStyled } from './styles';

const OptionSelector =({children, onChange, onBlur,...props})=>{
    return(
        <>
            <OptionSelectorStyled required name={props.name} defaultValue='' onChange={onChange} onBlur={onBlur} id={props.id}>
                <option disabled value=''>Weekly activity level</option>
                <option value ={1.2}>Little/no exercise: 0-1 day per week</option>
                <option value ={1.375}>Light exercise: 1-3 days per week</option>
                <option value ={1.55}>Moderate exercise: 3-5 days per week</option>
                <option value ={1.725}>Very active: 5-7 days per week</option>
                <option value ={1.9}>Extra active: 5-7 days per week {'&'} physical job</option>
            </OptionSelectorStyled>
            
        </>
    )
}

export default OptionSelector;