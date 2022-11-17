import React, { useState } from 'react';
// import styled from 'styled-components';

import Label, { FieldWrapper } from './Label';
import { useFocusState } from './formUtils';
import ErrorMessage from './ErrorMessage';

const SelectField = ({ name, options, fieldOptions, error }) => {
  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  const description = fieldOptions && fieldOptions.description ? fieldOptions.description : false;
  const adminLabel = fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;
  const fieldName = adminLabel ? adminLabel : name;

  const [selected, setSelected] = useState(null);
  const { focused, handleFocus, handleBlur } = useFocusState();

  // console.log({ selected });
  return (
    <FieldWrapper halfWidth={halfWidth} className="select-field-wrapper">
      <Label className="field-text select-field-label" htmlFor={fieldName} halfWidth={halfWidth} isFocused={focused}>
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <select
          className="select-field"
          name={fieldName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={e => setSelected(e.target.value)}
          value={selected}
          required={required}
        >
          <option value={''}></option>
          {options.map((option, i) => {
            const label = option.label ? option.label : option;
            const value = option.value ? option.value : option;
            return (
              <option value={value} key={value}>
                {label}
              </option>
            );
          })}
        </select>
      </Label>
      {description && <p className="field-description">{description}</p>}
      {error && <ErrorMessage className="error--select-field" {...error} />}
    </FieldWrapper>
  );
};

export default SelectField;
