import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PollUserItem = ({ id, user }, key) => {
    const [myUser, setMyUser] = useState('')

    useEffect(() => {
        if (user) {
            setMyUser(user)
        }
        else {
            axios({
                method: 'get',
                url: `/users/id/${id}`
            })
                .then(res => {
                    if (res.data.data) {
                        setMyUser(res.data.data);
                    }
                    else console.warn(res.data.message);
                })
        }
    }, [id, user])

    return (
        myUser &&
        <div
            className="d-flex align-items-center mb-1"
            key={key}
        >
            <div
                style={{
                    backgroundImage: `url(${myUser.file ? myUser.file : process.env.REACT_APP_DEFAULT_IMG})`,
                    ...imageStyle
                }}
                className="br-full"
            >
            </div>
            <div style={{ flex: 1 }} className="ml-1">
                <p>{myUser.name}</p>
            </div>

        </div>
    );
}

const imageStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '4rem',
    paddingBottom: '4rem',
}

export default PollUserItem;
