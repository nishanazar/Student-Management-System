import inquirer from "inquirer";
import chalk from "chalk";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance: number = 10000;

let answer = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: "Enter student name:",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter a non-empty value. ";
    },
  },
  {
    name: "courses",
    type: "list",
    message: "Select the course to enrolled",
    choices: ["javaScript", "TypeScript", "Python", "MS.Office", "Html"],
  },
]);
let tuitionFees: { [key: string]: number } = {
  javaScript: 6000,
  TypeScript: 5000,
  Python: 7000,
  "MS.Office": 3000,
  Html: 2000,
};
console.log(`\nTuition fees: ${tuitionFees[answer.courses]}\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "Select payment method",
    choices: ["Bank Transfer", "Easypaisa", "Jazzcash"],
  },
  {
    name: "amount",
    type: "input",
    message: "Transfer Money:",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter a non-empty value. ";
    },
  },
]);
console.log(
  chalk.blueBright(`\nYou select payment method ${paymentType.payment}\n`)
);
const tuitionFee = tuitionFees[answer.courses];
const paymentAccount = parseFloat(paymentType.amount);
if (tuitionFee === paymentAccount) {
  console.log(
    chalk.yellow(
      `Congratulations, you have successfully enrolled in ${answer.courses}\n`
    )
  );

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What would you like to do next?",
      choices: ["View Status", "Exit"],
    },
  ]);
  if (chalk.red(ans.select === "View Status")) {
    console.log(chalk.red("\n******Status******\n"));
    console.log(chalk.yellow(`Student Name: ${answer.student}`));
    console.log(chalk.yellow(`Student ID: ${randomNumber}`));
    console.log(chalk.yellow(`Course: ${answer.courses}`));
    console.log(chalk.yellow(`Tuition fees Paid ${paymentAccount}`));
    console.log(chalk.yellow(`View Balance: ${(myBalance -= paymentAccount)}`));
  } else {
    console.log(chalk.green(`/nExiting Student Management System\n`));
  }
} else {
  console.log(chalk.greenBright(`Invalid amount due to course\n`));
}
