import React from 'react';
import loading from '../../assets/loading.gif'
function Spinner() {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <img src={loading} />
        </div>
    );
}

export default Spinner;
