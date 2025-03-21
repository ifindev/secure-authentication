import { Link } from 'react-router-dom';

import loginRoute from '../login/login.route';
import useMainViewModel from './main.view-model';

export default function MainView() {
    const { accessToken, logout, handleRefreshToken, userProfile } = useMainViewModel();

    return (
        <main className="h-screen w-full">
            <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                <p className="text-xl font-bold">
                    Welcome{userProfile.data && `, ${userProfile.data?.firstName}`}
                </p>
                {accessToken ? (
                    // TODO: Add logout handler
                    <div className="flex gap-2 items-center">
                        <button
                            className="bg-green-700 text-white text-sm p-2 rounded text-center"
                            type="button"
                            onClick={logout}
                        >
                            Logout
                        </button>
                        <button
                            className="bg-green-700 text-white text-sm p-2 rounded text-center"
                            type="button"
                            onClick={handleRefreshToken.execute}
                            disabled={handleRefreshToken.isPending}
                        >
                            {handleRefreshToken.isPending ? 'Refreshing token' : 'Refresh Token'}
                        </button>
                        <button
                            className="bg-green-700 text-white text-sm p-2 rounded text-center"
                            type="button"
                            onClick={() => userProfile.refetch()}
                            disabled={userProfile.isLoading}
                        >
                            {userProfile.isLoading ? 'Refetching Profile' : 'Refetch Profile'}
                        </button>
                    </div>
                ) : (
                    <Link className="underline text-blue-600" to={loginRoute.path}>
                        Login
                    </Link>
                )}
            </div>
        </main>
    );
}
