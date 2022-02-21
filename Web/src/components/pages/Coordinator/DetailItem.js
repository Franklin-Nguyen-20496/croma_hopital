import React from 'react';

import { Switch, FormLabel } from '@mui/material';

const DetailItem = ({ title, checked }) => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    minWidth: '20rem',
                }}
                className="mb-2 ml-1 mr-1"
            >
                <FormLabel > {title} </FormLabel>
                <Switch checked={checked ? true : false} color="primary" />
            </div>

        </>
    );
}

export default DetailItem;
