import { ViewRouteConfig } from '../../configs/routes/route.type';
import profileRoute from '../profile/profile.route';
import MainView from './main.view';

const mainRoute: ViewRouteConfig = {
    path: '/',
    element: <MainView />,
    children: [profileRoute],
};

export default mainRoute;
