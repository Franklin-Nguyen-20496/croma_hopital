import React from 'react';

const ErrorMsg = ({ children }) => {

    return (
        <div className="error fs-12">{children}</div>
    );
}

export default ErrorMsg;
