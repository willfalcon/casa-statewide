import classNames from 'classnames';
import styled from 'styled-components';

import { grid } from '../theme';

export const FieldWrapper = styled.span.attrs(({ halfWidth }) => ({
  className: classNames('field-wrapper', { halfWidth }),
}))`
  width: 100%;
  height: 100%;
  position: relative;
  /* display: inline; */
  @supports (display: grid) {
    grid-column: ${({ halfWidth }) => (halfWidth ? 'span 1' : 'span 2')};
  }
`;

const Label = styled.label`
  display: block;
  position: relative;
  width: 100%;
  height: 50px;
  .label-text {
    text-transform: uppercase;
    font-weight: bold;
    color: ${({ theme }) => theme.lightGray};
    font-size: 1.4rem;
    position: absolute;
    transition: 0.15s;
    top: 0;
    /* top: ${({ isFocused }) => (isFocused ? '0%' : '50%')}; */
    transform-origin: left;
    transform: ${({ isFocused }) => (isFocused ? 'translateY(0) scale(.85)' : 'translateY(15px) scale(1)')};
    left: 1rem;
    height: 20px;
  }
  input,
  select,
  textarea {
    border: 1px solid ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
    border-radius: 0;
    padding: 1.5rem 1rem;
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
    padding-top: 2rem;
  }
  select {
    padding: 1.5rem 1rem;
  }

  &.checkboxes,
  &.radiobuttons,
  &.date-label,
  &.field-time {
    height: auto;
    .label-text {
      position: relative;
    }
  }
`;

export default Label;
