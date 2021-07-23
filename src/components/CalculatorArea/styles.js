import styled from "styled-components";

export const CalculatorAreaStyled = styled.div`
display:flex;
justify-content: space-between;
margin: auto;
border: 2px solid #00a34c;
width: 60em;
padding-top: 0em;
margin-top: 10em;

.header{
  position: absolute;
  height: 30px;
  display: flex;
  margin-bottom: 10px;
  padding-left:5px;
  padding-top: 5px;
  background-color: #00a34c;
  color: white;
  width: 59.75em;
  }

.flexsur{
  display: flex;
  margin-top: 40px;
}
.inputs{
  display: flex;
}
.halfInput{
    padding: 0;
    border: 0;
    font-size:100%;
    vertical-align: baseline;
    
}
.button{
    padding: 15px;
}
.descriptionBox{
  margin: 0px;
  width: 55.75%;
  padding: 0px;
  padding-left:90px;
  padding-top:2px;
  background-color: #c9c9c9;
  display: block;
  margin-right:0px;
  margin-left: 10px;
  text-align: start;
  height:30px;

}

.decriptionUnit{
  display:flex;
  flex-direction: row;
}

.genderBox{
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  padding-left: 40px;
  border-left: 1px solid #c9c9c9;
  padding-top: 25px;
}
.error{
  font-size:13px;
  color:red;
  margin-top:3px;
  margin-left: 10px;
}
.bottomBtns{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1em 0 1em 0;
}

`
export const ButtonStyled = styled.button`
  border-style:none;
  color: white;
  background-color: #ffa852;
  margin-top: 10px;
  font-size: 21px;
  padding: 0.25em 1em;
  &.unitBtn{
  font-size: 12px;
  width: 35%;
  margin-top:0px;
  margin-right: 11px;
  font-weight:bold;
}
  &:hover{
    background-color: #ff9730;
  }
  &:active{
    background-color: #ffcc99;
  }
`;