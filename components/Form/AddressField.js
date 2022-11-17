import React from 'react';
import styled from 'styled-components';

import TextField from './TextField';
import SelectField from './SelectField';
import states from './states';
import { useFormContext } from './formUtils';
import ErrorMessage from './ErrorMessage';

const AddressField = ({ name, fieldOptions, error }) => {
  const required = fieldOptions && fieldOptions.required ? fieldOptions.required : false;
  const halfWidth = fieldOptions && fieldOptions.halfWidth ? fieldOptions.halfWidth : false;
  const description = fieldOptions && fieldOptions.description ? fieldOptions.description : false;
  const adminLabel = fieldOptions && fieldOptions.adminLabel ? fieldOptions.adminLabel : false;
  const fieldName = adminLabel ? adminLabel : name;

  return (
    <>
      <Address className="field-text field-address" halfWidth={halfWidth}>
        <span className="label-text complex-field-label">
          {name}
          {required && '*'}
        </span>
        <TextField
          name={`Address Line 1`}
          fieldOptions={{ adminLabel: `${fieldName} - Address Line 1` }}
          // register={register}
        />
        <TextField
          name={`Address Line 2`}
          fieldOptions={{ adminLabel: `${fieldName} - Address Line 2` }}
          // register={register}
        />
        <TextField
          name={`City`}
          fieldOptions={{ halfWidth: true, adminLabel: `${fieldName} - City` }}
          // register={register}
        />
        <SelectField
          name={`State`}
          fieldOptions={{
            halfWidth: true,
            adminLabel: `${fieldName} - State`,
          }}
          options={states}
          // register={register}
        />
        <TextField
          name={`Zip`}
          fieldOptions={{ halfWidth: true, adminLabel: `${fieldName} - Zip` }}
          // register={register}
        />
      </Address>
      {description && <p className="field-description">{description}</p>}
      {error && <ErrorMessage className="error--address-field" {...error} />}
    </>
  );
};

const Address = styled.div`
  @supports (display: grid) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-gap: 1rem;
  }
`;

export default AddressField;
