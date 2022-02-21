import React from 'react';
import { useNavigate } from 'react-router-dom';

import Btn from '../../common/Btn';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="fs-20 fw-600 text-dark text-center mb-2">TRANG CHỦ BỆNH VIỆN CROMA</h1>
            <div className="row">
                <div className="col-12 ">
                    <div className="d-flex justify-content-center">
                        <Btn
                            title="Đăng ký khám bệnh"
                            marginBottom="2"
                            onClick={() => navigate('/patient')}
                        />
                    </div>

                </div>
                <div className="col-12 ">
                    <div className="d-flex justify-content-center">
                        <Btn
                            title="Đăng nhập"
                            marginBottom="2"
                            onClick={() => navigate('/login')}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Home;
