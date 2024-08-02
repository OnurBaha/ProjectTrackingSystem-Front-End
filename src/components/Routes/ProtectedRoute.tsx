import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: any;
};

const ProtectedRoute = (props: Props) => {
    const navigate = useNavigate();
    const tokenState = useSelector((state: any) => state.auth);
    useEffect(() => {
        if (!tokenState.isAuthenticated) {
            navigate("/");
        }
    }, []);

    return <>{props.children}</>;
};

export default ProtectedRoute;