import * as users from './users.types';
import * as notify from './notify.types';
import * as account from './account.types';
import * as waitingPatients from './waitingPatients.types';

const types = { ...users, ...notify, ...account, ...waitingPatients };

export default types;