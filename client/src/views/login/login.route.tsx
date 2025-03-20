import { ViewRouteConfig } from '../../configs/routes/route.type';
import LoginView from './login.view';

const loginRoute: ViewRouteConfig = {
    path: '/login',
    element: <LoginView />,
};

export default loginRoute;
