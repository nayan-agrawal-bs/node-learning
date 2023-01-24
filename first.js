const fs = require("fs");
let data = [
    {
      firstname: 'YOU',
      lastname: 'EEF',
      runs: 2000,
      iplTeam: 'Kolkata',
      wickets: 5,
      matchPlayed: 27,
    }
  ]

const file = fs.readFileSync('input.json',"utf-8")
console.log(file);
//Missiing step convert the buffer to an array
const json = JSON.parse(file.toString())
//add json element to json object
json.push(data);
fs.writeFileSync("input.json", JSON.stringify(data));
console.log('-----------------------');

// async
fs.readFile('data.json',"utf-8",(err,data)=>{
    console.log(data);
    console.log("read");
})
fs.writeFile("data.json",JSON.stringify(data), (err)=> {
    console.log('Complete');
});


fs.open("data1.json","w+", function(err,h){
    // //Sync
    fs.write(h,JSON.stringify(data),(err) => {
        console.log('Success');
    });
    console.log(err,"\\\\",h);
});

