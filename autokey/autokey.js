var input = document.querySelector("#input");
var inputKey = document.querySelector("#inputkey");
var btn = document.querySelector("#btn");
var btn2 = document.querySelector("#btn2");
var ul1 = document.querySelector(".ul1");
var ul2 = document.querySelector(".ul2");
var encryption_list = document.createElement("li");
var decryption_list = document.createElement("li");
// Function to encrypt a message using the Autokey Cipher algorithm

function encryptAutoKey(message, key) {
   message = message.toUpperCase().replace(/[^A-Z]/g, "");
   key = key.toUpperCase().replace(/[^A-Z]/g, "");
   let keyStream = key + message;
   let encrypted = "";

   for (let i = 0; i < message.length; i++) {
      let charCodeM = message.charCodeAt(i) - 65;
      let charCodeK = keyStream.charCodeAt(i) - 65;
      let charCodeC = ((charCodeM + charCodeK) % 26) + 65;
      let encryptedChar = String.fromCharCode(charCodeC);
      encrypted += encryptedChar;
   }

   return encrypted;
}

function decryptAutoKey(message, key) {
   message = message.toUpperCase().replace(/[^A-Z]/g, "");
   key = key.toUpperCase().replace(/[^A-Z]/g, "");
   let keyStream = key;
   let decrypted = "";

   for (let i = 0; i < message.length; i++) {
      let charCodeC = message.charCodeAt(i) - 65;
      let charCodeK = keyStream.charCodeAt(i) - 65;
      let charCodeM = ((charCodeC - charCodeK + 26) % 26) + 65;
      let decryptedChar = String.fromCharCode(charCodeM + 32); // Add 32 to convert back to lowercase
      decrypted += decryptedChar;
      keyStream += decryptedChar.toUpperCase();
   }

   return decrypted;
}

// console.log(encryptAutoKey("we love cryptology", "cidmath"));
// console.log(decryptAutoKey("YMOAVXJNCAHJPQXW", "cidmath"));
////////////////////////    YMOAVXJNCAHJPQXW

input.addEventListener("keyup", () => {
   inputKey.addEventListener("keyup", () => {
      const message = input.value;
      const key = inputKey.value;

      // console.log(message);
      // console.log(key);

      const encryptedMessage = encryptAutoKey(message, key, "encrypt");
      const decryptedMessage = decryptAutoKey(message, key, "decrypt");

      btn.addEventListener("click", () => {
         encryption_list.classList.add("added-li");
         encryption_list.textContent = `Encrypted Message is ==> ${encryptedMessage.toLowerCase()}`;

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
