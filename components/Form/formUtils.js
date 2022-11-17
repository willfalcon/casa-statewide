import React, { createContext, useState, useContext } from 'react';

const useFocusState = (type = 'default') => {
  const [focused, setFocus] = useState(false);
  const handleFocus = e => {
    setFocus(true);
  };
  const handleBlur = e => {
    if (type === 'date') {
      if (e[0].target.tagName === 'INPUT') {
        if (!e[0].target.value) {
          setFocus(false);
        }
      }
    } else {
      if (!e.target.value) {
        setFocus(false);
      }
    }
  };

  // date field
  // const [focused, setFocus] = useState(false);
  // const handleFocus = e => {
  //   setFocus(true);
  // };
  // const handleBlur = e => {
  //   if (e[0].target.tagName === 'INPUT') {
  //     if (!e[0].target.value) {
  //       setFocus(false);
  //     }
  //   }
  // };

  return { focused, setFocus, handleFocus, handleBlur };
};

const FormContext = createContext();

const FormContextProvider = ({ value, children }) => {
  // console.log({ values: value.control.getValues() });
  return (
    <FormContext.Provider value={{ ...value }}>{children}</FormContext.Provider>
  );
};

const useFormContext = () => useContext(FormContext);

export { FormContextProvider, useFormContext, useFocusState };
