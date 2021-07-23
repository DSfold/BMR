import React, { useState } from "react";
import InputField from "../InputField/InputField";
import OptionSelector from "../OptionSelector/OptionSelector";
import RadioButton from "../RadioButton/RadioButton";
import { CalculatorAreaStyled, ButtonStyled } from "./styles";
import { useFormik } from "formik";
import Results from "../Results/Results";

const CalculatorArea = (props) => {
  const [maintanenceCalories, setMaintanenceCalories] = useState(0);
  const [proteinIntake, setProteinIntake] = useState(0);
  const [fatsIntake, setFatsIntake] = useState(0);
  const [carbsIntake, setCarbsIntake] = useState(0);
  const [defecitCalories, setDefecitCalories] = useState(0);
  const [defecitCarbsIntake, setdefecitCarbsIntake] = useState(0);
  const [defecitFatsIntake, setdefecitFatsIntake] = useState(0);
  const [surplusCalories, setSurplusCalories] = useState(0);
  const [surplusCarbsIntake, setSurplusCarbsIntake] = useState(0);
  const [surplusFatsIntake, setSurplusFatsIntake] = useState(0);
  const [heightUnit, setHeightUnit] = useState('cm')
  const [heightMaleValue, setHeightMaleValue] = useState(4.799)
  const [heightFemaleValue, setHeightFemaleValue] = useState(3.098)
  const [weightUnit, setWeightUnit] = useState('kg')
  const [weightMaleValue, setWeightMaleValue] = useState(13.75)
  const [weightFemaleValue, setWeightFemaleValue] = useState(9.247)

  const handleHeightUnits = () =>{
    if(heightUnit==='cm'){ 
      setHeightUnit('inches')
      setHeightMaleValue(12.7)
      setHeightFemaleValue(4.7)
   }
    else{
      setHeightUnit('cm')
      setHeightMaleValue( 5.003)
      setHeightFemaleValue(3.098)
   }
  }

  const handleWeigthUnits = ()=>{
    if(weightUnit==='kg'){ 
      setWeightUnit('lbs')
      setWeightMaleValue(6.2)
      setWeightFemaleValue(4.35)
    }else{
      setWeightUnit('kg')
      setWeightMaleValue(13.75)
      setWeightFemaleValue(9.247)
    }
  }


  const calculateDailyCalories = (
    age,
    weight,
    height,
    activityLevel,
    gender
  ) => {
    if (gender === "male") {
      return Math.round(
        (66 + weightMaleValue * weight + heightMaleValue * height - 6.755 * age) *
          activityLevel
      );
    } else {
      return Math.round(
        (655 + weightFemaleValue * weight + heightFemaleValue * height - 4.7 * age) * activityLevel
      );
    }
  };
  const calculateCaloricDeficit = (dailyCalories) => dailyCalories - 400;
  const calculateCaloricSurplus = (dailyCalories) => dailyCalories + 400;
  const calculateProteinIntake = (weight) => weight * 2;
  const calculateFatsIntake = (dailyCalories) =>
    Math.round((dailyCalories * 0.25) / 9);
  const calculateCarbsIntake = (dailyCalories, proteinIntake, fatsIntake) =>
    Math.round((dailyCalories - (proteinIntake * 4 + fatsIntake * 9)) / 4);

  const validate = values => {
    const errors ={}
    if(!values.age){
      errors.age = '*Required'
    }else if(values.age===0 || values.age>120){
      errors.age = 'Enter the valid value'
    }

    if(!values.weight){
      errors.weight = '*Required'
    }else if(values.weight===0){
      errors.weight = 'Enter the valid value'
    }

    if(!values.height){
      errors.height = '*Required'
    }else if(values.height===0){
      errors.height = 'Enter the valid value'
    }

    if(!values.genderSelector){
      errors.genderSelector = '*Required'
    }
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      age: '',
      weight: '',
      height: '',
      genderSelector: "",
      activityLevel: "",
    },
    validate,
    onSubmit: (values) => {
      setMaintanenceCalories(
        calculateDailyCalories(
          values.age,
          values.weight,
          values.height,
          values.activityLevel,
          values.genderSelector
        )
      );
      setProteinIntake(calculateProteinIntake(values.weight));
      setFatsIntake(
        calculateFatsIntake(
          calculateDailyCalories(
            values.age,
            values.weight,
            values.height,
            values.activityLevel,
            values.genderSelector
          )
        )
      );
      setCarbsIntake(
        calculateCarbsIntake(
          calculateDailyCalories(
            values.age,
            values.weight,
            values.height,
            values.activityLevel,
            values.genderSelector
          ),
          calculateProteinIntake(values.weight),
          calculateFatsIntake(
            calculateDailyCalories(
              values.age,
              values.weight,
              values.height,
              values.activityLevel,
              values.genderSelector
            )
          )
        )
      );
      setDefecitCalories(
        calculateCaloricDeficit(
          calculateDailyCalories(
            values.age,
            values.weight,
            values.height,
            values.activityLevel,
            values.genderSelector
          )
        )
      );
      setdefecitFatsIntake(calculateFatsIntake(calculateCaloricDeficit(calculateDailyCalories(
        values.age,
        values.weight,
        values.height,
        values.activityLevel,
        values.genderSelector
      ))));
      setdefecitCarbsIntake(calculateCarbsIntake(calculateCaloricDeficit(
        calculateDailyCalories(
          values.age,
          values.weight,
          values.height,
          values.activityLevel,
          values.genderSelector
        )
      ), calculateProteinIntake(values.weight), calculateFatsIntake(calculateCaloricDeficit(calculateDailyCalories(
        values.age,
        values.weight,
        values.height,
        values.activityLevel,
        values.genderSelector
      )))));
      setSurplusCalories(calculateCaloricSurplus(calculateDailyCalories(
          values.age,
          values.weight,
          values.height,
          values.activityLevel,
          values.genderSelector
        )
      ))
      setSurplusFatsIntake(calculateFatsIntake(calculateCaloricSurplus(calculateDailyCalories(
        values.age,
        values.weight,
        values.height,
        values.activityLevel,
        values.genderSelector
      )
    )));
      setSurplusCarbsIntake(calculateCarbsIntake(calculateCaloricSurplus(calculateDailyCalories(
        values.age,
        values.weight,
        values.height,
        values.activityLevel,
        values.genderSelector
      )
    ), calculateProteinIntake(values.weight), calculateFatsIntake(calculateCaloricSurplus(calculateDailyCalories(
      values.age,
      values.weight,
      values.height,
      values.activityLevel,
      values.genderSelector
    )
  ))))
      
    },
  });

  return (<>
    <CalculatorAreaStyled>
      <form onSubmit={formik.handleSubmit}>
        <div className='header'>
          BMR
        </div>
        <div className='flexsur'>
        <div className='inputs'>
        <div className='halfInput'>
        <InputField
          name="age"
          type="number"
          placeholder="years"
          id="age"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        <label className='descriptionBox'>Age:</label>
        {formik.touched.age && formik.errors.age?<div className='error'>{formik.errors.age}</div>: null}
        </div>
        
        <div className='halfInput'>
        <InputField
          name="weight"
          type="number"
          placeholder={weightUnit}
          id="weight"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.weight}
        />
        <div className='decriptionUnit'>
        <label className='descriptionBox'>Weight:</label>
        <ButtonStyled type='button' name='weightUnits' onClick={handleWeigthUnits} className='unitBtn'>{weightUnit}</ButtonStyled>
        </div>
        {formik.touched.weight && formik.errors.weight?<div className='error'>{formik.errors.weight}</div>: null}
        </div>
        <div className='halfInput'>
        <InputField
          name="height"
          type="number"
          placeholder={heightUnit}
          id="height"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.height}
        /><div className='decriptionUnit'>
       <label className='descriptionBox'>Height:</label>
       <ButtonStyled type='button' name='heightUnits' onClick={handleHeightUnits} className='unitBtn'>{heightUnit}</ButtonStyled>
       </div>
       {formik.touched.height && formik.errors.height?<div className='error'>{formik.errors.height}</div>: null}
       </div>
       </div>
       <div className='genderBox'>
          <RadioButton
            name="genderSelector"
            id="maleRadioBtn"
            checked={formik.values.genderSelector === "male"}
            onChange={formik.handleChange}
            value={"male"}
          >
            Male
          </RadioButton>
          <RadioButton
            name="genderSelector"
            id="femaleRadioBtn"
            checked={formik.values.genderSelector === "female"}
            onChange={formik.handleChange}
            value={"female"}
          >
            Female
          </RadioButton>
          {formik.touched.genderSelector && formik.errors.genderSelector?<div className='error'>{formik.errors.genderSelector}</div>: null}
        </div>
        </div>
        <div className='bottomBtns'>
        <OptionSelector
          id="activityLevel"
          name="activityLevel"
          onChange={formik.handleChange}
          value={formik.values.activityLevel}
        />
        <ButtonStyled type="submit" className="calculateResultBtn">
          Calculate
        </ButtonStyled>
        </div>
      </form>
    </CalculatorAreaStyled>
      <Results calories={maintanenceCalories} protein={proteinIntake} fats={fatsIntake} carbs={carbsIntake}>
          Maintenance:
      </Results>
      <Results calories={defecitCalories} protein={proteinIntake} fats={defecitFatsIntake} carbs={defecitCarbsIntake}>
          Deficit:
      </Results>
      <Results calories={surplusCalories} protein={proteinIntake} fats={surplusFatsIntake} carbs={surplusCarbsIntake}>
          Surplus:
      </Results>
    </>
  );
};

export default CalculatorArea;
