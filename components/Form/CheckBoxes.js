import React, { useState } from 'react';
import styled from 'styled-components';

import Label, { FieldWrapper } from './Label';

import ErrorMessage from './ErrorMessage';

const CheckBoxes = ({ name, options, fieldOptions, error }) => {
  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;

  const description = fieldOptions && fieldOptions.description ? fieldOptions.description : false;
  const adminLabel = fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;
  const fieldName = adminLabel ? adminLabel : name;
  const [checked, setChecked] = useState([]);

  const toggleChecked = i => {
    if (!checked.includes(i)) {
      setChecked([...checked, i]);
    } else {
      setChecked(checked.filter(x => x !== i));
    }
  };

  return (
    <FieldWrapper halfWidth={halfWidth} className="checkboxes-wrapper">
      <Label className="checkboxes" htmlFor={fieldName} halfWidth={halfWidth}>
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <CheckboxesContainer className="checkboxes-container" halfWidth={halfWidth}>
          {options.map((option, i) => (
            <span className="checkbox-wrapper" key={option} onClick={() => toggleChecked(i)}>
              <input
                onChange={() => toggleChecked(i)}
                className="checkbox"
                type="checkbox"
                checked={checked.includes(i)}
                name={fieldName}
                value={option}
                required={required}
              />
              <span className="checkbox-option-label">{option}</span>
            </span>
          ))}
        </CheckboxesContainer>
      </Label>
      {description && <p className="field-description">{description}</p>}
      {error && <ErrorMessage className="error--checkboxes" {...error} />}
    </FieldWrapper>
  );
};

const CheckboxesContainer = styled.div`
  columns: ${({ halfWidth }) => (halfWidth ? 1 : 2)};
  padding: 1rem;
  .checkbox-wrapper {
    display: block;
    cursor: pointer;
    position: relative;
  }
  .checkbox {
    position: absolute;
    top: auto;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    width: 1px;
    height: 1px;
    white-space: nowrap;
  }

  .checkbox-option-label {
    display: block;
    font-size: 1.4rem;
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

      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .checkbox:focus + span {
    outline-color: ${({ theme }) => theme.blue};
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
  .checkbox:checked + span::before {
    background: ${({ theme }) => theme.blue};
  }
`;

export default CheckBoxes;
