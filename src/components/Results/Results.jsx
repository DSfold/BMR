import React from 'react';
import { ResultsStyled } from './styles';

const Results =({children, ...props})=>{
    return(
        <ResultsStyled name={props.name} >
            <div>
            <h3>{children}</h3>
            </div>
            <div className='macros'>
            <span className='caloriesIn'>Calories: {props.calories} </span>
            <span>Protein: {props.protein}g </span>
            <span>Fats: {props.fats}g </span>
            <span>Carbohydrates: {props.carbs}g </span>
            </div>
        </ResultsStyled>

    )
}

export default Results;