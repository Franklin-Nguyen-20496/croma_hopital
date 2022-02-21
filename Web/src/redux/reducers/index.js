
import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import notifyReducer from './notifyReducer';
import accountReducer from './accountReducer';
import waitingPatientsReducer from './waitingPatientsReducer';
import roomsReducer from './roomsReducer';
import pollsReducer from './pollsReducer';
import patientsReducer from './patientsReducer';
import medicinesReducer from './medicinesReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    notify: notifyReducer,
    account: accountReducer,
    waitingPatients: waitingPatientsReducer,
    rooms: roomsReducer,
    polls: pollsReducer,
    patients: patientsReducer,
    medicines: medicinesReducer,
    recipes: recipesReducer,
})

export default rootReducer;