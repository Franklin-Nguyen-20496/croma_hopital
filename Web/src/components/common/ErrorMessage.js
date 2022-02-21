import React from 'react';
import clsx from 'clsx';

const ErrorMsg = ({ children, moreClass }) => {

    return (
        <div className={clsx('text-red fs-12', moreClass)}>{children}</div>
    );
}

export default ErrorMsg;
