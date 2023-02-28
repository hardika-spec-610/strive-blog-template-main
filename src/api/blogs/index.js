// *********************************************** USERS RELATED ENDPOINTS ******************************************

/* ************************************************* USERS CRUD ENDPOINTS *******************************************

1. CREATE --> POST http://localhost:3001/users/ (+ body)
2. READ --> GET http://localhost:3001/users/ (+ optional query search params)
3. READ (single user) --> GET http://localhost:3001/users/:userId
4. UPDATE (single user) --> PUT http://localhost:3001/users/:userId (+ body)
5. DELETE (single user) --> DELETE http://localhost:3001/users/:userId

*/

import Express from "express"; // 3RD PARTY MODULE (npm i express)
import fs from "fs"; // CORE MODULE (no need to install it!!!!)
import { fileURLToPath } from "url"; // CORE MODULE
import { dirname, join } from "path"; // CORE MODULE
import uniqid from "uniqid";

const authorsRouter = Express.Router(); // an Express Router is a set of similar endpoints grouped in the same collection
// ******************** HOW TO GET USERS.JSON PATH **********************

// target --> F:\Work\Epicode\2022\EN\BE-Master-04\U4\epicode-u4-d2-4\src\api\users\users.json

// 1. We gonna start from the current's file path F:\Work\Epicode\2022\EN\BE-Master-04\U4\epicode-u4-d2-4\src\api\users\index.js
console.log("CURRENT FILE URL:", import.meta.url);
console.log("CURRENT FILE PATH:", fileURLToPath(import.meta.url));
// // 2. We can then obtain the parent's folder path F:\Work\Epicode\2022\EN\BE-Master-04\U4\epicode-u4-d2-4\src\api\users\
console.log("PARENT'S FOLDER PATH:", dirname(fileURLToPath(import.meta.url)));
// // 3. Finally we can concatenate parent's folder path with "users.json" --> F:\Work\Epicode\2022\EN\BE-Master-04\U4\epicode-u4-d2-4\src\api\users\users.json
console.log(
  "TARGET:",
  join(dirname(fileURLToPath(import.meta.url)), "blog.json")
); // WHEN YOU CONCATENATE TWO PATHS TOGETHER USE JOIN!!! (not the '+' symbol)

const authorJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blog.json"
);
console.log(
  "TARGET:",
  join(dirname(fileURLToPath(import.meta.url)), "blog.json")
);

// 1.
authorsRouter.post("/", (req, res) => {
  console.log({ message: "Post" });
});

// 2.
authorsRouter.get("/", (req, res) => {
  // 1. Read the content of users.json file
  const fileContentAsBuffer = fs.readFileSync(authorJSONPath); // This is going to give us back a BUFFER object, which is a MACHINE READABLE FORMAT
  //console.log("FILE CONTENT:", fileContentAsBuffer)

  // 2. We shall convert the buffer into an array
  //console.log("FILE CONTENT AS ARRAY:", JSON.parse(fileContentAsBuffer))
  const blogsArray = JSON.parse(fileContentAsBuffer);

  // 3. Send the array of users back as response
  res.send(blogsArray);
});

// 3.
authorsRouter.get("/:authorId", (req, res) => {});

// 4.
authorsRouter.put("/:authorId", (req, res) => {});

// 5.
authorsRouter.delete("/:authorId", (req, res) => {});

export default authorsRouter;
