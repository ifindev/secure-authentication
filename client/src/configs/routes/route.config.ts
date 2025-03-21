import { createBrowserRouter, RouteObject } from 'react-router-dom';

import loginRoute from '../../views/login/login.route';
import mainRoute from '../../views/main/main.route';

const routes: RouteObject[] = [loginRoute, mainRoute];

const routeConfig = createBrowserRouter(routes);

export default routeConfig;
