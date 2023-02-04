const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = (msg) =>
  new Promise((resolve) =>
    readline.question(msg, (userRes) => resolve(userRes))
  );

const writeData = (data, path = "input2.json") =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) reject(err);
      resolve(console.log("Success"));
    });
  });

const readData = (path = "input2.json") =>
  new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });

const startApp = async () => {
  let loop = true;
  while (loop) {
    const options = ["Create a entry", "Read", "Update", "Delete", "Exit"];

    const userRes = await readLineAsync(
      `Please select an option \n 1) ${options[0]} \n 2) ${options[1]} \n 3) ${options[2]} \n 4) ${options[3]}\n 5) ${options[4]}\n`
    );

    switch (userRes) {
      case "1": {
        const id = await readLineAsync("Input Id\n");
        const name = await readLineAsync("Input Name\n");
        const data = await readData();
        data.push({ id, name });
        await writeData(data);
        break;
      }
      case "2": {
        const data = await readData();
        console.log(data);
        break;
      }
      case "3": {
        const updateId = await readLineAsync("Input Id\n");
        const updatedName = await readLineAsync("Input Name\n");
        const data = await readData();
        let present = false;
        data.forEach((element) => {
          if (element.id === updateId) {
            element.name = updatedName;
            present = true;
          }
        });
        if (!present) {
          await writeData(data);
        } else {
          console.log("User not found");
        }
        break;
      }
      case "4": {
        const deleteId = await readLineAsync("Input Id\n");
        const data = await readData();
        const index = data.findIndex((e) => e.id === deleteId);
        if (index === -1) {
          console.log("User not found");
        } else {
          data.splice(index, 1);
          await writeData(data);
        }
        break;
      }
      case "5": {
        console.log("Exiting...");
        readline.close();
        loop = false;
        break;
      }
      default:
        console.log("Wrong input");
    }
  }
};

startApp();
