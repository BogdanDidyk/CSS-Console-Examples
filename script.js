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

function printArrayItemsWithStyles(arr, itemStyles, itemSplitter = ", ", startStr = "[", endStr = "]") {
    const joinedStr = arr.join(`%c${itemSplitter}%c`);
    const strPattern = `${startStr}%c${joinedStr}%c${endStr}`;
    const len = arr.length;
    const duplicatedStyles = duplicate(itemStyles, len);
    const mixedStyles = [];
    
    for (let i = 0, j = 0; i < 2 * len; i += 2, j++) {
        mixedStyles[i] = duplicatedStyles[j];
        mixedStyles[i + 1] = "";
    }
    
    console.log(strPattern, ...mixedStyles);
}