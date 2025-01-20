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
7. **Now Once the entire code is executed, the global execution context is also popped out, and the call stack becomes empty.**
