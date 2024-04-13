import app from "./server";

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Hello on http://localhost:${PORT}`);
});
