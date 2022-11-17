import classNames from 'classnames';
import React, { useState } from 'react';
import styled from 'styled-components';
// import { useFormspark } from '@formspark/use-formspark';
import Content from '../Content';
import { media } from '../theme';
import { useSiteContext } from '../Wrapper';
import ErrorMessage from './ErrorMessage';
import FieldSwitcher from './FieldSwitcher';

const Form = props => {
  const { title, formId, description, formBuilder, successMessage, submitText, className } = props;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    });

    if (res.error) {
      setError(res.message);
    } else {
      setSuccess(true);
      form.reset();
    }
    setLoading(false);
  }

  return (
    <FormWrapper
      className={classNames(className, 'form')}
      data-netlify="true"
      netlify-honeypot="botcheck"
      id={formId}
      name={title}
      method="POST"
      onSubmit={handleSubmit}
    >
      <h2 className="form__title">{title}</h2>
      <Content className="form__description">{description}</Content>
      <fieldset disabled={loading}>
        <div className="fieldset-flex-fix">
          <input name="botcheck" className="hidden" style={{ display: 'none' }} />
          <input type="hidden" name="form-name" value={title} />
          {formBuilder.map(field => (
            <FieldSwitcher key={field._key} field={field} />
          ))}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
            <button type="submit" className="button" disabled={loading}>
              {submitText || 'Submit'}
            </button>
          </div>
        </div>
      </fieldset>
      {success && <p className="success">{successMessage}</p>}
      {error && <ErrorMessage error={error} />}
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  fieldset {
    border: 0;
    padding: 0;
  }
  @supports (display: grid) {
    .fieldset-flex-fix {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;
      grid-gap: 1rem;
    }
  }
  .form {
    &__submit {
      justify-self: start;
      -webkit-appearance: none;
      border-radius: 0px;
      grid-column: span 2;
      margin-right: 1rem;
    }
  }
  .field-address {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }
  .complex-field-label {
    /* font-family: synthese, sans-serif; */
    /* font-family: ${({ theme }) => theme.font.heading}; */
    font-size: 1.8rem;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
    line-height: 2.15;
    margin: 0 0 0.5rem;
    /* font-size: 1.4rem; */
    text-transform: uppercase;
    display: block;
    grid-column: span 2;
    width: 50%;
    ::after {
      content: '';
      width: 100%;
      height: 1px;
      background: ${({ theme }) => theme.orange};
      display: block;
    }
  }
  ${media.break`

  `}
  .honeypot {
    display: none;
  }
`;

export default Form;
