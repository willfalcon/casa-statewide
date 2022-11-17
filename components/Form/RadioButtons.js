import React, { useState } from 'react';
import styled from 'styled-components';

import Label, { FieldWrapper } from './Label';
import ErrorMessage from './ErrorMessage';

const RadioButtons = ({ name, options, fieldOptions, error }) => {
  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  const description = fieldOptions && fieldOptions.description ? fieldOptions.description : false;
  const adminLabel = fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;
  const fieldName = adminLabel ? adminLabel : name;
  const [checked, setChecked] = useState(null);

  return (
    <FieldWrapper halfWidth={halfWidth} className="radio-buttons-wrapper">
      <Label className="radiobuttons" htmlFor={fieldName} halfWidth={halfWidth}>
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <RadioButtonsContainer className="radio-buttons-container" halfWidth={halfWidth}>
          {options.map((option, i) => (
            <span className="radio-button-wrapper" key={option} onClick={() => setChecked(i)}>
              <input
                onChange={() => setChecked(i)}
                className="radio-button"
                type="radio"
                checked={checked === i}
                name={fieldName}
                value={option}
              />
              <span className="radio-button-option-label">{option}</span>
            </span>
          ))}
        </RadioButtonsContainer>
      </Label>
      {description && <p className="field-description">{description}</p>}
      {error && <ErrorMessage className="error--radio-buttons" {...error} />}
    </FieldWrapper>
  );
};

const RadioButtonsContainer = styled.div`
  columns: ${({ halfWidth }) => (halfWidth ? 1 : 2)};
  padding: 1rem;
  .radio-button-wrapper {
    display: block;
    cursor: pointer;
  }
  .radio-button {
    position: absolute;
    top: auto;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    width: 1px;
    height: 1px;
    white-space: nowrap;
  }

  .radio-button-option-label {
    display: block;
    font-size: 1.4rem;
    /* font-weight: ${({ theme }) => theme.font.demibold}; */
    padding: 0.5rem;
    padding-left: 2rem;
    position: relative;

    ::before {
      content: '';
      background: transparent;
      border: 1px solid ${({ theme }) => theme.blue};
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 100%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .radio-button:focus + span {
    outline-color: ${({ theme }) => theme.blue};
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
  .radio-button:checked + span::before {
    background: ${({ theme }) => theme.blue};
  }
`;
export default RadioButtons;
