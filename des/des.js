var input = document.querySelector("#input");
var inputKey = document.querySelector("#inputKey");
var btn = document.querySelector("#btn");
var ul1 = document.querySelector(".ul1");
var encryption_list = document.createElement("li");

// Define DES class
class DES {
   constructor(key) {
      // Initialize DES with key
      this.key = CryptoJS.enc.Utf8.parse(key);
   }

   encrypt(plaintext) {
      // Perform DES encryption on plaintext
      const encrypted = CryptoJS.DES.encrypt(plaintext, this.key, {
         mode: CryptoJS.mode.ECB,
      });

      // Return ciphertext as hex string
      return CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
   }

   // decrypt(ciphertext) {
   //    // Parse ciphertext from hex string
   //    const ciphertextHex = CryptoJS.enc.Hex.parse(ciphertext);

   //    // Perform DES decryption on ciphertext
   //    const decrypted = CryptoJS.DES.decrypt(
   //       { ciphertext: ciphertextHex },
   //       this.key,
   //       { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
   //    );

   //    // Return decrypted plaintext as UTF-8 string
   //    return decrypted.toString(CryptoJS.enc.Utf8);
   // }
}
// Define DES key and plaintext

input.addEventListener("keyup", () => {
   inputKey.addEventListener("keyup", () => {
      const plaintext = input.value;
      const key = inputKey.value;

      // Perform DES encryption and decryption
      const des = new DES(key);
      const ciphertext = des.encrypt(plaintext);
      // const decrypted = des.decrypt(ciphertext);

      // Print results
      // console.log("Plaintext: ", plaintext);
      // console.log("Ciphertext: ", ciphertext.substring(0, 16));
      // console.log("Decrypted: ", decrypted);

      // const encryptedMessage = railFenceCipher(message, key, "encrypt");
      // const decryptedMessage = railFenceCipher(message, key, "decrypt");

      btn.addEventListener("click", () => {
         encryption_list.classList.add("added-li");
         encryption_list.textContent = `Encrypted Message is ==> ${ciphertext.substring(
            0,
            16
         )}`;

         ul1.appendChild(encryption_list);
      });
   });
});

//const key = "0123456789abcdef";
//const plaintext = "Hello, world!";
