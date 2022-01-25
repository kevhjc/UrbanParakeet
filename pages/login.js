import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import styles from '../styles/Home.module.css';
import { strictEqual } from 'assert';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, { expires: 2 });
          Router.push('/');
        }
      });
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <p className={styles.description}>Welcome back 👋</p>
        <input
          name='email'
          type='email'
          value={email}
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
          className={styles.loginInput}
        />

        <input
          name='password'
          type='password'
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          className={styles.loginInput}
        />

        <br />

        <input type='submit' value='Login' className={styles.submitButton} />
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;
