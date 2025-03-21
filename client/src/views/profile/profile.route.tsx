import { ViewRouteConfig } from '../../configs/routes/route.type';
import Profile from './profile.view';

const profileRoute: ViewRouteConfig = {
    path: '/profile',
    element: <Profile />,
};

export default profileRoute;
