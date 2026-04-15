import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { 
  Bold, Italic, List, ListOrdered, Quote, Undo, Redo, 
  Code, Link as LinkIcon, Image as ImageIcon, Underline as UnderlineIcon,
  AlignLeft, AlignCenter, AlignRight, ChevronDown, Highlighter, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ToolbarButton = ({ 
  onClick, 
  isActive = false, 
  children, 
  tooltip,
  className 
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  children: React.ReactNode; 
  tooltip: string;
  className?: string;
}) => (
  <TooltipProvider delayDuration={400}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          className={cn(
            "p-2 rounded-lg transition-all duration-200 group relative overflow-hidden",
            isActive 
              ? "bg-primary/20 text-primary shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)] scale-95" 
              : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50",
            className
          )}
        >
          {children}
          {isActive && (
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-popover text-popover-foreground border-border text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const SectionDivider = () => <div className="w-px h-6 bg-border/40 mx-1" />;

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline decoration-primary/30 underline-offset-4 cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-2xl border border-border/10 shadow-2xl max-w-full my-8',
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Placeholder.configure({
        placeholder: 'Start writing your master-piece here...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm md:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px] px-8 py-10 leading-relaxed',
          'prose-headings:font-headline prose-headings:font-black prose-p:text-foreground/80',
          'prose-a:text-primary prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic'
        ),
      },
    },
  });

  // Sync external value changes with editor
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={cn(
      "relative border border-border/20 rounded-3xl overflow-hidden bg-card/10 backdrop-blur-3xl shadow-2xl group transition-all duration-500 hover:border-border/40",
      className
    )}>
      {/* TOOLBAR */}
      <div className="sticky top-0 z-30 flex flex-wrap items-center gap-0.5 p-2 bg-background/60 backdrop-blur-xl border-b border-border/10 overflow-x-auto no-scrollbar">
        <div className="flex items-center">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            tooltip="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            tooltip="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            tooltip="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#2dd4bf' }).run()}
            isActive={editor.isActive('highlight')}
            tooltip="Highlight"
          >
            <Highlighter className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <SectionDivider />

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors focus:outline-none">
                {editor.isActive('heading', { level: 1 }) ? 'H1' : 
                 editor.isActive('heading', { level: 2 }) ? 'H2' : 
                 editor.isActive('heading', { level: 3 }) ? 'H3' : 'Text'}
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border-border min-w-[120px]">
              <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()} className="font-medium text-xs">
                Normal Text
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="font-black text-xs">
                Headline (H1)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="font-bold text-xs">
                Subhead (H2)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="font-bold text-xs">
                Small (H3)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <SectionDivider />

        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            tooltip="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            tooltip="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            tooltip="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <SectionDivider />

        <div className="flex items-center">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            tooltip="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            tooltip="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            tooltip="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <SectionDivider />

        <div className="flex items-center">
          <ToolbarButton
            onClick={setLink}
            isActive={editor.isActive('link')}
            tooltip="Hyperlink"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={addImage}
            tooltip="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            tooltip="Inline Code"
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            tooltip="Code Block"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m10 10-2 2 2 2"/><path d="m14 14 2-2-2-2"/></svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            tooltip="Clear Formatting"
          >
            <X className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            tooltip="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            tooltip="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      <BubbleMenu editor={editor} className="flex overflow-hidden rounded-full bg-card border border-border/10 shadow-2xl p-1 gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn("p-1.5 rounded-full hover:bg-muted transition-colors", editor.isActive('bold') && "text-primary bg-primary/10")}
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn("p-1.5 rounded-full hover:bg-muted transition-colors", editor.isActive('italic') && "text-primary bg-primary/10")}
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={setLink}
          className={cn("p-1.5 rounded-full hover:bg-muted transition-colors", editor.isActive('link') && "text-primary bg-primary/10")}
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>
      </BubbleMenu>

      <FloatingMenu editor={editor} className="flex flex-col overflow-hidden rounded-xl bg-card border border-border/10 shadow-2xl p-1 min-w-[140px]">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold hover:bg-muted transition-colors text-left"
        >
          <span className="w-4">H1</span> Heading 1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold hover:bg-muted transition-colors text-left"
        >
          <span className="w-4">H2</span> Heading 2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold hover:bg-muted transition-colors text-left"
        >
          <List className="w-4 h-4" /> Bullet List
        </button>
        <button
          onClick={addImage}
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold hover:bg-muted transition-colors text-left"
        >
          <ImageIcon className="w-4 h-4" /> Image
        </button>
      </FloatingMenu>

      <div className="relative group/editor">
        <EditorContent editor={editor} />
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none opacity-50" />
      </div>
    </div>
  );
}
