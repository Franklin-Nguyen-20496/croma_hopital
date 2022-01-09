
import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import notifyReducer from './notifyReducer';
import accountReducer from './accountReducer';
import waitingPatientsReducer from './waitingPatientsReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    notify: notifyReducer,
    account: accountReducer,
    waitingPatients: waitingPatientsReducer
})

export default rootReducer;