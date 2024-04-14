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

export default function MDEditor({ content }: { content: string }) {
  console.log(content);
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.setMarkdown(content);
  }, [content]);

  return (
    <>
      <MDXEditor
        ref={ref}
        onChange={console.log}
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
