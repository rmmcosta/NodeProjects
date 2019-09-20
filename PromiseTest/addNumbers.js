function add(num1, num2) {
    return num1 + num2;
}

console.log(add(5, 8));

async function addAsync(num1, num2) {
    return Promise.resolve(num1 + num2);
}

(async () => {
    console.log('async', await addAsync(6, 6));
})();

console.log(addAsync(6, 6));

async function addAsyncWithTimeout(num1, num2) {
    setTimeout(() => {
        console.log('timeout!');
        return Promise.resolve(num1 + num2);
    }, 10000);
}

(async () => {
    console.log('async with timeout', await addAsyncWithTimeout(7, 7));
})();

console.log(addAsyncWithTimeout(7, 7));