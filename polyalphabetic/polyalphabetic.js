
var input = document.querySelector("#input");
var inputKey = document.querySelector("#inputkey");
var btn = document.querySelector("#btn");
var btn2 = document.querySelector("#btn2");
var ul1 = document.querySelector(".ul1");
var ul2 = document.querySelector(".ul2");
var encryption_list = document.createElement("li");
var decryption_list = document.createElement("li");

function vigenereCipherEncrypt(message, key) {
   // Convert message and key to uppercase
   message = message.toUpperCase();
   key = key.toUpperCase();

   // Encrypt the message using the Vigenère cipher and key
   let ciphertext = "";
   let keyIndex = 0;
   for (let i = 0; i < message.length; i++) {
      if (message[i] >= "A" && message[i] <= "Z") {
         const plaintextCharCode = message[i].charCodeAt(0) - 65;
         const keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 65;
         const ciphertextCharCode = (plaintextCharCode + keyCharCode) % 26;
         ciphertext += String.fromCharCode(ciphertextCharCode + 65);
         keyIndex++;
      } else {
         ciphertext += message[i];
      }
   }

   return ciphertext;
}

// D(C - k)%26
function vigenereCipherDecrypt(ciphertext, key) {
   // Convert ciphertext and key to uppercase
   ciphertext = ciphertext.toUpperCase();
   key = key.toUpperCase();

   // Decrypt the ciphertext using the Vigenère cipher and key
   let message = "";
   let keyIndex = 0;
   for (let i = 0; i < ciphertext.length; i++) {
      if (ciphertext[i].match(/[A-Z]/)) {
         const ciphertextCharCode = ciphertext[i].charCodeAt(0) - 65;
         const keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 65;
         const plaintextCharCode = (ciphertextCharCode - keyCharCode + 26) % 26;
         message += String.fromCharCode(plaintextCharCode + 65);
         keyIndex++;
      } else {
         message += ciphertext[i];
      }
   }

   return message;
}

// const message = "how to encrypt";
// const key = "key";
// const ciphertext = vigenereCipherEncrypt(message, key);
// console.log(ciphertext);
// const decryptedMessage = vigenereCipherDecrypt(ciphertext, key);
// console.log(decryptedMessage);

input.addEventListener("keyup", () => {
   inputKey.addEventListener("keyup", () => {
      const message = input.value;
      const key = inputKey.value;

      // console.log(message);
      // console.log(key);

      const encryptedMessage = vigenereCipherEncrypt(message, key);
      const decryptedMessage = vigenereCipherDecrypt(message, key);

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
