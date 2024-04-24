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
import { EditableTSnippetFields } from "../App";

type SnippetMDProps = {
  content: string | null;
  handleSnippetChange: <P extends keyof Pick<EditableTSnippetFields, "content">>(
    prop: P,
    value: EditableTSnippetFields[P],
  ) => void;
};

export default function SnippetMD({ content, handleSnippetChange }: SnippetMDProps) {
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.setMarkdown(content);
  }, [content]);

  return (
    <>
      <MDXEditor
        placeholder={"# Markdown goes here"}
        ref={ref}
        onChange={() => handleSnippetChange("content", ref.current?.getMarkdown())}
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
