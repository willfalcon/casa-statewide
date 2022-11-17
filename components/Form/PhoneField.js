import React from 'react';

import Label, { FieldWrapper } from './Label';
import { useFocusState } from './formUtils';
import ErrorMessage from './ErrorMessage';

const PhoneField = ({ name, fieldOptions, error, _type }) => {
  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  const description = fieldOptions && fieldOptions.description ? fieldOptions.description : false;
  const adminLabel = fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;
  const fieldName = adminLabel ? adminLabel : name;

  const { focused, handleFocus, handleBlur } = useFocusState();

  return (
    <FieldWrapper halfWidth={halfWidth} className="text-field-wrapper">
      <Label className="field-text field-phone" isFocused={focused} htmlFor={fieldName}>
        <span className="label-text">
          {name}
          {required && '*'}
        </span>
        <input className="text-input" type="tel" name={fieldName} onFocus={handleFocus} onBlur={handleBlur} required={required} />
      </Label>
      {description && <p className="field-description">{description}</p>}
      {error && <ErrorMessage className="error--file-upload" {...error} />}
    </FieldWrapper>
  );
};

export default PhoneField;
