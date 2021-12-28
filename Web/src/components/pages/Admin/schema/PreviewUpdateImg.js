
import React, { useState, useEffect } from 'react';

const PreviewUpdateImg = ({ file, img }) => {
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreview(reader.result);
            }
        }
        else setPreview(img || process.env.REACT_APP_DEFAULT_IMG);
    }, [file, img])

    return (
        <div className="mt-2">
            <div className="m-auto"
                style={{ maxWidth: '32rem', width: '100%' }}>
                <img src={preview} alt="preview" width="100%" />
            </div>

        </div>
    );
}

export default PreviewUpdateImg;
