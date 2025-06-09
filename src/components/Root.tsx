import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default Root;