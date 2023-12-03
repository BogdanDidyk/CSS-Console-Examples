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

function getRandomRGB() {
    const r = getRandomInteger(0, 255);
    const g = getRandomInteger(0, 255);
    const b = getRandomInteger(0, 255);
    return `rgb(${r},${g},${b})`;
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

function printColoredArrayItems(arr, itemSplitter, startStr, endStr) {
    const items = Array.from(new Set(arr));
    const map = new Map();
    items.forEach(item => map.set(item, `color:${getRandomRGB()};`));
    const styles = arr.map(item => map.get(item));
    
    printArrayItemsWithStyles(arr, styles, itemSplitter, startStr, endStr);
}

function printArrayWithHighlightedItems(arr, highlightedItemsStyles = new Map(), itemSplitter = ", ", startStr = "[", endStr = "]") {
    const styles = arr.map(item => highlightedItemsStyles.has(item) ? highlightedItemsStyles.get(item): "");

    printArrayItemsWithStyles(arr, styles, itemSplitter, startStr, endStr)
}

function printMatrixItemsWithStyles(matrix, itemStyles, itemSplitter = "", startStr = "", endStr = "") {
    matrix.forEach(row => printArrayItemsWithStyles(row, itemStyles, itemSplitter, startStr, endStr));
}

function printMatrixWithHighlightedItems(matrix, highlightedItemsStyles, itemSplitter = "", startStr = "", endStr = "") {
    matrix.forEach(row => printArrayWithHighlightedItems(row, highlightedItemsStyles, itemSplitter, startStr, endStr));
}