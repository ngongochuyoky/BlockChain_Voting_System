const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

function defaultCompare(a, b) {
    if (a.voteCount === b.voteCount) {
        return 0;
    }
    return a.voteCount < b.voteCount ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

export function bubbleSort(arr, compare = defaultCompare) {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) { // refer to note below
            if (compare(arr[j], arr[j + 1]) === Compare.LESS_THAN) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}