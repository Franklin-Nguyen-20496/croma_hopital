import * as account from './account.action';
import * as notify from './notify.action';
import * as users from './users.action';

const actions = { ...account, ...notify, ...users };
console.log(actions);
export default actions;