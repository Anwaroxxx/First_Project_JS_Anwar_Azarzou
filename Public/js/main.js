const prompt = require("prompt-sync")(); //! For Terminal input
/**********************************************************************************/

//!validation of name
function validateName(name) {
  name = name.trim();

  let lettersOnly = name.split(" ").join("");
  if (lettersOnly.length < 5) {
    return false;
  }

  for (let i = 0; i < name.length; i++) {
    let char = name[i];
    if (
      char !== " " &&
      (char < "A" || (char > "Z" && char < "a") || char > "z")
    ) {
      return false;
    }
  }
  let words = name.split(" ");
  for (let word of words) {
    if (word[0] < "A" || word[0] > "Z") {
      return false;
    }
  }
  return true;
}

//!email validation
function validateEmail(email) {
  email = email.trim().toLowerCase();

  if (email.includes(" ")) {
    return false;
  }

  let atCount = 0;
  for (let i = 0; i < email.length; i++) {
    if (email[i] === "@") {
      atCount++;
    }
  }

  if (atCount !== 1) {
    return false;
  }

  return true;
}

//! age validation
function validateAge(age) {
  age = age.trim();

  if (age.length === 0 || age.length > 2) {
    return false;
  }

  for (let i = 0; i < age.length; i++) {
    if (!(age[i] >= "0" && age[i] <= "9")) {
      return false;
    }
  }

  return true;
}

//!password validation
function validatePassword(password) {
  password = password.trim();

  if (password.length < 7) {
    return false;
  }

  if (password.includes(" ")) {
    return false;
  }

  let specialChars = "@#-+*/";
  let hasSpecial = false;

  for (let i = 0; i < password.length; i++) {
    if (specialChars.includes(password[i])) {
      hasSpecial = true;
      break;
    }
  }

  return hasSpecial;
}

//TODO : user Class
class User {
  constructor(name, email, age, password) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.password = password;
    this.money = 1000;
    this.history = [];
  }

  addHistory(action) {
    let date = new Date().toLocaleString();
    this.history.push(`[${date}] ${action}`);
  }

  withdraw() {
    if (this.money <= 0) {
      console.log("You have $0 left.");
      return;
    }

    let amount = parseInt(prompt("Withdraw amount: "));
    if (isNaN(amount) || amount <= 0) {
      console.log("Invalid amount.");
    } else if (amount > this.money) {
      console.log("Insufficient funds.");
    } else {
      this.money -= amount;

      this.addHistory(`Withdraw: $${amount} | Balance: $${this.money}`);
      console.log(`You now have $${this.money}`);
    }
  }

  deposit() {
    let amount = parseInt(prompt("Deposit amount: "));
    if (isNaN(amount) || amount <= 0) {
      console.log("Invalid amount.");
    } else if (amount > 1000) {
      console.log("You can't deposit more than $1000.");
    } else {
      this.money += amount;

      this.addHistory(`Deposit: $${amount} | Balance: $${this.money}`);

      console.log(`Your new balance is $${this.money}`);
    }
  }

  invest() {
    console.log("Investment feature coming soon.");
  }

  showHistory() {
    if (this.history.length === 0) {
      console.log("No transactions yet.");
    } else {
      console.log("\n===== TRANSACTION HISTORY =====");
      for (let h of this.history) {
        console.log(h);
      }
    }
  }

  static login(users) {
    let loggedUser = null;

    while (!loggedUser) {
      let email = prompt("Email: ");
      let password = prompt("Password: ");

      let user = users.find((u) => u.email === email);

      if (!user) {
        console.log("Email not found.");
      } else if (user.password !== password) {
        console.log("Wrong password.");
      } else {
        console.log(`WELCOME ${user.name}`);
        loggedUser = user;
      }
    }
    return loggedUser;
  }
}

//TODO: Menu options

let users = [];

while (true) {
  console.log("\n===== BANK SYSTEM =====");
  console.log("1) Sign Up");
  console.log("2) Log In");
  console.log("3) Change Password");
  console.log("4) Exit");

  let choice = prompt("==> ");

  //!SIGN- UP SECTION
  if (choice === "1") {
    let name = "";
    while (!name || !validateName(name) || users.some((u) => u.name === name)) {
      name = prompt("Name: ");
    }

    let email = "";
    while (!email || !validateEmail(email) || users.some((u) => u.email === email)) {
      email = prompt("Email: ");
    }

    let age = "";
    while (!age || !validateAge(age)) {
      age = prompt("Age: ");
    }

    let password = "";
    while (!password || !validatePassword(password)) {
      password = prompt("Password: ");
    }

    let confirm = "";
    while (confirm !== password) {
      confirm = prompt("Confirm password: ");
    }

    users.push(new User(name, email, age, password));
    console.log(`User ${name} created successfully!`);
  }

  //!LOGIN SECTION
  else if (choice === "2") {
    let loggedInUser = User.login(users);

    let inMenu = true;
    while (inMenu) {
      console.log("\n1) Logout");
      console.log("2) Withdraw");
      console.log("3) Deposit");
      console.log("4) Loan");
      console.log("5) Invest");
      console.log("6) History");
      console.log("7) Exit");

      let m = prompt("==> ");

      if (m === "1" || m === "7") {
        console.log("Logging out...");
        inMenu = false;
      } else if (m === "2") {
        loggedInUser.withdraw();
      } else if (m === "3") {
        loggedInUser.deposit();
      } else if (m === "4") {
        console.log("====Not done yet :( ====");
      } else if (m === "5") {
        console.log("====Not done yet :( ====");
      } else if (m === "6") {
        loggedInUser.showHistory();
      } else {
        console.log("Invalid option.");
      }
    }
  }

  //!CHANGING PASSWORD SECTION
  else if (choice === "3") {
    let email = prompt("Enter your email: ");
    let user = users.find((u) => u.email === email);

    if (!user) {
      console.log("Email not found.");
    } else {
      let newPass = "";
      while (!newPass || !validatePassword(newPass)) {
        newPass = prompt("New password: ");
      }
      user.password = newPass;
      console.log("Password updated successfully.");
    }
  }

  //!EXITING
  else if (choice === "4" || choice.toLowerCase() === "exit") {
    console.log("Exiting..");
    break;
  }
}
