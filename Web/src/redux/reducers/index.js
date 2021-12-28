
import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import notifyReducer from './notifyReducer';
import accountReducer from './accountReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    notify: notifyReducer,
    account: accountReducer,
})

export default rootReducer;