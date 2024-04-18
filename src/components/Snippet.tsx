import MDEditor from "./MDEditor";

export default function Snippet({ title, content, author }) {
  return (
    <>
      <h1>{title}</h1>
      <p>{author}</p>
      <MDEditor />
    </>
  );
}
