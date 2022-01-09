
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import MainView from '../../common/MainView';
import Navigator from '../../common/Navigator';
import NavigatorItem from '../../common/NavigatorItem';
import BtnNav from '../../common/BtnNav';

const buttons = [
    {
        id: 1,
        title: 'Bệnh nhân',
        navigate: '/doctor/my-patients',
    },
    {
        id: 2,
        title: 'Kiểm tra sức khỏe',
        navigate: '/doctor/patient-check',
    },
    {
        id: 3,
        title: 'Công thức thuốc',
        navigate: '/doctor/recipes',
    },
    {
        id: 4,
        title: 'Khám bệnh',
        navigate: '/doctor/waiting-patient',
    }
]

const Doctor = () => {

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

            <MainView>
                <Outlet />
            </MainView>
        </div>
    );
}

export default Doctor;
