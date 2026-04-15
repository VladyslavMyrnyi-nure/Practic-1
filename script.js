
// Алгоритм сортування бульбашкою
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Обмін елементів
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
    };
    return arr;
};
}
// Приклад використання
let array = [64, 34, 25, 12, 22, 11, 90];
console.log("Невідсортований масив: " + array);
let sortedArray = bubbleSort(array);
console.log("Відсортований масив: " + sortedArray); 