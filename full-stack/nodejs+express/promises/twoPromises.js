let p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Promise 1 resolved.");
  }, 6000);
});

let p2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Promise 2 resolved.");
  }, 3000);
});

//second promise is invoked after the first promise
//output: promise 2 is first even if it has more delay
// p1.then((success) => {
//   console.log("From Callback " + success);
//   p2.then((success) => {
//     console.log("From Callback " + success);
//   });
// });


//invoked sequentially (based on delays)
// p1.then((success) => {
//   console.log("From Callback " + success);
// });

// p2.then((success) => {
//   console.log("From Callback " + success);
// });
