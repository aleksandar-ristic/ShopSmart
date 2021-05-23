import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;

  switch(type) {
    case LOAD_USER_REQUEST:
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuth: false
      }
    case LOAD_USER_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: payload
      }
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuth: false,
        user: null
      }
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuth: false,
        user: null,
        error: payload
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        error: payload
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}

export const userReducer = (state= {}, action) => {
  const { type, payload } = action;

  switch(type) {
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload
      }
    case UPDATE_PASSWORD_RESET:
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false
      }
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state;
  }
}
