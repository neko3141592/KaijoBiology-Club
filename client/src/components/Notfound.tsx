import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Notfound:React.FC = () => {
    return (
        <div className='notfound'>
            <div className='inner'>
                <h1>404 Not Found</h1>
                <p>お探しのページは見つかりませんでした。</p>
                <NavLink to="/">Home</NavLink>へ
            </div>
        </div>
    );
}

export default Notfound;