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
        console.log("Invalid name. Must be letters, min 5 chars, first letters uppercase.");
      }
    }

    //!--- Email ---
    let userEmail = "";
    while (
      !userEmail ||
      !validateEmail(userEmail) ||
      users.some(u => u.email === userEmail)
    ) {
      userEmail = prompt("Enter your email: ");
      if (!validateEmail(userEmail)) {
        console.log(" Invalid email. Try again.");
      } else if (users.some(u => u.email === userEmail)) {
        console.log("Email already exists. Try another.");
        userEmail = ""; // reset to force repeat
      }
    }

    
  }
