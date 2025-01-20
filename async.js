let a = 1000;
let b = 2000;

// Api call - Async code
https.get("https://api,fbi.com", (res) => {
    console.log(res?.secret);
})


//setTimeout -  Async 
setTimeout(() => {
    console.log("setTimer expired");
}, 5000);


// File Read Operation - Async 
fs.readFile("./gossip.txt", "utf8", (data) => {
    console.log("file data", data);
});


function multiplyFn(x, y) {
    const result = a * b;
    return result;
}

let c = multiplyFn(a, b);

console.log(c);

// In this all the completion of synchronous code then all the async operations are handled by libuv