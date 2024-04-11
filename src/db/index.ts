import dbConnection from "./dbConnection";

type UserCredentials = { username: string; password: string };

function createUser({ username, password }: UserCredentials) {
  const createUserQuery = `
    INSERT INTO users (username, password) VALUES
    (?, ?)`;

  return new Promise((resolve, reject) => {
    dbConnection.run(createUserQuery, [username, password], function (err) {
      if (err) {
        reject(new Error(err.message));
      } else {
        resolve(this.lastID);
      }
    });
  });
}

console.log(await createUser({ username: "gavin", password: "paswd" }));
