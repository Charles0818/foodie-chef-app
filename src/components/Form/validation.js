import { useState } from 'react';

export const useFormInput = (name, value) => {
  const [input, setInput] = useState(value ? value : '');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(value && /^[A-Za-z0-9 _]/.test(value) ? true : false);
  console.log(isValid, error, input)
  const handleUserInput = (value) => {
    setInput(value);
    setIsValid(FormValidation(name, value, setError))
  };
  return { input, handleUserInput, error, isValid, setError }
}

export const useFileInput = () => {
const [ file, setFile ] = useState(null);
const [ fileUrl, setFileUrl ] = useState(null);
const handleFile = (event) => {
  const { target: {  files } } = event;
  setFileUrl(URL.createObjectURL(files[0]));
  setFile(files[0])()
}
return { handleFile, file, fileUrl }
}

const validateWithRegex = (value, regex) => {
  const isValid = regex.test(value) && /^[A-Za-z0-9 _]/.test(value)
  return isValid
}

const validateLength = (value, min, max) => {
  if (max) return value.length > 0 && value.length <= max;
  if(min) return value.length > 0 && value.length >= min;
  if(min && max) return value.length > 0 && value.length >= min && value.length <= max;
  return value.length > 0
}

const FormValidation = (name, value, setError) => {
  const { validateWithLuhn, validateCardExpiryDate } = creditCardValidation();
  const input_types = {
    email: /^([a-zA-Z\d-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d][\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{7,}$/,
    phone:/^[0-9\.\-\/\(\)]+$/,
    date:/^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
    CC_date: /^(0?[1-9]|1[0-2])[/](\d{2})$/,
    CC_holderName: /^([a-zA-Z]{3,}) ([a-zA-Z]{3,})$/,
    text: /^[a-zA-Z]+$/,
    alphanumeric: /^[A-Za-z0-9 _]/
  }
  const errorMessage = {
    emailErr: "Email should contain '@' and at least one '.'",
    passwordErr: 'Password must be at least 8 characters, containing alphanumerics',
    name: "Name must contain only alphabelts",
    usernameErr: "username must contain only alphabelts",
    subject: 'Subject should contain only alphanumeric characters',
    message: 'Message should contain only alphaNumeric characters',
    dateErr: 'Invalid date format!',
    phoneErr: 'Incorrect phone number',
    CC_dateErr: 'Invalid expiry date',
    CC_digitsErr: 'Invalid card number',
  };
  Object.freeze([input_types, errorMessage])

  const { emailErr, subject, dateErr, passwordErr, phoneErr, usernameErr, CC_digitsErr, CC_dateErr } = errorMessage;
  const { email, text, date, password, phone, alphanumeric } = input_types;
  let isValid = null;

  switch(name) {
    case 'email' :
      isValid = validateWithRegex(value, email) && validateLength(value);
      !isValid ? setError(emailErr) : setError('')
      return isValid
    case 'name': 
      isValid = validateWithRegex(value, text) && validateLength(value);
      !isValid ? setError(errorMessage.name) : setError('')
      return isValid;
    case 'username': 
      isValid = validateWithRegex(value, text) && validateLength(value);
      !isValid ? setError(usernameErr) : setError('')
      return isValid;
    case 'subject':
      isValid = validateWithRegex(value, text) && validateLength(value)
      !isValid ? setError(subject) : setError('')
      return isValid;
    case 'password':
      isValid = validateWithRegex(value, password) && validateLength(value, 8)
      !isValid ? setError(passwordErr) : setError('')
      return isValid;
    case 'phone':
      isValid = validateWithRegex(value, phone) && validateLength(value, null, 15)
      !isValid ? setError(phoneErr) : setError('')
      return isValid;
    case 'date':
      isValid = validateWithRegex(value, date) && validateLength(value)
      !isValid ? setError(dateErr) : setError('')
      return isValid;
    case 'CC-digits':
      isValid = validateWithLuhn(value)
      !isValid ? setError(CC_digitsErr) : setError('')
      return isValid;
    case 'Expiry date':
      isValid = validateCardExpiryDate(value)
      !isValid ? setError(CC_dateErr) : setError('')
      return isValid
    default:
      isValid = validateWithRegex(value, alphanumeric) && validateLength(value)
      !isValid ? setError(`${name} is invalid `) : setError('')
      return isValid;
  }
}

export const creditCardValidation = () => {

  const validateWithLuhn = (digits)=> {
    let sumDigits = 0;
    if(digits.length === 16) {
    for(let i = digits.length - 1, doubledDigit; i>=0; --i){
      if(isNaN(digits[i])){
        return false
      }
      doubledDigit = i % 2 ? digits[i] : digits[i] * 2;
      sumDigits += doubledDigit > 9 ? doubledDigit - 9 : doubledDigit; 
    }
    return !(sumDigits % 10);
    }else{
      return false
    }
  };

  const validateCardExpiryDate = (value) => {
    console.log(value);
    let isValid = /^(0?[1-9]|1[0-2])[/](\d{2})$/.test(value);
    let splitDate = value.split('/');
    let [month, year] = splitDate;
    year = `20${year}`
    const currentDate = new Date();
    const currentMonth = currentDate.getUTCMonth();
    const currentYear = currentDate.getFullYear();
    if(isValid && (Number(year) > currentYear || (Number(month) > currentMonth && Number(year) === currentYear))) {
      isValid = true
    }else{
      isValid = false;
    }
    return isValid;
  };

  return { validateCardExpiryDate, validateWithLuhn }

  // const validateCardNumber = ()=> {
  //   const field = document.querySelector('[data-cc-digits]');
  //   const digits = appState.cardDigits.flat();
  //   let isValid = validateWithLuhn(digits);
  //   flagIfInvalid(field, isValid);
  //   return isValid;
  // };
};

export default FormValidation;