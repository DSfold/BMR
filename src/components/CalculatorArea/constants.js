import * as Yup from "yup";

export const schema = Yup.object().shape({
  age: Yup.string()
    .min(1, "Enter the valid value")
    .max(120, "Enter the valid value")
    .required("Required"),
  weight: Yup.string().min(1, "Enter the valid value").required("Required"),
  height: Yup.string().min(1, "Enter the valid value").required("Required"),
  genderSelector: Yup.string().required("Required"),
});

export const calculateCaloricDeficit = (dailyCalories) => dailyCalories - 400;
export const calculateCaloricSurplus = (dailyCalories) => dailyCalories + 400;
export const calculateProteinIntake = (weight) => weight * 2;
export const calculateFatsIntake = (dailyCalories) =>
  Math.round((dailyCalories * 0.25) / 9);
export const calculateCarbsIntake = (
  dailyCalories,
  proteinIntake,
  fatsIntake
) => Math.round((dailyCalories - (proteinIntake * 4 + fatsIntake * 9)) / 4);

export const calculateDailyCalories = ({
  weightMaleValue,
  heightMaleValue,
  weightFemaleValue,
  heightFemaleValue,
  age,
  weight,
  height,
  activityLevel,
  gender,
}) => {
  if (gender === "male") {
    return Math.round(
      (66 + weightMaleValue * weight + heightMaleValue * height - 6.755 * age) *
        activityLevel
    );
  } else {
    return Math.round(
      (655 +
        weightFemaleValue * weight +
        heightFemaleValue * height -
        4.7 * age) *
        activityLevel
    );
  }
};
