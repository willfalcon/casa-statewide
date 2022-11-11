import classNames from 'classnames';
import React, { useState } from 'react';
import styled from 'styled-components';
import Content from '../Content';
import { useSiteContext } from '../Wrapper';
import ErrorMessage from './ErrorMessage';
import FieldSwitcher from './FieldSwitcher';

const Form = props => {
  const { title, description, formBuilder, successMessage, submitText, className } = props;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { webFormAccessKey } = useSiteContext();

  return (
    <FormWrapper className={classNames(className, 'form')}>
      <Content className="form__description">{description}</Content>
      <form
        className="form__form"
        action="https://api.web3forms.com/submit"
        method="POST"
        onSubmit={e => {
          setLoading(true);
          setError(null);
          e.preventDefault();
          const formData = new FormData(e.target);
          let object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);

          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: json,
          })
            .then(async response => {
              let json = await response.json();
              if (response.status == 200) {
                setSuccess(true);
              } else {
                console.log(json);
                setError(json.message);
              }
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
              setError(error);
            })
            .then(() => {
              // reset form
              e.target.reset();
            });
        }}
      >
        <fieldset disabled={loading}>
          <input type="hidden" name="access_key" value={webFormAccessKey} />
          <input type="hidden" name="subject" value={`New submission from form: ${title}`} />
          <input type="hidden" name="from_name" value="CASA Statewide" />

          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          {formBuilder.map(field => (
            <FieldSwitcher key={field._key} field={field} />
          ))}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
            <button type="submit" className="button">
              {submitText || 'Submit'}
            </button>
          </div>
        </fieldset>
        {success && <p className="success">{successMessage}</p>}
        {error && <ErrorMessage error={error} />}
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  fieldset {
    padding: 0;
    margin: 0;
    border: 0;
  }
  .form {
    &__form {
      padding-bottom: 40px;
      position: relative;
    }
    &__description {
      font-weight: ${({ theme }) => theme.font.medium};
      color: ${({ theme }) => theme.blue};
      font-size: 2rem;
      padding: 1rem 2rem;
    }
  }
  .success,
  .error {
    margin-bottom: 0;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`;

export default Form;
