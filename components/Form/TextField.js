import React, { useState } from 'react';
// import camelCase from 'camelcase';

import Label, { FieldWrapper } from './Label';
import ErrorMessage from './ErrorMessage';
import { useFocusState, useFormContext } from './formUtils';

const TextField = ({ name, fieldOptions, error, _type }) => {
  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  const adminLabel = fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;

  // Focus State
  const { focused, handleFocus, handleBlur } = useFocusState();

  const nameSlug = adminLabel ? adminLabel : name;

  return (
    <FieldWrapper halfWidth={halfWidth} className="text-field-wrapper">
      <Label className="field-text" isFocused={focused} htmlFor={nameSlug}>
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <input
          className="text-input"
          type={_type === 'emailField' ? 'email' : 'text'}
          name={nameSlug}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
        />
      </Label>
      {error && <ErrorMessage error={error} />}
    </FieldWrapper>
  );
};

export default TextField;
