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

function getRandomInteger(min = 0, max = 9) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

function printHighlightedArrayItemsWithRule(arr, rule, style, itemSplitter = ", ", startStr = "[", endStr = "]") {
    const styles = arr.map(item => rule(item) ? style: "");

    printArrayItemsWithStyles(arr, styles, itemSplitter, startStr, endStr)
}

function printMatrixItemsWithStyles(matrix, itemStyles, itemSplitter = "", startStr = "", endStr = "") {
    matrix.forEach(row => printArrayItemsWithStyles(row, itemStyles, itemSplitter, startStr, endStr));
}

function printMatrixWithHighlightedItems(matrix, highlightedItemsStyles, itemSplitter = "", startStr = "", endStr = "") {
    matrix.forEach(row => printArrayWithHighlightedItems(row, highlightedItemsStyles, itemSplitter, startStr, endStr));
}

function printHighlightedMatrixItemsWithRule(matrix, rule, style, itemSplitter = "", startStr = "", endStr = "") {
    matrix.forEach(row => printHighlightedArrayItemsWithRule(row, rule, style, itemSplitter, startStr, endStr));
}

const arr = [1, 2, 3, 1, 2, 3, 1, 1, 5, 6];
const matrix = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
];

printArrayItemsWithStyles(arr, ["color:green;", "color:red;"], ", ",  "arr = [");
printColoredArrayItems(arr, ", ",  "arr = [");
printArrayWithHighlightedItems(arr, new Map([[1, "color:red;"], [2, "color:blue;"]]), ", ",  "arr = [");
printHighlightedArrayItemsWithRule(arr, (item) => item === 1 || item === 6, "border:1px dotted blue;", ", ",  "arr = [");
printMatrixItemsWithStyles(matrix, "border: 1px solid black; padding:5px;");
printMatrixWithHighlightedItems(matrix, new Map([[0, "color:red;"], [1, "color:cyan;"]]), " ");
printHighlightedMatrixItemsWithRule(matrix, (item) => item === 1, "font-size:1.2rem;", " ");