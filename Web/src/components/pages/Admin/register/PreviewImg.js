
import React, { useState } from 'react';

const PreviewImg = ({ file }) => {
    const [preview, setPreview] = useState(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    }

    return (
        <div className="mt-2">
            <div className="m-auto"
                style={{ maxWidth: '32rem', width: '100%' }}>
                <img src={preview} alt="preview" width="100%" />
            </div>

        </div>
    );
}

export default PreviewImg;
