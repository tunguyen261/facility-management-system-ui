import authReducer from 'pages/LoginPage/slice/authSlice';
import global from 'reducers/global';

const reducers = {
  global: global,
  auth: authReducer,
};

export default reducers;
