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
    const options = [
      "Create a entry",
      "Read",
      "Update",
      "Delete",
      "Perform optration",
      "Exit",
    ];

    const userRes = await readLineAsync(
      `Please select an option \n 1) ${options[0]} \n 2) ${options[1]} \n 3) ${options[2]} \n 4) ${options[3]}\n 5) ${options[4]} \n 6) ${options[5]}\n`
    );

    switch (userRes) {
      case "1": {
        let present = false;
        const id = await readLineAsync("Input Id\n");
        const data = await readData();
        data.forEach((element) => {
          if (element.id === id) {
            present = true;
          }
        });
        if (present) {
          console.log("Id Already Present");
        } else {
          const firstname = await readLineAsync("Input Name\n");
          const lastname = await readLineAsync("Input Last Name\n");
          const runs = await readLineAsync("Input Runs\n");
          const iplTeam = await readLineAsync("Input Team Name\n");
          const wickets = await readLineAsync("Input Wickets Taken\n");
          const matchPlayed = await readLineAsync("Input Match Played\n");
          data.push({
            id,
            firstname,
            lastname,
            runs,
            iplTeam,
            wickets,
            matchPlayed,
          });
          await writeData(data);
        }
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
        const operation = await readLineAsync(
          `Please select an option \n 1) Filter \n 2)Add Strike Rate\n 3)Get sum of the wickets of all the players`
        );
        switch (operation) {
          case "1": {
            const data = await readData();
            let player = data.filter((el) => {
              return el.runs > 24000;
            });
            console.log(player);
            break;
          }
          case "2": {
            const data = await readData();
            data.map((obj) => {
              if (obj.hasOwnProperty("strikeRate")) {
                console.log("Strike rate already present\n"); //Want to terminate process here is there a way?
                return;
              } else {
                obj["strikeRate"] = obj.runs / obj.matchPlayed;
              }
            });
            await writeData(data);
            console.log(data);
            break;
          }
          case "3": {
            const data = await readData();
            const sum = data.reduce((acc, obj) => acc + Number(obj.wickets), 0);
            console.log(sum);
            break;
          }
          default:
            console.log("Wrong input");
        }
        break;
      }
      case "6": {
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
