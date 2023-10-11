var input = document.querySelector("#input");
var inputKey = document.querySelector("#inputkey");
var btn = document.querySelector("#btn");
var btn2 = document.querySelector("#btn2");
var ul1 = document.querySelector(".ul1");
var ul2 = document.querySelector(".ul2");
var encryption_list = document.createElement("li");
var decryption_list = document.createElement("li");

function generateKeyTable(key) {
   // Create a 5x5 matrix filled with 0's
   // const keyTable = Array.from(Array(5), () => new Array(5).fill(0));
   const keyTable = [];
   for (let i = 0; i < 5; i++) {
      keyTable.push(new Array(5).fill(0));
   }

   // Remove duplicate letters from the key
   const keyWithoutDuplicates = [
      ...new Set(key.replace(/j/g, "i").split("")),
   ].join("");

   // Add the key to the key table
   let row = 0,
      col = 0;

   for (let i = 0; i < keyWithoutDuplicates.length; i++) {
      const char = keyWithoutDuplicates[i];
      keyTable[row][col] = char;
      col++;

      if (col === 5) {
         col = 0;
         row++;
      }
   }

   // Add the remaining letters of the alphabet to the key table
   const alphabet = "abcdefghiklmnopqrstuvwxyz";
   for (let i = 0; i < alphabet.length; i++) {
      const char = alphabet[i];
      if (char === "j") {
         continue;
      }

      if (!keyWithoutDuplicates.includes(char)) {
         keyTable[row][col] = char;
         col++;

         if (col === 5) {
            col = 0;
            row++;
         }
      }
   }

   return keyTable;
}

function playfairEncrypt(plaintext, key) {
   const keyTable = generateKeyTable(key);

   // Remove any non-alphabetic characters from the plaintext
   plaintext = plaintext.replace(/[^a-z]/gi, "").toLowerCase();

   // Break the plaintext into pairs of letters
   let pairs = [];
   for (let i = 0; i < plaintext.length; i += 2) {
      if (plaintext[i] === plaintext[i + 1]) {
         pairs.push(plaintext[i] + "x");
         i--;
      } else if (i === plaintext.length - 1) {
         pairs.push(plaintext[i] + "x");
      } else {
         pairs.push(plaintext[i] + plaintext[i + 1]);
      }
   }

   // Encrypt each pair of letters
   let ciphertext = "";
   for (const pair of pairs) {
      const char1 = pair[0];
      const char2 = pair[1];

      let row1, col1, row2, col2;

      for (let row = 0; row < 5; row++) {
         for (let col = 0; col < 5; col++) {
            if (keyTable[row][col] === char1) {
               row1 = row;
               col1 = col;
            } else if (keyTable[row][col] === char2) {
               row2 = row;
               col2 = col;
            }
         }
      }

      if (row1 === row2) {
         col1 = (col1 + 1) % 5;
         col2 = (col2 + 1) % 5;
      } else if (col1 === col2) {
         row1 = (row1 + 1) % 5;
         row2 = (row2 + 1) % 5;
      } else {
         [col1, col2] = [col2, col1];
      }

      ciphertext += keyTable[row1][col1] + keyTable[row2][col2];
   }

   return ciphertext;
}

//find letter function
function findLetterInKeyTable(keyTable, letter) {
   for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
         if (keyTable[i][j] === letter) {
            return [i, j];
         }
      }
   }
}

// Deceypt function
function decrypt(ciphertext, key) {
   // Generate the key table from the key
   const keyTable = generateKeyTable(key);

   // Remove any non-alphabetic characters from the ciphertext
   ciphertext = ciphertext.replace(/[^a-z]/gi, "").toLowerCase();

   // Divide the ciphertext into pairs of letters (digraphs)
   const pairs = [];
   for (let i = 0; i < ciphertext.length; i += 2) {
      pairs.push(ciphertext.slice(i, i + 2));
   }

   // Decrypt each pair of letters using the key table
   let plaintext = "";
   for (let i = 0; i < pairs.length; i++) {
      const [a, b] = pairs[i];

      // Find the rows and columns of the letters in the key table
      const [row1, col1] = findLetterInKeyTable(keyTable, a);
      const [row2, col2] = findLetterInKeyTable(keyTable, b);

      // Decrypt the letters using the same rules as encryption
      let decryptedPair = "";
      if (row1 === row2) {
         // Same row
         decryptedPair += keyTable[row1][(col1 - 1 + 5) % 5];
         decryptedPair += keyTable[row2][(col2 - 1 + 5) % 5];
      } else if (col1 === col2) {
         // Same column
         decryptedPair += keyTable[(row1 - 1 + 5) % 5][col1];
         decryptedPair += keyTable[(row2 - 1 + 5) % 5][col2];
      } else {
         // Rectangle rule
         decryptedPair += keyTable[row1][col2];
         decryptedPair += keyTable[row2][col1];
      }

      plaintext += decryptedPair;
   }

   // Remove any padding 'x' characters
   // plaintext = plaintext.replace(/x/g, "");
   let i = 0;
   while (i < plaintext.length) {
      if (plaintext[i] === "x" && plaintext[i - 1] === plaintext[i + 1]) {
         plaintext = plaintext.slice(0, i) + plaintext.slice(i + 1);
      } else {
         i++;
      }
   }

   return plaintext;
}

// let plaintext = "come to the party next friday";
// let key = "example";

// let ciphertext = playfairEncrypt(plaintext, key);
// let decipherText = decrypt(key, ciphertext);

// console.log(`plainText : ${plaintext}`);
// console.log(`key : ${key}`);
// console.log(`cipher text : ${ciphertext}`);
// console.log(`DEcipher text : ${decipherText}`);

input.addEventListener("change", () => {
   inputKey.addEventListener("change", () => {
      const message = input.value;
      const key = inputKey.value;

      // console.log(message);
      // console.log(key);

      const encryptedMessage = playfairEncrypt(message, key);
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
