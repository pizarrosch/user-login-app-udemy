import React, {useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//functions for useReducer hook

// const emailReducer = (state, action) => {
//   if(action.type === 'USER_INPUT') {
//     return {value: action.val, isValid: action.val.includes('@')};
//   }
//   if(action.type === 'INPUT_BLUR') {
//     return {value: state.value, isValid: state.value.includes('@')};
//   }
// }
//
// const passwordReducer = (state, action) => {
//   if(action.type === 'USER_INPUT') {
//     return {value: action.val, isValid: action.val.length > 6}
//   }
//   if(action.type === 'INPUT_BLUR') {
//     return {value: state.value, isValid: state.value.length > 6}
//   }
// }

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //useReducer hook as analogy to useState hook, used to simplify the code if the states get complex, e.g. if two states relate to each other.
  //the initial state is usually in the form of an object, as normally two or more related states are used as object keys in this hook

  // const [emailState, dispatchEmail] = useReducer(emailReducer,
  //   {
  //     value: '',
  //     isValid: false,
  //   }
  //   );
  //
  // const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  //   value: '',
  //   isValid: false
  // })

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('check typing');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log('clean')
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    // dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setEnteredEmail(event.target.value);

    setFormIsValid(
      //while using useReducer hook 'emailState.value' is used instead of 'enteredEmail'
      //as well as 'passwordState.value' instead of 'enteredPassword'
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
  };


  const passwordChangeHandler = (event) => {
    // dispatchPassword({type: 'USER_INPUT', val: event.target.value})

    setEnteredPassword(event.target.value);

    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
   // dispatchEmail({type: 'INPUT_BLUR'})

    setEmailIsValid(enteredEmail.includes('@'))
  };

  const validatePasswordHandler = () => {
    // dispatchPassword({type: 'INPUT_BLUR'})

    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
