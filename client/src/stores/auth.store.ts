import { proxy } from 'valtio';

// #region STATE TYPE
/**
 * Represents the state of the live translation
 */
type AuthState = {
    accessToken: string | null;
    isLoadingRefreshToken: boolean;
};
// #endregion

// #region INITIAL STATE
/**
 * The initial state of the authentication
 */
const initialState: AuthState = {
    accessToken: null,
    isLoadingRefreshToken: false,
};
// #endregion

// #region STATE AND ACTIONS
/**
 * The mutable state of the authentication process, managed by Valtio.
 */
const state = proxy<AuthState>({ ...initialState });

/**
 * Actions to manipulate the authentication state.
 */
const actions = {
    /**
     * Set access token on login
     * @param token Access token from API
     */
    setToken: (token: string) => {
        state.accessToken = token;
    },

    /**
     * Clear access token on logout
     */
    clearToken: () => {
        state.accessToken = null;
    },
};
// #endregion

// #region STORE

/**
 * Represents the structure of the AuthStore
 */
type AuthStore = {
    actions: typeof actions;
    initialState: Readonly<typeof initialState>;
    state: Readonly<AuthState>;
};

/**
 * The main store object for managing authentication state and actions
 */
const authStore: AuthStore = {
    actions,
    initialState,
    state,
};
// #endregion

export default authStore;
