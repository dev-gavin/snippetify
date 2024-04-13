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

type schema = {
  snippets: {
    title: string;
    content: string;
    userId: number;
  };
};

// type SnippetRecord = { title: string; content: string; userId: number };

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
  console.log(snippetContent);
  const createUserQuery = `
    INSERT INTO snippets (title, content, created_by_user_id) VALUES
    (?, ?, ?)`;

  return runQuery(createUserQuery, [snippetTitle, snippetContent, userId]);
}

console.log(await createUser({ username: "gavin", password: "paswd" }));
