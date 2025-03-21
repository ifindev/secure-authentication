import { RouterProvider } from 'react-router-dom';

import routeConfig from '../configs/routes/route.config';

export default function NavigationApp() {
    return <RouterProvider router={routeConfig} />;
}
