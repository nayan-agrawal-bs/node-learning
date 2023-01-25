var fs = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = (msg) => {
  return new Promise((resolve) => {
    readline.question(msg, (userRes) => {
      resolve(userRes);
    });
  });
};

const startApp = async () => {
  const userRes = await readLineAsync(
    "Please select an option \n 1) Create a entry \n 2) Read \n 3) Update \n 4) Delete \n"
  );
  switch (userRes) {
    //Create
    case "1":
      let id = await readLineAsync("Input Id\n");
      let name = await readLineAsync("Input Name\n");
      fs.readFile("input.json", "utf-8", (err, data) => {
        if (err) throw err;
        let arr = JSON.parse(data);
        arr.push({ id, name });
        fs.writeFile("input.json", JSON.stringify(arr), (err) => {
          if (err) throw err;
        });
      });
      break;
    // Read
    case "2":
      fs.readFile("input.json", "utf-8", (err, data) => {
        if (err) throw err;
        let arr = JSON.parse(data);
        console.log(arr);
      });
      break;
    // Update
    case "3":
      let updateId = await readLineAsync("Input Id\n");
      let updatedName = await readLineAsync("Input Name\n");
      fs.readFile("input.json", "utf-8", (err, data) => {
        if (err) throw err;
        let arr = JSON.parse(data);
        arr.forEach((element) => {
          if (element.id === updateId) {
            element.name = updatedName;
          }
        });
        fs.writeFile("input.json", JSON.stringify(arr), (err) => {
          if (err) throw err;
        });
      });
      break;
    // Delete
    case "4":
      let deleteId = await readLineAsync("Input Id\n");
      let index;
      fs.readFile("input.json", "utf-8", (err, data) => {
        if (err) throw err;
        let arr = JSON.parse(data);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === deleteId) {
            index = i;
            break;
          }
        }
        arr.splice(index, 1);
        fs.writeFile("input.json", JSON.stringify(arr), (err) => {
          if (err) throw err;
        });
      });
      break;
    default:
      console.log("wrong input");
  }
  readline.close();
};

startApp();
