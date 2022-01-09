import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// import Header from './Header';
import Navigator from '../../common/Navigator';
import NavigatorItem from '../../common/NavigatorItem';
import BtnNav from '../../common/BtnNav';
import * as styles from './patient.module.scss';

const buttons = [
    {
        id: 1,
        title: 'Đăng ký khám bệnh',
        navigate: '/patient/register',
    },
    {
        id: 2,
        title: 'Tra cứu thông tin',
        navigate: '/patient/info',
    }
]

const Patient = () => {
    const navigate = useNavigate();

    const [selected, setSelected] = useState();

    useEffect(() => {
        const btn = buttons.find(btn => btn.navigate === window.location.pathname);
        setSelected(btn.id);
    }, [])

    return (
        <div>
            <Navigator>
                {
                    buttons.map((button, index) => {
                        return (
                            <NavigatorItem key={button.id}>
                                <BtnNav
                                    onClick={() => {
                                        navigate(button.navigate);
                                        setSelected(button.id)
                                    }}
                                    title={button.title}
                                    marginLeft="2"
                                    selected={selected === button.id ? true : false}
                                />
                            </NavigatorItem>
                        )
                    })
                }
            </Navigator>

            <div className="ml-auto mr-auto pb-5 mb-5">
                <div
                    className={styles.autoOutletPatients}
                >
                    <Outlet />
                </div>

            </div>
        </div>

    );
}

export default Patient;
