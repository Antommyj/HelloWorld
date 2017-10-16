// The setTimeout(func, time) sets a function that is to be called ONCE after a specified amount of time
// It takes two parameter the first one is the function to be called and the second one is the time

function someFunction(){
    console.log("This function is being called after waiting for specified amount of time");
}

function anotherFunction(){
    console.log("anotherFunction is called");
}

// The function someFunction will be executed after waiting for 3 seconds (Uncomment the code below to see it)
// setTimeout(someFunction, 3000);

// The setInterval function execute the callback function REPEATEDLY after EVERY pass of specified time.
// It takes 2 parameter. The first one is the function to be called and the second one is the time

// The example down here is a function that will be called once every 2 second (Uncomment the code below to see it);
//setInterval(anotherFunction, 2000);

// Both setTimeout and setInterval return an object that can be used to clear timeout/interval
var count = 0;
var intervalFunction = function(){
  count++;
  console.log("Seconds have passed");
  if(count == 5){
      console.log("exiting");
      clearInterval(intervalObject);
  }
};

var intervalObject = setInterval(intervalFunction, 1000);