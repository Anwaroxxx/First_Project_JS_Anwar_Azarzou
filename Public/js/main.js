const prompt = require("prompt-sync")(); //!For prompting in Terminal.

//!validation of name
function validateName(name) {
  name = name.trim();

  let lettersOnly = name.split(" ").join("");
  if (lettersOnly.length < 5) {
    return false;
  }

  for (let i = 0; i < name.length; i++) {
    let char = name[i];
    if (char !== " " &&
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



let users = [];

while (true) {
  let greetings = prompt(`Hello To Our Bank! \n
        Choose an Option: \n
        1) Sign up\n
        2) Log in\n
        3) Change Password\n
        4) Exit\n`);

  if (greetings === "exit") {
    console.log("Exiting...");
    break;
  }

  if (greetings === "1") {
    let userName = "";
    while (!userName || !validateName(userName)) {
      userName = prompt("Enter your full name: ");
      if (!userName || !validateName(userName)) {
        console.log("Invalid name. Please try again.");
      }
    }

    let userEmail = "";
    while (
      !userEmail ||
      !validateEmail(userEmail) ||
      users.some((user) => user.email === userEmail)
    ) {
      userEmail = prompt("Enter your email: ");
      if (!userEmail || !validateEmail(userEmail)) {
        console.log("Invalid email. Please try again.");
      } else if (users.some((user) => user.email === userEmail)) {
        console.log("Email already exists. Please try again.");
      }
    }

    let userAge = "";
    while (!userAge || !validateAge(userAge)) {
      userAge = prompt("Enter your age: ");
      if (!userAge || !validateAge(userAge)) {
        console.log("Invalid age. Please try again.");
      }
    }

    let userPassword = "";
    while (!userPassword || !validatePassword(userPassword)) {
      userPassword = prompt("Enter your password: ");
      if (!userPassword || !validatePassword(userPassword)) {
        console.log("Invalid password. Please try again.");
      }
    }

    users.push({
      name: userName,
      email: userEmail,
      age: userAge,
      password: userPassword,
    });
    console.log("User registered successfully:", userName);
  }
}
