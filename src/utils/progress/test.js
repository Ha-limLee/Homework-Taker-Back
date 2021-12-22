let intervalID;

let str = '|||       ';
const len = str.length;

function start() {
    let last;
    intervalID = setInterval(() => {
        process.stdout.cursorTo(0);
        process.stdout.write('[' + str + ']');

        last = str.charAt(len - 1);
        str = last + str.slice(0, len - 1);
    }, 100);
}

function end() {
    clearInterval(intervalID);

    const endStr = Array.from(Array(len), () => '|').reduce((acc, curr) => acc + curr);
    process.stdout.cursorTo(0);
    process.stdout.write('[' + endStr + ']');
}

let id = setTimeout(() => {
    start();
    id = setTimeout(end, 5000);
}, 0);