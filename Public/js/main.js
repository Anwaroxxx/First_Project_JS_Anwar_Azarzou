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

let users = [];

while (true) {
  console.log("\nHello To Our Bank!");
  console.log("1) Sign up");
  console.log("2) Log in");
  console.log("3) Change Password");
  console.log("4) Exit");

  let choice = prompt("==> ");

  if (choice === "4" || choice.toLowerCase() === "exit") {
    console.log("exiting...");
    break;
  }

  if (choice === "1") {
    //!--- Name ---
    let userName = "";
    while (!userName || !validateName(userName)) {
      userName = prompt("Enter your name: ");
      if (!validateName(userName)) {
        console.log(
          "Invalid name. Must be letters, min 5 chars, first letters uppercase."
        );
      }
    }

    //!--- Email ---
    let userEmail = "";
    while (
      !userEmail ||
      !validateEmail(userEmail) ||
      users.some((u) => u.email === userEmail)
    ) {
      userEmail = prompt("Enter your email: ");
      if (!validateEmail(userEmail)) {
        console.log(" Invalid email. Try again.");
      } else if (users.some((u) => u.email === userEmail)) {
        console.log("Email already exists. Try another.");
        userEmail = "";
      }
    }

    //!--- Age ---
    let userAge = "";
    while (!userAge || !validateAge(userAge)) {
      userAge = prompt("Enter your age: ");
      if (!validateAge(userAge)) console.log(" Invalid age. Try again.");
    }

    //!--- Password ---
    let userPassword = "";
    while (!userPassword || !validatePassword(userPassword)) {
      userPassword = prompt("Enter your password: ");
      if (!validatePassword(userPassword)) {
        console.log(
          " Invalid password. Min 7 chars and include one special (@#-+*/)."
        );
      }
    }

    //!--- Password Verification ---
    let passVerification = "";
    while (passVerification !== userPassword) {
      passVerification = prompt("Re-enter your password to verify: ");
      if (passVerification !== userPassword) {
        console.log("Passwords do not match. Try again.");
      }
    }

    //!Add user
    users.push({
      name: userName,
      email: userEmail,
      age: userAge,
      password: userPassword,
      money: 1000, 
    });

    console.log(`=====USER SIGNED UP!!!=====\n=====WELCOME : ${userName}=====`);
  } else if (choice === "2") {
    let loggedInUser = null;
    while (!loggedInUser) {
      let userEmail = prompt("Enter your email: ");
      let userPassword = prompt("Enter your password: ");

      let user = users.find((u) => u.email === userEmail);

      if (!user) {
        console.log("Email doesn't exist.");
      } else if (userPassword !== user.password) {
        console.log("Password is wrong.");
      } else {
        loggedInUser = user;
        console.log(
          `=====USER LOGGED IN!!!=====\n=====WELCOME : ${loggedInUser.name}=====`
        )
      }
    }

    let inMenu = true;
    while (inMenu) {
      console.log("1) Log Out");
      console.log("2) Withdraw Money");
      console.log("3) Deposit Money");
      console.log("4) Take a Loan");
      console.log("5) Invest");
      console.log("6) History & Exit");

      let menuChoice = prompt("==> ");

      if (menuChoice === "1" || menuChoice === "6") {
        console.log("Logging out...");
        inMenu = false;
      } else if (menuChoice === "2") {
        let userMoney = loggedInUser.money || 0;
        if (userMoney <= 0) {
          console.log(`You have $0 left`);
        } else {
          let withdraw = parseInt(prompt(`Enter your withdraw value: ==> `));
          if (isNaN(withdraw) || withdraw <= 0) {
            console.log("Invalid amount.");
          } else if (withdraw > userMoney) {
            console.log("Insufficient funds.");
          } else {
            userMoney -= withdraw;
            loggedInUser.money = userMoney;
            console.log(`You have $${userMoney} left`);
          }
        }
      } else if (menuChoice === "3") {
        let userMoney = loggedInUser.money || 0;
        let deposit = parseInt(prompt(`Enter your deposit value : ==>`));
        if(isNaN(deposit) || deposit <= 0){
            console.log(`Enter a valid number`);
        }
        else if(deposit > 1000){
            console.log(`you can't deposit more than $1000`);
        }
        else{
            userMoney += deposit;
            loggedInUser.money = userMoney;
            console.log(`You're new balance is $${userMoney}`);
        }
      } else if (menuChoice === "4") {
        console.log("Loan feature coming soon.");
      } else if (menuChoice === "5") {
        console.log("Investment feature coming soon.");
      } else {
        console.log("Invalid choice. Please select 1-6.");
      }
    }
  }
  else if(choice === '3'){
    let emailVerify = prompt(`Enter your email : `);
    let user = users.find((u) => u.email === emailVerify);
    
    if(user){
      let ModifyPass = "";
      while (!ModifyPass || !validatePassword(ModifyPass)) {
        ModifyPass = prompt(`Enter new password : `);
        if (!validatePassword(ModifyPass)) {
          console.log("Invalid password. Min 7 chars and include one special (@#-+*/).");
        }
      }
      user.password = ModifyPass;
      console.log("Password changed successfully.");
    }
    else{
      console.log(`Your email doesn't exist.`);
    }
  }
}