import React, { useState } from 'react';
// import camelCase from 'camelcase';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const TextField = ({ name, fieldOptions, error, _type }) => {
  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  const adminLabel = fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;

  // Focus State
  const [focused, setFocus] = useState(false);
  const handleFocus = e => {
    setFocus(true);
  };
  const handleBlur = e => {
    if (!e.target.value) {
      setFocus(false);
    }
  };

  const nameSlug = adminLabel ? slugify(adminLabel) : slugify(name);
  return (
    <>
      <Label className="field-text" isFocused={focused} htmlFor={nameSlug} halfWidth={halfWidth}>
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
    </>
  );
};

export default TextField;
