import React from 'react';
import dynamic from 'next/dynamic';

import PhoneField from './PhoneField';
import TextField from './TextField';
import AddressField from './AddressField';
import TextArea from './TextArea';
import CheckBoxes from './CheckBoxes';
import RadioButtons from './RadioButtons';
import SelectField from './SelectField';

const FieldSwitcher = ({ field }) => {
  switch (field._type) {
    case 'textField':
    case 'emailField':
      return <TextField {...field} />;
    case 'phoneField':
      return <PhoneField {...field} />;
    case 'addressField':
      return <AddressField {...field} />;
    case 'textArea':
      return <TextArea {...field} />;
    case 'checkBoxes':
      return <CheckBoxes {...field} />;
    case 'radioButtons':
      return <RadioButtons {...field} />;
    case 'select':
      return <SelectField {...field} />;
  }
  return <div></div>;
};

export default FieldSwitcher;
