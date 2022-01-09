import * as account from './account.action';
import * as notify from './notify.action';
import * as users from './users.action';
import * as waitingPatients from './waitingPatients.action';

const actions = { ...account, ...notify, ...users, ...waitingPatients };
console.log(actions);
export default actions;