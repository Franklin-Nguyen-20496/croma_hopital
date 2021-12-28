import * as users from './users.types';
import * as notify from './notify.types';
import * as account from './account.types';

const types = { ...users, ...notify, ...account };

export default types;