
const userRoleHelper = (number) => {
    switch (number) {
        case 1:
            return 'Giám đốc';
        case 2:
            return 'Trưởng khoa';
        case 3:
            return 'Bác sĩ';
        case 4:
            return 'Y tá';
        case 5:
            return 'Điều phối viên';;
        default:
            return null;
    }
}

export const role = {
    ADMIN: 1,
    DEAN: 2,
    DOCTOR: 3,
    NURSE: 4,
    COORDINATOR: 5,
}

export default userRoleHelper;