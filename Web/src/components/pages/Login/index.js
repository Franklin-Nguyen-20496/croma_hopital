import React from 'react';
// import clsx from 'clsx';

import LoginForm from './LoginForm';
import * as styles from './Login.module.scss';

const Login = () => {

    return (
        <div className={styles.loginContainer}>
            <hr className="mt-2 mb-2" />
            <h1 className="fw-500 fs-20">Đăng nhập</h1>
            <hr className="mt-2 mb-2" />

            <LoginForm></LoginForm>
        </div>
    );
}

export default Login;
