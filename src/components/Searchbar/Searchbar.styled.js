import styled from 'styled-components';
import { Form, Field } from 'formik';

export const Header = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding: 12px 24px;
  color: white;
  background-color: #79ed0c;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 680px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
`;

export const SearchFormInput = styled(Field)`
  width: 100%;
  font: inherit;
  font-size: 35px;
  border: none;
  outline: none;
  padding: 2px 12px;
  ::placeholder {
    font: inherit;
    font-size: 20px;
  }
`;

export const SearchFormButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  border: 0;
  color: black;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  :hover {
    color: #79ed0c;
  }
`;

