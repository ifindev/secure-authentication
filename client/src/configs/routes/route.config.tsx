import { createBrowserRouter, RouteObject } from 'react-router-dom';

import loginRoute from '../../views/login/login.route';
import mainRoute from '../../views/main/main.route';
import RootRouteLayout from './root-route.layout';

const routes: RouteObject[] = [
    {
        element: <RootRouteLayout />,
        children: [loginRoute, mainRoute],
    },
];

const routeConfig = createBrowserRouter(routes);

export default routeConfig;
