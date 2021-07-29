import React, { useCallback, useState } from "react";
import InputField from "../InputField/InputField";
import OptionSelector from "../OptionSelector/OptionSelector";
import RadioButton from "../RadioButton/RadioButton";
import { CalculatorAreaStyled, ButtonStyled } from "./styles";
import { useFormik } from "formik";
import Results from "../Results/Results";
import {
  calculateCaloricDeficit,
  calculateCaloricSurplus,
  calculateCarbsIntake,
  calculateFatsIntake,
  calculateProteinIntake,
  calculateDailyCalories,
  schema,
} from "./constants";

const CalculatorArea = (props) => {
  const [state, setState] = useState({
    maintanenceCalories: 0,
    proteinIntake: 0,
    fatsIntake: 0,
    carbsIntake: 0,
    defecitCalories: 0,
    defecitCarbsIntake: 0,
    defecitFatsIntake: 0,
    surplusCalories: 0,
    surplusCarbsIntake: 0,
    surplusFatsIntake: 0,
    heightUnit: "cm",
    weightUnit: "kg",
    heightMaleValue: 4.799,
    heightFemaleValue: 3.098,
    weightMaleValue: 13.75,
    weightFemaleValue: 9.247,
  });

  const {
    heightUnit,
    weightUnit,
    maintanenceCalories,
    proteinIntake,
    fatsIntake,
    carbsIntake,
    defecitCalories,
    defecitCarbsIntake,
    defecitFatsIntake,
    surplusCalories,
    surplusCarbsIntake,
    surplusFatsIntake,
  } = state;

  const handleSetValues = useCallback(
    (values = []) => {
      setState({
        ...state,
        ...values.reduce(
          (acc, [field, value]) => ({ ...acc, [field]: value }),
          {}
        ),
      });
    },
    [state]
  );

  const handleHeightUnits = useCallback(() => {
    switch (heightUnit) {
      case "cm":
        handleSetValues([
          ["heightUnit", "inches"],
          ["heightMaleValue", 12.7],
          ["heightFemaleValue", 4.7],
        ]);
        break;
      default:
        handleSetValues([
          ["heightUnit", "cm"],
          ["heightMaleValue", 5.003],
          ["heightFemaleValue", 3.098],
        ]);
    }
  }, [heightUnit, handleSetValues]);

  const handleWeigthUnits = useCallback(() => {
    switch (weightUnit) {
      case "kg":
        handleSetValues([
          ["weightUnit", "lbs"],
          ["weightMaleValue", 6.2],
          ["weightFemaleValue", 4.35],
        ]);
        break;
      default:
        handleSetValues([
          ["weightUnit", "kg"],
          ["weightMaleValue", 13.75],
          ["weightFemaleValue", 9.247],
        ]);
    }
  }, [weightUnit, handleSetValues]);

  const formik = useFormik({
    initialValues: {
      age: "",
      weight: "",
      height: "",
      genderSelector: "",
      activityLevel: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const { age, weight, height, activityLevel, genderSelector } = values;
      const {
        weightMaleValue,
        heightMaleValue,
        weightFemaleValue,
        heightFemaleValue,
      } = state;
      const dailyCalories = calculateDailyCalories({
        age,
        weight,
        height,
        activityLevel,
        genderSelector,
        weightMaleValue,
        heightMaleValue,
        weightFemaleValue,
        heightFemaleValue,
      });
      const fatsIntake = calculateFatsIntake(dailyCalories);
      const proteinIntake = calculateProteinIntake(weight);
      const caloricDeficit = calculateCaloricDeficit(dailyCalories);
      const caloricSurplus = calculateCaloricSurplus(dailyCalories);
      handleSetValues([
        ["maintanenceCalories", dailyCalories],
        ["fatsIntake", fatsIntake],
        ["proteinIntake", proteinIntake],
        [
          "carbsIntake",
          calculateCarbsIntake(dailyCalories, proteinIntake, fatsIntake),
        ],
        ["defecitCalories", caloricDeficit],
        ["defecitFatsIntake", calculateFatsIntake(caloricDeficit)],
        [
          "deficitCarbsIntake",
          calculateCarbsIntake(caloricDeficit, proteinIntake, fatsIntake),
        ],
        ["surplusCalories", caloricSurplus],
        ["surplusFatsIntake", calculateFatsIntake(caloricSurplus)],
        [
          "surplusCarbsIntake",
          calculateCarbsIntake(caloricSurplus, proteinIntake, fatsIntake),
        ],
      ]);
    },
  });

  return (
    <>
      <CalculatorAreaStyled>
        <form onSubmit={formik.handleSubmit}>
          <div className="header">BMR</div>
          <div className="flexsur">
            <div className="inputs">
              <div className="halfInput">
                <InputField
                  name="age"
                  type="number"
                  placeholder="years"
                  id="age"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                />
                <label className="descriptionBox">Age:</label>
                {formik.touched.age && formik.errors.age ? (
                  <div className="error">{formik.errors.age}</div>
                ) : null}
              </div>

              <div className="halfInput">
                <InputField
                  name="weight"
                  type="number"
                  placeholder={weightUnit}
                  id="weight"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.weight}
                />
                <div className="decriptionUnit">
                  <label className="descriptionBox">Weight:</label>
                  <ButtonStyled
                    type="button"
                    name="weightUnits"
                    onClick={handleWeigthUnits}
                    className="unitBtn"
                  >
                    {weightUnit}
                  </ButtonStyled>
                </div>
                {formik.touched.weight && formik.errors.weight ? (
                  <div className="error">{formik.errors.weight}</div>
                ) : null}
              </div>
              <div className="halfInput">
                <InputField
                  name="height"
                  type="number"
                  placeholder={heightUnit}
                  id="height"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.height}
                />
                <div className="decriptionUnit">
                  <label className="descriptionBox">Height:</label>
                  <ButtonStyled
                    type="button"
                    name="heightUnits"
                    onClick={handleHeightUnits}
                    className="unitBtn"
                  >
                    {heightUnit}
                  </ButtonStyled>
                </div>
                {formik.touched.height && formik.errors.height ? (
                  <div className="error">{formik.errors.height}</div>
                ) : null}
              </div>
            </div>
            <div className="genderBox">
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
              {formik.touched.genderSelector && formik.errors.genderSelector ? (
                <div className="error">{formik.errors.genderSelector}</div>
              ) : null}
            </div>
          </div>
          <div className="bottomBtns">
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
      <Results
        calories={maintanenceCalories}
        protein={proteinIntake}
        fats={fatsIntake}
        carbs={carbsIntake}
      >
        Maintenance:
      </Results>
      <Results
        calories={defecitCalories}
        protein={proteinIntake}
        fats={defecitFatsIntake}
        carbs={defecitCarbsIntake}
      >
        Deficit:
      </Results>
      <Results
        calories={surplusCalories}
        protein={proteinIntake}
        fats={surplusFatsIntake}
        carbs={surplusCarbsIntake}
      >
        Surplus:
      </Results>
    </>
  );
};

export default CalculatorArea;
