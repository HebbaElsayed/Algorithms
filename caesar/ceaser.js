// Encrypts text using a shift on s

// ascii code A:Z => 65 : 90   && a:z => 97 : 122

// function encrypt(text, s) {
//   text = text.replace(/\s/g, "");
//   let result = "";
//   for (let i = 0; i < text.length; i++) {
//     let char = text[i];
//     if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
//       let ch = String.fromCharCode(((char.charCodeAt(0) + s - 65) % 26) + 65);
//       result += ch;
//     } else {
//       let ch = String.fromCharCode(((char.charCodeAt(0) + s - 97) % 26) + 97);
//       result += ch;
//     }
//   }
//   return result;
// }

// A  B   C   D   E   F   G   H   I   J   K   L   M   N   O   P   Q   R   S   T   U   V   W   X   Y  Z
// 0  1   2   3   4   5   6   7   8   9  10   11  12  13  14  15 16  17  18  19  20   21 22  23  24  25

// key = 3 ;

// A : Z => 65 : 90
// a : z => 97 : 122
// char -> ascii => charcodeAt(0)
// asci code -> char => fromcharCode()

// ceaser (c+k)%26

var input = document.querySelector("#input");
var inputKey = document.querySelector("#inputkey");
var btn = document.querySelector("#btn");
var btn2 = document.querySelector("#btn2");
var ul1 = document.querySelector(".ul1");
var ul2 = document.querySelector(".ul2");
var encryption_list = document.createElement("li");
var decryption_list = document.createElement("li");

function encrypt(text, s) {
   let result = "";
   for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
         let ch = String.fromCharCode(
            ((char.charCodeAt(0) + s - 65) % 26) + 65
         );
         result += ch;
      } else if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
         let ch = String.fromCharCode(
            ((char.charCodeAt(0) + s - 97) % 26) + 97
         );
         result += ch;
      } else {
         result += char; // leave non-alphabetic characters as they are
      }
   }
   return result;
}

// function decrypt(cipheredText, s) {
//   let result = "";
//   for (let i = 0; i < cipheredText.length; i++) {
//     let char = cipheredText[i];
//     if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
//       let ch = String.fromCharCode(
//         ((char.charCodeAt(0) - s - 65 + 26) % 26) + 65
//       );
//       result += ch;
//     } else {
//       let ch = String.fromCharCode(
//         ((char.charCodeAt(0) - s - 97 + 26) % 26) + 97
//       );
//       result += ch;
//     }
//   }
//   return result;
// }

// (c-k)%26

function decrypt(cipheredText, s) {
   let result = "";
   for (let i = 0; i < cipheredText.length; i++) {
      let char = cipheredText[i];
      if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
         let ch = String.fromCharCode(
            ((char.charCodeAt(0) - s - 65 + 26) % 26) + 65
         );

         result += ch;
      } else if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
         let ch = String.fromCharCode(
            ((char.charCodeAt(0) - s - 97 + 26) % 26) + 97
         );
         result += ch;
      } else {
         result += char; // leave non-alphabetic characters as they are
      }
   }
   return result;
}

// let text = "meet me after the toga party";
// let s = 3;

// const cipherText = encrypt(text, s);
// const DecioherText = decrypt(cipherText, s);

// console.log(`cipher text : ${cipherText}`);
// console.log(`Decipher text : ${DecioherText}`);

input.addEventListener("keyup", () => {
   inputKey.addEventListener("keyup", () => {
      const message = input.value;
      const key = inputKey.value;

      // console.log(message);
      // console.log(key);

      const encryptedMessage = encrypt(message, key);
      const decryptedMessage = decrypt(message, key);

      btn.addEventListener("click", () => {
         encryption_list.classList.add("added-li");
         encryption_list.textContent = `Encrypted Message is ==> ${encryptedMessage}`;

         ul1.appendChild(encryption_list);

         //   console.log(encryptedMessage);
         //   console.log(decryptedMessage);
      });

      btn2.addEventListener("click", () => {
         decryption_list.classList.add("added-li");
         decryption_list.textContent = `Decrypted Message is ==> ${decryptedMessage}`;

         ul2.appendChild(decryption_list);
      });
   });
});
