var input = document.querySelector("#input");
var inputKey = document.querySelector("#inputkey");
var btn = document.querySelector("#btn");
var btn2 = document.querySelector("#btn2");
var ul1 = document.querySelector(".ul1");
var ul2 = document.querySelector(".ul2");
var encryption_list = document.createElement("li");
var decryption_list = document.createElement("li");

function encrypt(plaintext, key) {
   // Convert the plaintext and key to uppercase
   plaintext = plaintext.toUpperCase();
   key = key.toUpperCase();

   // Create an empty ciphertext string
   let ciphertext = "";

   // Loop through each character in the plaintext
   for (let i = 0; i < plaintext.length; i++) {
      // Get the index of the current character in the alphabet
      let charIndex = plaintext.charCodeAt(i) - 65;

      // Check if the current character is a letter
      if (charIndex >= 0 && charIndex <= 25) {
         // Replace the current character with the corresponding character in the key
         ciphertext += key.charAt(charIndex);
      } else {
         // Leave non-letter characters unchanged
         ciphertext += plaintext.charAt(i);
      }
   }

   // Return the ciphertext
   return ciphertext;
}

function decrypt(ciphertext, key) {
   // Convert the ciphertext and key to uppercase
   ciphertext = ciphertext.toUpperCase();
   key = key.toUpperCase();

   // Create an empty plaintext string
   let plaintext = "";

   // Loop through each character in the ciphertext
   for (let i = 0; i < ciphertext.length; i++) {
      // Get the index of the current character in the key
      let charIndex = key.indexOf(ciphertext.charAt(i));

      // Check if the current character is a letter
      if (charIndex >= 0 && charIndex <= 25) {
         // Replace the current character with the corresponding character in the alphabet
         plaintext += String.fromCharCode(charIndex + 65);
      } else {
         // Leave non-letter characters unchanged
         plaintext += ciphertext.charAt(i);
      }
   }

   // Return the plaintext
   return plaintext;
}

// Example usage:
// let plaintext = "ATTACK AT DAWN";
// let key = "DEFGHIJKLMNOPQRSTUVWXYZABC";
// let ciphertext = encrypt(plaintext, key); //encrypt(plaintext, key)
// console.log(ciphertext); // "DWWDFN DW GDZQ"
// let decryptedText = decrypt(ciphertext, key);
// console.log(decryptedText); // "ATTACK AT DAWN"

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
