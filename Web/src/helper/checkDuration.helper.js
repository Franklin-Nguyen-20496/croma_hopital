
export const checkDuration = (number) => {
    switch (number) {
        case 1:
            return 6 * 60 * 60 * 1000;
        case 2:
            return 8 * 60 * 60 * 1000;
        case 3:
            return 12 * 60 * 60 * 1000;
        default:
            return null;
    }
}