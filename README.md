# NamasteNode-JS-EP-06: LIBUV & ASYNC IO - THE DYNAMIC DUO OF NODEJS!
# Seson 01 Episode 06 | Libuv and Async IO
----------------------------------------------------------------  

> Node.js has an event-driven architecture capable of asynchronous I/O.
> So, this episode is focused on explaining that concept. 


# What is Thread?
- A Thread is a smallest unit of excution in a process, representing a single sequence of instructions. Multiple threads can run within a single process, sharing memory but executing independently, which boosts efficiency and responsiveness. Threads can be 
1. Single Threaded - Blocking Operation
2. Multi Threaded - Non-blocking I/O

# What type of threading does JavaScript use? 
- JavaScript is synchronous single threaded language. meaning there is only one thread in which the Javascript engine runs (such as the V8 engine).
- In JS, code is executed line by line within the single thread.
- So, if you are executing `line 2` in JavaScript, it will only run after `line 1` has finished executing. This is the essence of synchronous execution.
- Each task is performed one after the other, without overlap.

# Synchronous vs Asynchronous JavaScript:

## What is a Synchronous System?
- A synchronous system is one where tasks are done one after another.
- Imagine you have just one hand to do 10 tasks. You must finish each task before starting the next, one step at a time.

## What is an Asynchronous System?
- In Asynchronous system, tasks are completed independently.
- Imagine you are at a restaurant with 10 servers, each assigned to a different table. While one server takes an order, another serves food, and another clear a  table. Everything happens at the same time without waiting.


> So, JavaScript itself is synchronous, but with the power of Node.js, it can handle asynchronous operations, allowing JavaScript to perform multiple tasks simultaneously.

## What are the portions inside the JS engine and How synchronous code is executed by JS Engine? 
- The V8 JavaScript engine operates with a **single call stack**, and all the code we write is executed within this **call stack.**
- The engine runs on a **single thread,** meaning it can only perform one operation at a time.
- In addition to the call stack, the V8 JavaScript engine also includes a **memory heap.** This memory heap stores all the variables, numbers, and functions that our code uses.
- One key feature of the JavaScript V8 engine is its **garbage collector.**
- The *garbage collector* automatically identifies and removes variables that are no longer in use, freeing up memory.
- JavaScript handles the garbage collection process automatically.
- This means we don't have to worry about memory management, it's all taken care of by the V8 JavaScript engine.

## Let's see how the Synchronous code is executed inside the JavaScript V8 Engine:

```javascript
    let a = 1000;
    let b = 2000;

    function multiplyFn(a,b) {
        const result = a * b;
        return result;
    }

    let c = multiplyFn(a, b);
```


1. **Step 1: Global Execution Context Creation**
-   As soon as the JavaScript engine begins executing the code, it creates a **Global Execution Context.** This is the main environment where the top-level code is executed. 
-   The global execution context is unique and is always the first to be pushed onto the **callstack.**
2. **Step 2: Memory Creation Phase**
- Before any code is executed, the JavaScript engine enters the *memory creation phase.* During this phase:
- Variables `a` and `b` are declared in the memory and initialized to `undefined`.
- The function `multiplyFn` is also stored in memory, with its value set to entire function definition.
3. **Step3: Code Execution Phase**
- Once the memory creation phase is complete, the engine moves to the *code execution phase:*
- **Execution of variable `let a = 1000;` and `let b = 2000;`:** The variables `a` and `b` are no assigned their respective values.
- **Execution of `let c = multiplyFn(a, b)`:** the function `multiplyFn(a, b)` is invoked, creating a new *function execution context* specifically for this function.
4. **Step 4: Function Execution Context Creation**
- When `multiplyFn` is invoked, the JS engine:
- Creates a new execution context for `multiplyFn` and pushes it onto the top of the **callstack**
- In this new function context, the parameters `x` and `y` are assigned the values of `a` and `b`.
5. **Step 5: Memory Creation and Code Execution Phase Inside `multiplyFn`**
- inside `multiplyFn`, the memory creation phase initializes `result` in memory with `undefined`.
- **Execution of `const result = a * b;`:** The multiplication is performed, and the result is `result` is assigned the value `20,00,000`.
- **Execution of `return result;`:** The function return `20,00,000`, and the `multiplyFn` execution context is popped off the call stack.
6. **Resuming Global Execution Context**
- In Global Execution Context, the returned value from `multiplyFn (20,00,000)` is assigned to the variable `c`.
7. **Now, Once the entire code is executed, the global execution context is also popped out, and the call stack becomes empty.**

## How Asynchronous code is executed?

```javascript
    let a = 1000;
let b = 2000;

https.get("https://api,fbi.com", (res) => {
    console.log(res?.secret);
})

setTimeout(() => {
    console.log("setTimer expired");
}, 5000);

fs.readFile("./gossip.txt", "utf8", (data) => {
    console.log("file data", data);
});

function multiplyFn(x, y) {
    const result = a * b;
    return result;
}

let c = multiplyFn(a, b);

console.log(c);
```



- The JavaScript engine cannot do this alone, it needs superpowers. This where Node.js comes into the picture, giving it the ability to interact with operating system functionalites.

> The JS engine cannot directly access OS files, so it calls on Libuv. Libuv, being very cool and full of superpowers, communicates with the OS, perfoms all the necessary tasks, and returns the response to the JS engine. 


- The variables `let a` and `let b` are executed within the GEC (Global Execution Context) during the synchrhronous phase of the code execution process. 
- However, whe the code encounters an API call, the V8 engine, while still operating within the GEC, recognizes that it is dealing with an asychronous operation. At this point, the V8 engine signals `libuv` to handle this API call.
- What happens next is that `libuv` registers the API call, including its associated callback function (API - A), within its event loop, allowing the V8 engine to continue executing the rest of the code without waiting for the API call to complete.
- Next, when the code encounters a `setTimeout` function, (setTimeout - B) a similar process occurs.
- The V8 engine identifies this as another asynchronous operation and once agin notifies `libuv`.
- Following this when the code reaches a file operation (like reading or writing a file), the process is similar. (fs - C)
- The V8 engine recognizes this as another asynchronous task and alerts `libuv`.
- `libuv` then registers the file operation and its callback in the event loop.
- next, when the code executes `let c = multiplyFn(a, b);`, the JavaScript engine creates a new function context for `multiplyFn` and pushes it onto the call stack.
- The function takes two parameters, `x` and `y`, and within this function, the engine multiplies these values (`a * b`) and stores the result in the `result` variable.
- The JavaScript engine handles this operation as part of the **synchronous code execution**
- Once the `multiplyFn` completes its execution and returns the result, the function context is popped off the call stack, and the result is assigned to the variable `c` 

# imp concept :
  > - **When the function execution context is popped off the call stack, the garbage collector may clear any memory allocated for that context in the memory heap, if it is no longer needed.**
  > - **After `console.log(c)` is executed and the value of `c` is printed to the console, the Global Execution Context is will also eventually be removed from the call stack if the code execution is complete** 
  > - **With the global execution context popped off the call stack, the JS engine has finished processing, and the program ends.**
  >- **Now the call stack becomes empty, the JavaScript engine can relax, as there is no more code to execute.**
  >- **At this point `libuv` takes over the major tasks. It handles operations such as processing timers, managing file system calls, and communicating with the operating system.**

  - `libuv` performs these heavy tasks in the background, ensuring that asynchronous operations continue to be managed effectively.
  - In summary, Node.js excels in handling asynchronously I/O operations, thanks to its non-blocking I/O model.

## Components of V8 JS Engine:
1. CallStack
2. Memory Heap
3. Garbage Collector
4. Global Execution Context
   - Memory Creation Phase
   - Code Execution Phase
5. Function Execution Context
   - Memory Creation Phase
   - Code Execution Phase 