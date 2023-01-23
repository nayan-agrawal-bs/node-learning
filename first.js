const fs = require("fs");
let data = [
    {
      firstname: 'ABC',
      lastname: 'DEF',
      runs: 2000,
      iplTeam: 'Mumbai',
      wickets: 5,
      matchPlayed: 20,
    },
    {
        firstname: 'NYA',
        lastname: 'YO',
        runs: 3000,
        iplTeam: 'Chennai',
        wickets: 6,
        matchPlayed: 24,
      },
      {
        firstname: 'KBC',
        lastname: 'ROC',
        runs: 5000,
        iplTeam: 'Rajasthan',
        wickets: 3,
        matchPlayed: 22,
      }
  ]

fs.writeFileSync("input.json", JSON.stringify(data));

const data2 = fs.readFileSync('input.json',
            {encoding:'utf8', flag:'r'});
console.log(data2);
console.log('-----------------------');

//async
fs.writeFile("data.json",JSON.stringify(data), (err)=> {
    console.log('Complete');
});
fs.readFile('data.json',"utf-8",(err,data)=>{
    console.log(data);
    console.log("read");
})

fs.open("data1.json","w+", function(err,h){
    //Sync
    fs.write(h,JSON.stringify(data),(err) => {
        console.log('Success');
    });
});



