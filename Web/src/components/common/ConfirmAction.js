
import React from 'react';

import BackDrop from './BackDrop';
import Btn from './Btn';

const ConfirmAction = ({ children, onClick, onSubmit, show }) => {
    return (
        <BackDrop show={show}>
            <form
                onSubmit={onSubmit}
                className="bg-white p-2"
            >
                <p className="mb-2">{children}</p>
                <div className="d-flex justify-content-end">
                    <Btn
                        title="Hủy"
                        bgColor="bg-red"
                        onClick={onClick}
                        moreClass="mr-1"
                    />
                    <Btn
                        type="submit"
                        title="Đồng ý"
                    />
                </div>
            </form>
        </BackDrop>
    );
}

export default ConfirmAction;
