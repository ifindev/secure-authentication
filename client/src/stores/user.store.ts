import { proxy } from 'valtio';
import { UserProfile } from '../repositories/user.api';

// #region STATE TYPE
/**
 * Represents the state of the user profile
 */
type UserState = {
    user: UserProfile | null;
};
// #endregion

// #region INITIAL STATE
/**
 * The initial state of the user profile
 */
const initialState: UserState = {
    user: null,
};
// #endregion

// #region STATE AND ACTIONS
/**
 * The mutable state of the user profile, managed by Valtio.
 */
const state = proxy<UserState>({ ...initialState });

/**
 * Actions to manipulate the user profile state.
 */
const actions = {
    /**
     * Set user profile data
     * @param user User profile from API
     */
    setUser: (user: UserProfile) => {
        state.user = user;
    },

    /**
     * Clear user profile on logout
     */
    clearUser: () => {
        state.user = null;
    },
};
// #endregion

// #region STORE

/**
 * Represents the structure of the UserStore
 */
type UserStore = {
    actions: typeof actions;
    initialState: Readonly<typeof initialState>;
    state: Readonly<UserState>;
};

/**
 * The main store object for managing user profile state and actions
 */
const userStore: UserStore = {
    actions,
    initialState,
    state,
};
// #endregion

export default userStore;
