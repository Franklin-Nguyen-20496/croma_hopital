import React from 'react';
import { useNavigate } from 'react-router-dom';

import Btn from '../../common/Btn';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="fs-18 fw-600 text-dark mb-1">Trang chủ</h1>
            <div className="row">
                <Btn title="Giám đốc" marginRight="2" onClick={() => navigate('/admin')} />
                <Btn title="Bệnh nhân" marginRight="2" onClick={() => navigate('/patient')} />
                <Btn title="Điều phối" marginRight="2" onClick={() => navigate('/coordinator')} />
                <Btn title="Bác sĩ" marginRight="2" onClick={() => navigate('/doctor')} />
            </div>
            <hr className="pb-4 pt-4" />

        </div>
    );
}

export default Home;
