// Path is a core module just require it from anywhere without an extension name
var path =  require("path");

// Make a fuked up example directory
var directory = "/map/pelajar//mathematics/";
var directory2 = "/pelajaran/nilai.html";

// Normalize the directory
var normalisedDir = path.normalize(directory);
console.log(normalisedDir);

// Join the two directory
// console.log(path.join(directory, directory2));

// dirname, basename and extname
console.log(path.dirname(directory2));
console.log(path.basename(directory2));
console.log(path.extname(directory2));