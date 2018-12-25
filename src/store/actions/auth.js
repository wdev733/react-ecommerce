import * as actionTypes from './actionTypes';
import { addError } from './errors';

export let unsubscribeAuthState = () => {};

export const switchShowAuth = () => {
  return {
    type: actionTypes.SWITCH_SHOW_AUTH
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const authSuccess = uid => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    uid
  };
};

export const auth = ({ email, password, username }, method) => async (
  dispatch,
  getState,
  { firebase }
) => {
  dispatch(authStart());

  try {
    if (method === 'login') {
      await firebase.doSignInWithEmailAndPassword(email, password);
    } else {
      await firebase.doCreateUserWithEmailAndPassword(email, password);
      await firebase.auth.currentUser.updateProfile({ displayName: username });
    }

    // I am not calling dispatch(authSuccess()) here
    // because firebase I have subscribed to the auth state
    // and I call it there
  } catch (error) {
    dispatch(authFail(error));
    dispatch(addError(error.message));
  }
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const subscribeAuthState = () => (dispatch, getState, { firebase }) => {
  unsubscribeAuthState = firebase.auth.onAuthStateChanged(function(user) {
    if (user) {
      dispatch(authSuccess(user.uid));
    } else {
      dispatch(logout());
    }
  });
};