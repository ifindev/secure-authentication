import { RouteObject } from 'react-router-dom';

import { SetRequired } from '../../types/common.type';

export type ViewRouteConfig = SetRequired<RouteObject, 'path'>;
