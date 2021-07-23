import React from 'react';

const RadioButton =({children, onChange, ...props})=>{
    return(
        <>  <div>
            <input type='radio' name={props.name} value={props.value} id={props.id} onChange={onChange}/>
            <label htmlFor={props.id}>{children}</label>
            </div>
        </>
    )
}

export default RadioButton;