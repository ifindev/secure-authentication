import useProfileViewModel from './profile.view-model';

export default function Profile() {
    const { userProfile } = useProfileViewModel();

    if (userProfile.error) {
        return (
            <div className="border rounded p-4 w-40 flex flex-col gap-3">
                <h1 className="font-bold text-red-500 text-sm">Error Getting Profile</h1>
                <button
                    className="bg-green-700 text-white text-xs p-2 rounded text-center disabled:bg-green-700/50"
                    type="button"
                    onClick={() => userProfile.refetch()}
                    disabled={userProfile.isLoading}
                >
                    Refetch Profile
                </button>
            </div>
        );
    }

    if (userProfile.isLoading) {
        return (
            <div className="border rounded p-4 w-40 flex flex-col gap-3">
                <h1 className="font-bold text-blue-500 text-sm">Getting profile...</h1>
            </div>
        );
    }

    if (!userProfile.data) {
        return (
            <div className="border rounded p-4 w-40 flex flex-col gap-3">
                <h1 className="font-bold text-sm">Profile Not Found</h1>
            </div>
        );
    }

    return (
        <div className="border rounded p-4 w-40 flex flex-col gap-3">
            <h1 className="font-bold text-sm">Profile</h1>
            <div className="flex flex-col gap-1 text-xs">
                <p>First Name: {userProfile.data.firstName}</p>
                <p>Last Name: {userProfile.data.lastName}</p>
                <p>Email: {userProfile.data.email}</p>
                {/* <p>Role: Member</p> */}
            </div>
            <button
                className="bg-green-700 text-white text-xs p-2 rounded text-center disabled:bg-green-700/50"
                type="button"
                onClick={() => userProfile.refetch()}
                disabled={userProfile.isLoading}
            >
                {userProfile.isLoading ? 'Refetching Profile' : 'Refetch Profile'}
            </button>
        </div>
    );
}
