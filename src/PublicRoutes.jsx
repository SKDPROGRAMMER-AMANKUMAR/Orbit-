// components/PublicRoutes.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from './lib/userStore';
import { PulseLoader } from 'react-spinners';

const PublicRoutes = () => {
    const { currentUser, Loading } = useUserStore();

    if (Loading) {
        return <div className='loading' > <PulseLoader color='blue' /> </div>;
    }

    return currentUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;