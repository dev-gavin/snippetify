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
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function MDEditor() {
  const handleMDChange = (markdown: string) => {
    console.log(markdown);
  };

  return (
    <>
      <MDXEditor
        onChange={handleMDChange}
        markdown={"# Markdown goes here..."}
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
