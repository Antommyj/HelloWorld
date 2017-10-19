// This module require the filesystem and module library
var fs = require('fs');
var moment = require('moment');

var processObject = function(){

    // The first data (command) will be assigned to this property
    this.command = process.argv[2];

    // This is a helper method that check the existing JSON file in "./data1.json" and return it
    this.returnExistingData = function(){
      var data = fs.readFileSync("./data1.json");
      return JSON.parse(data);
    };

    /* Add data helper method, I want to make it into a private method in which only the object can access
     * But I dont' know how. Fuckin' JS*/
    this.addData = function(){
        // Create an object from the input
        var IoT = {
            potentio: process.argv[3] === undefined ? null : process.argv[3],
            temp: process.argv[4] === undefined ? null : process.argv[4],
            humidity: process.argv[5] === undefined ? null : process.argv[5],
            distance: process.argv[6] === undefined ? null : process.argv[6],
            time: moment().format("LTS")
        };
        // Check for an existing data and add the new data into an array
        var data = this.returnExistingData();
        // I need to check the number of data before pushing another value
        if(data.length === 10){//If there's already 10 data exist
            data.shift();//Delete the first value of an array
            data.push(IoT)
        }else{//if it's less
            data.push(IoT);//Just push it
        }
        // Write to the file (Important steps)
        fs.writeFile("./data1.json", JSON.stringify(data),function(error){
            if(error){
                console.error("Fail writing to the file. Error: " + error.message)
            }else{
                console.log("Success write to data1.json!")
            }
        });
    };

    //This is another method to post all the data to console
    this.showData = function(){
      var data = this.returnExistingData();
      data.forEach(function(item, index){
          console.log(index+1 + ". Potentio: " + item.potentio +
              ". Temperature: " + item.temp +
              ". Humidity: " + item.humidity +
              ". Time: " + item.time)
      })
    };

    //This is another method to delete the data
    this.deleteData = function(){
        // Check whether the user input the data index
        if(process.argv[3] === undefined){
            console.log("Error: You need to type in the index. Command: Del indexNo")
        }else{

        }
    };

    // This is the main method that assigned the data into an object and write it to "./data1.json"
    this.changeData = function(){
      if(this.command === "add" || this.command === "ADD" || this.command === "Add"){
          this.addData();
      }else if(this.command === "del" || this.command === "DEL"){
          console.log("Deleting")
      }else if(this.command === "show"){
          this.showData();
      }
    };

};

// Create an instance
var action = new processObject();
// and execute command
action.changeData();



