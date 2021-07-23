import React from 'react';
import { InputFieldStyled } from './styles';

const InputField =({ onChange, onBlur, ...otherProps})=>{
  
    return(
        <>
            <InputFieldStyled name={otherProps.name} min='0' type={otherProps.type} value={otherProps.value} placeholder={otherProps.placeholder} id={otherProps.id} onChange={onChange} onBlur={onBlur}/>
        </>
    )
}

export default InputField;