import dbConnection from "./dbConnection";

function runQuery(query, params) {
  return new Promise((resolve, reject) => {
    dbConnection.run(query, params, function (err) {
      if (err) {
        reject(new Error(err.message));
      } else {
        resolve(this.lastID);
      }
    });
  });
}

type UserRecord = { username: string; password: string };

function createUser({ username, password }: UserRecord) {
  const createUserQuery = `
    INSERT INTO users (username, password) VALUES
    (?, ?)`;

  return runQuery(createUserQuery, [username, password]);
}

type SnippetRecord = {
  snippetTitle: string;
  snippetContent: string;
  userId: number;
};

export function createSnippet({
  snippetTitle,
  snippetContent,
  userId,
}: SnippetRecord) {
  const createUserQuery = `
    INSERT INTO snippets (title, content, created_by_user_id) VALUES
    (?, ?, ?)`;

  return runQuery(createUserQuery, [snippetTitle, snippetContent, userId]);
}

export async function getSnippet({ snippetId }) {
  const getSnippetByIdQuery = `
    SELECT * FROM snippets s WHERE s.id = ?;
  `;
  return new Promise((res, rej) => {
    dbConnection.get(getSnippetByIdQuery, [snippetId], (err, row) => {
      // console.log(row);
      if (err) {
        rej(new Error(err.message));
        return;
      }
      res(row);
    });
  });
}
