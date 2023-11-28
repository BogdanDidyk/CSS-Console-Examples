function duplicate(item, length) {
    if (length <= 1) return [item];
    else {
        if (Array.isArray(item)) {
            const len = item.length;
            if (length === len) return item;
            else {
                const result = [];
                for (let i = 0; i < length; i++) {
                    result[i] = item[i % len];
                }
                return result;
            }
        }
        else {
            return Array(length).fill(item);
        }
    }
}