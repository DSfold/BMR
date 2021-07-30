import React from "react";
import { options } from "./constants";
import { OptionSelectorStyled } from "./styles";

const OptionSelector = ({ children, ...props }) => {
  return (
    <>
      <OptionSelectorStyled {...props} required>
        {options.map(({ label, value }, idx) => (
          <option key={idx} value={value}>
            {label}
          </option>
        ))}
      </OptionSelectorStyled>
    </>
  );
};

export default OptionSelector;
