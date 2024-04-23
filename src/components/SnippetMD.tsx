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

export default function SnippetMD({
  content,
  handleSnippetContentChange,
}: {
  content: string;
  // TODO: better typing
  handleSnippetContentChange;
}) {
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.setMarkdown(content);
  }, [content]);

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
    </>
  );
}
