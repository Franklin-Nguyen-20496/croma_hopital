
import * as account from './account.action';
import * as notify from './notify.action';
import * as users from './users.action';
import * as waitingPatients from './waitingPatients.action';
import * as rooms from './rooms.action';
import * as polls from './polls.action';
import * as patients from './patients.action';
import * as medicines from './medicines.action';
import * as recipes from './recipes.action';

const actions = {
    ...account,
    ...notify,
    ...users,
    ...waitingPatients,
    ...rooms,
    ...polls,
    ...patients,
    ...medicines,
    ...recipes,
};
// console.log(actions);
export default actions;