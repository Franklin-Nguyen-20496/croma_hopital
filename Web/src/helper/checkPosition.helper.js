
const checkPosition = (position) => {
    switch (position) {
        case 1: return 'khoa chấn thương';
        case 2: return 'khoa tim mạch';
        case 3: return 'khoa hô hấp';
        default: return null;
    }
}

export default checkPosition;