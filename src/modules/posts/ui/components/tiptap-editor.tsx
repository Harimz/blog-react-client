import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import type { JSONContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  value: JSONContent | null;
  onChange: (value: JSONContent) => void;
}

export const TipTapEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({}), Underline],
    content: value ?? { type: "doc", content: [{ type: "paragraph" }] },
    editorProps: {
      attributes: {
        class:
          "min-h-[240px] rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const next = value ?? { type: "doc", content: [{ type: "paragraph" }] };
    editor.commands.setContent(next, { emitUpdate: false });
  }, [editor]);

  const ToolbarButton = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("h-8 px-2", active && "bg-accent")}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        <ToolbarButton
          active={editor?.isActive("bold") || false}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <span className="font-bold">B</span>
        </ToolbarButton>

        <ToolbarButton
          active={editor?.isActive("italic") || false}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <span className="italic">I</span>
        </ToolbarButton>

        <ToolbarButton
          active={editor?.isActive("strike") || false}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <span className="line-through">S</span>
        </ToolbarButton>

        <ToolbarButton
          active={editor?.isActive("underline") || false}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <span className="underline">U</span>
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};
