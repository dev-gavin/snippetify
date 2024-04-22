import {
  MDXEditor,
  headingsPlugin,
  thematicBreakPlugin,
  listsPlugin,
  toolbarPlugin,
  markdownShortcutPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertThematicBreak,
  ListsToggle,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useEffect, useRef } from "react";

// TODO: better typing
export default function SnippetMD({
  content,
  handleSnippetContentChange,
}: {
  content: string;
  handleSnippetContentChange: Function;
}) {
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.setMarkdown(content);
  }, [content]);

  const handleSave = () => {
    console.log(ref.current?.getMarkdown());
  };

  return (
    <>
      <MDXEditor
        placeholder={"# Markdown goes here"}
        ref={ref}
        onChange={() => handleSnippetContentChange(ref.current?.getMarkdown())}
        markdown={"tets"}
        plugins={[
          headingsPlugin(),
          thematicBreakPlugin(),
          listsPlugin(),
          diffSourcePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <InsertThematicBreak />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
          markdownShortcutPlugin(),
        ]}
      />
      <button className="bg-black p-4 text-white" onClick={handleSave}>
        Save Snippet
      </button>
    </>
  );
}
