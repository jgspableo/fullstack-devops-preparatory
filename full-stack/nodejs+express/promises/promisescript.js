let promise = new Promise((res, rej) => {
  setTimeout(() => {
    res("Promise resolved");
  }, 6000);
});

console.log("Before calling the promise");

promise.then((success) => {
  console.log("From callback " + success);
});

console.log("After calling the message.");

