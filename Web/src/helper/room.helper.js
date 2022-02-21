
const findRoomsByPosition = (position) => {
    switch (position) {
        case 1: return { $gte: 101, $lte: 199 };
        case 2: return { $gte: 201, $lte: 299 };
        case 3: return { $gte: 301, $lte: 399 };
        default:
            return null;
    }
}
