import styled from "styled-components";

export const InputFieldStyled = styled.input`
display:flex;
flex-direction: row;
border-style:none;
border:0.5px solid #c9c9c9;
background-color: transparent;
height: 25px;
margin: 10px;
margin-bottom: 0px;
padding: 5px;
font-size: 18px;
width: 87%;
color: #00a34c;
text-align: center;



 &:focus{
    outline-style: none;
    border: 1px solid #c9c9c9;
    &::placeholder{
        color: transparent;
    }
 }
 
`
