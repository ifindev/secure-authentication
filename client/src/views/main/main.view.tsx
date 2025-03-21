import { Link, Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import profileRoute from '../profile/profile.route';
import useMainViewModel from './main.view-model';

export default function MainView() {
    const { logout, userProfile, pathname } = useMainViewModel();

    return (
        <main className="h-screen w-full">
            <div className="flex flex-col max-w-sm mx-auto gap-2 pt-10 w-full h-full">
                <button
                    className={twMerge(
                        'border border-gray-400 text-sm p-2 rounded text-center self-end',
                        'disabled:bg-gray-100/50 disabled:text-gray-300 disabled:border-gray-200',
                    )}
                    type="button"
                    onClick={logout.execute}
                    disabled={logout.isPending}
                >
                    Logout
                </button>
                <p className="text-xl font-bold">
                    Welcome{userProfile.data && `, ${userProfile.data?.firstName}`}
                </p>
                <nav>
                    <ul className="flex gap-3">
                        <li>
                            <Link
                                to="/"
                                className={twMerge(
                                    'underline',
                                    pathname === '/' && 'text-blue-600',
                                )}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={profileRoute.path}
                                className={twMerge(
                                    'underline',
                                    pathname === profileRoute.path && 'text-blue-600',
                                )}
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </main>
    );
}
