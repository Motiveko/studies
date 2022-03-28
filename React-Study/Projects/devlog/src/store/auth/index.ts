import { PayloadAction } from "..";
import { User } from "../../service/firebase/UserService";
import createReducer from "../createReducer";

export type AuthState = {
  user: User | null,
  loading: boolean,
  error: string | null,
}

export const types = {
  TRY_LOGIN: 'auth/TRY_LOGIN',
  TRY_GOOGLE_AUTH: 'auth/TRY_GOOGLE_AUTH',
  SET_USER: 'auth/SET_USER',
  SET_ERROR: 'auth/SET_ERROR',
  SET_LOADING: 'auth/SET_LOADING',
};

export const actions = {
  tryLogin: (payload: {email: string, password: string}) => ({
    type: types.TRY_LOGIN,
    payload,
  }),
  tryGoogleAuth: () => ({ type: types.TRY_GOOGLE_AUTH }),
  setUser: (user: User) => ({
    type: types.SET_USER,
    payload: user,
  }),
  setError: (error: string) => ({
    type: types.SET_ERROR,
    payload: error,
  }),
  setLoading: (loading: boolean) => ({
    type: types.SET_LOADING,
    payload: loading,
  }),
};

// type AuthAction = ReturnType< typeof actions[keyof typeof actions]>

const INITIAL_STATE: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const reducer = createReducer<AuthState>(INITIAL_STATE, {
  [types.SET_USER]: (state, action) => {
    state.user = action.payload as User;
  },
  [types.SET_ERROR]: (state, action) => {
    state.error = action.payload as string;
  },
  [types.SET_LOADING]: (state, action) => {
    state.loading = action.payload as boolean;
  },
});

export default reducer;
