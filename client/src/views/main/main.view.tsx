import { Link } from 'react-router-dom';
import loginRoute from '../login/login.route';
import useMainViewModel from './main.view-model';

export default function MainView() {
    const { user, accessToken, logout } = useMainViewModel();

    return (
        <main className="h-screen w-full">
            <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                <p className="text-xl font-bold">Welcome {user && `, ${user.firstName}`}</p>
                {accessToken ? (
                    // TODO: Add logout handler
                    <button
                        className="bg-green-700 text-white text-sm p-2 rounded text-center"
                        type="button"
                        onClick={logout}
                    >
                        Logout
                    </button>
                ) : (
                    <Link className="underline text-blue-600" to={loginRoute.path}>
                        Login
                    </Link>
                )}
            </div>
        </main>
    );
}
