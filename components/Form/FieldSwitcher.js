import React from 'react';

import TextField from './TextField';

const FieldSwitcher = ({ field }) => {
  switch (field._type) {
    case 'textField':
    case 'emailField':
      return <TextField {...field} />;
  }
  return <div></div>;
};

export default FieldSwitcher;
