
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
            return 'Bệnh nhân';
    }
}

export default userRoleHelper;