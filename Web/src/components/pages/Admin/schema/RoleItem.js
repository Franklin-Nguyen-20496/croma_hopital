
import React, { useState } from 'react';
import clsx from 'clsx';

import UserItem from '../../../common/UserItem';

const RoleItem = (props) => {
    const {
        users,
        title,
    } = props;

    return (
        <div>
            {users.length !== 0 ? <h4 className="ml-2 mt-1 fs-16 fw-600">{title}</h4> : null}

            {
                <div className="row gap-10 p-1">
                    {
                        users.length !== 0 && (
                            <h4>{title}</h4> &&
                            users.map((user, index) => {
                                return (
                                    <div key={user._id}
                                        className={clsx('col-12 col-sm-6 col-md-4 col-lg-3 p-1 mb-2')}
                                    >
                                        <UserItem
                                            user={user}
                                        />
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            }
        </div>
    );
}

export default RoleItem;
