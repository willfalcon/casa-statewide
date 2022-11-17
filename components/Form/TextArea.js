import React from 'react';
// import camelCase from 'camelcase';

import Label, { FieldWrapper } from './Label';
import { useFocusState } from './formUtils';
import ErrorMessage from './ErrorMessage';

const TextArea = ({ name, fieldOptions, error }) => {
  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  const description = fieldOptions && fieldOptions.description ? fieldOptions.description : false;
  const adminLabel = fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;
  const fieldName = adminLabel ? adminLabel : name;

  // Focus State
  const { focused, handleFocus, handleBlur } = useFocusState();

  return (
    <FieldWrapper halfWidth={halfWidth} className="text-area-wrapper">
      <Label className="field-text field-textarea" isFocused={focused} htmlFor={fieldName} halfWidth={halfWidth}>
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <textarea className="text-area" name={fieldName} onFocus={handleFocus} onBlur={handleBlur} required={required} />
      </Label>
      {description && <p className="field-description">{description}</p>}
      {error && <ErrorMessage className="error--text-area" {...error} />}
    </FieldWrapper>
  );
};

export default TextArea;
