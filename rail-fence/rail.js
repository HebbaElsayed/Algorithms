var input = document.querySelector("#input");
var inputKey = document.querySelector("#inputKey");
var btn = document.querySelector("#btn");
var btn2 = document.querySelector("#btn2");
var ul1 = document.querySelector(".ul1");
var ul2 = document.querySelector(".ul2");
var encryption_list = document.createElement("li");
var decryption_list = document.createElement("li");

function railFenceCipher(message, key, mode) {
   let result = "";

   if (mode === "encrypt") {
      let railMatrix = Array.from({ length: key }, () =>
         Array(message.length).fill("")
      );
      let railNumber = 0;
      let direction = 1;

      for (let i = 0; i < message.length; i++) {
         railMatrix[railNumber][i] = message[i];

         // Change direction when hitting top or bottom rail
         if (railNumber === 0) {
            direction = 1;
         } else if (railNumber === key - 1) {
            direction = -1;
         }

         railNumber += direction;
      }

      // Flatten the rail matrix
      result = railMatrix.flat().join("");
   } else if (mode === "decrypt") {
      let railMatrix = Array.from({ length: key }, () =>
         Array(message.length).fill("")
      );
      let railNumber = 0;
      let direction = 1;

      // Fill the rail matrix with placeholder characters
      for (let i = 0; i < message.length; i++) {
         railMatrix[railNumber][i] = "*";

         // Change direction when hitting top or bottom rail
         if (railNumber === 0) {
            direction = 1;
         } else if (railNumber === key - 1) {
            direction = -1;
         }

         railNumber += direction;
      }

      // Fill the rail matrix with ciphertext characters
      let index = 0;
      for (let i = 0; i < key; i++) {
         for (let j = 0; j < message.length; j++) {
            if (railMatrix[i][j] === "*") {
               railMatrix[i][j] = message[index];
               index++;
            }
         }
      }

      // Read ciphertext from the rail matrix
      railNumber = 0;
      direction = 1;
      for (let i = 0; i < message.length; i++) {
         result += railMatrix[railNumber][i];

         // Change direction when hitting top or bottom rail
         if (railNumber === 0) {
            direction = 1;
         } else if (railNumber === key - 1) {
            direction = -1;
         }

         railNumber += direction;
      }
   } else {
      console.error("Error: invalid mode");
   }

   return result;
}
input.addEventListener("keyup", () => {
   inputKey.addEventListener("keyup", () => {
      const message = input.value;
      const key = inputKey.value;

      const encryptedMessage = railFenceCipher(message, key, "encrypt");
      const decryptedMessage = railFenceCipher(message, key, "decrypt");

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
