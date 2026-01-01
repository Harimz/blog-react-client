import type { JSONContent } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

export const TipTapRenderer = ({
  value,
  className,
}: {
  value: JSONContent | null;
  className?: string;
}) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Underline],
    content: value ?? { type: "doc", content: [{ type: "paragraph" }] },
    editorProps: {
      attributes: { class: "prose prose-sm max-w-none" },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    const next = value ?? { type: "doc", content: [{ type: "paragraph" }] };
    editor.commands.setContent(next, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return null;
  return <EditorContent className={className} editor={editor} />;
};
