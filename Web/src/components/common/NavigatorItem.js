import React from 'react';

const NavigatorItem = ({ children }, key) => {
    return (
        <div key={key}
            className="d-none d-sm-block"
            style={{
                width: '100%',
            }}
        >
            {children}
        </div>
    );
}

export default NavigatorItem;
