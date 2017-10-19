// This module require the filesystem and module library
var fs = require('fs');
var moment = require('moment'); //My favorite javascript date library

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
      if(data.length === 0){
          console.log("There is no data in here!")
      }else{
          data.forEach(function(item, index){
              console.log(index+1 + ". Potentio: " + item.potentio +
                  ". Temperature: " + item.temp +
                  ". Humidity: " + item.humidity +
                  ". Distance: " + item.distance +
                  ". Time: " + item.time)
          })
      }

    };

    //This is another method to delete the data
    this.deleteData = function(){
        // Check whether the user input the data index
        if(process.argv[3] === undefined) {
            console.log("Error: You need to type how many data to delete from beginning ('del all' to delete all)");
        }else if(process.argv[3] === "all"){
            process.stdout.write("Are you SURE you want to delete ALL the data stored? (Y/N)");
            process.stdin.on("data", function(data){
                var answer = data.toString().trim();
                if(answer === "Y"){
                    var dataToDelete = JSON.parse(fs.readFileSync("./data1.json"));
                    var numberOfData = dataToDelete.length;
                    dataToDelete.splice(0, numberOfData);
                    fs.writeFile('./data1.json', JSON.stringify(dataToDelete),function(error){
                        if(error){
                            console.log("Fail delete!")
                        }else{
                            console.log("Delete Succesful!")
                        }
                    });
                }else{
                    process.exit();
                }
            })
        }else{
            process.stdout.write("Are you sure you want to delete " + process.argv[3] + " earliest data? (Y/N)");
            process.stdin.on('data', function(data){
                var answer = data.toString().trim();
                if(answer === "Y"){
                    var dataToDelete = JSON.parse(fs.readFileSync("./data1.json"));
                    dataToDelete.splice(0, process.argv[3]);
                    fs.writeFile("./data1.json", JSON.stringify(dataToDelete) ,function(error){
                        if(error){
                            console.log("Error at writing to file");
                        }else{
                            console.log(process.argv[3] + " Data deleted");
                        }
                    });
                }else{
                    process.exit();
                }
            });
        }
    };


    this.populate = function(){
        var existingData = this.returnExistingData();
        var dataNeeded = 10 - existingData.length;
        for(var i = 0; i < dataNeeded; i++){
            var someFnObject = {
                potentio : Math.floor(Math.random() * 1024),
                temp: Math.floor(Math.random() * 40) + 20,
                humidity: Math.floor(Math.random() * 90) + 20,
                distance: Math.floor(Math.random() * 50)+10,
                time: moment().format("LTS")
            };
            existingData.push(someFnObject);
        }
        fs.writeFileSync("./data1.json", JSON.stringify(existingData));

    };



    // This is the main method that assigned the data into an object and write it to "./data1.json"
    this.changeData = function(){
      if(this.command === "add" || this.command === "ADD" || this.command === "Add"){
          this.addData();
      }else if(this.command === "del" || this.command === "DEL"){
          this.deleteData();
      }else if(this.command === "show"){
          this.showData();
      }else if(this.command === "populate"){
          this.populate();
      }else{
          console.log("Unknown Command")
      }
    };

};

// Create an instance
var action = new processObject();
// and execute command
action.changeData();






