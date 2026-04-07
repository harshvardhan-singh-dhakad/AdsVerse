'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Typography from '@tiptap/extension-typography';
import CharacterCount from '@tiptap/extension-character-count';
import { 
  Bold, Italic, List, ListOrdered, Quote, Heading2, Heading3, Heading4,
  Underline as UnderlineIcon, Link as LinkIcon, Undo, Redo, Eraser,
  Type
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const MenuButton = ({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  children,
  tooltip
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  disabled?: boolean;
  children: React.ReactNode;
  tooltip: string;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'h-8 w-8 p-0 rounded-md transition-all duration-200',
      isActive 
        ? 'bg-primary/20 text-primary hover:bg-primary/30 shadow-[0_0_15px_-5px_rgba(var(--primary),0.5)]' 
        : 'text-muted-foreground hover:bg-muted-foreground/10'
    )}
    title={tooltip}
  >
    {children}
  </Button>
);

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Typography,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl border border-border/50 max-w-full',
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your story...',
      }),
      CharacterCount,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose dark:prose-invert max-w-none min-h-[400px] p-6 focus:outline-none leading-relaxed text-foreground/80',
          'prose-headings:font-headline prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4',
          'prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3',
          'prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2',
          'prose-p:my-4 prose-p:leading-8',
          'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:rounded-r-xl',
          'prose-ul:list-disc prose-ol:list-decimal prose-li:my-1'
        ),
      },
    },
  });

  // Sync content if changed externally (e.g. initial load)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className={cn('flex flex-col rounded-3xl border border-border/10 bg-muted/5 overflow-hidden ring-1 ring-white/5 shadow-2xl transition-all hover:border-border/20', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/90 backdrop-blur-lg border-b border-border/20 sticky top-0 z-10">
        <div className="flex items-center gap-1 px-2 border-r border-border/10 mr-1">
          <MenuButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            tooltip="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            tooltip="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            isActive={editor.isActive('heading', { level: 4 })}
            tooltip="Heading 4"
          >
            <Heading4 className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive('paragraph')}
            tooltip="Text"
          >
            <Type className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-border/10 mr-1">
          <MenuButton 
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            tooltip="Bold"
          >
            <Bold className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            tooltip="Italic"
          >
            <Italic className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            tooltip="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-border/10 mr-1">
          <MenuButton 
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            tooltip="Bullet List"
          >
            <List className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            tooltip="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            tooltip="Quote"
          >
            <Quote className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-border/10 mr-1 ml-auto">
          <MenuButton 
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            tooltip="Undo"
          >
            <Undo className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            tooltip="Redo"
          >
            <Redo className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => {
              if (confirm('Clear all formatting and content?')) {
                editor.commands.clearContent();
              }
            }}
            tooltip="Clear"
          >
            <Eraser className="h-4 w-4" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative group">
        <EditorContent editor={editor} />
        {editor && (
          <BubbleMenu editor={editor} options={{ placement: 'top', offset: 8 }}>
            <div className="flex items-center gap-1 p-1 bg-muted/95 backdrop-blur-xl rounded-2xl border border-border/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
              <div className="flex items-center gap-1 px-1 border-r border-border/10">
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  isActive={editor.isActive('heading', { level: 2 })}
                  tooltip="H2"
                >
                  <Heading2 className="h-3.5 w-3.5" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  isActive={editor.isActive('heading', { level: 3 })}
                  tooltip="H3"
                >
                  <Heading3 className="h-3.5 w-3.5" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                  isActive={editor.isActive('heading', { level: 4 })}
                  tooltip="H4"
                >
                  <Heading4 className="h-3.5 w-3.5" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  isActive={editor.isActive('paragraph')}
                  tooltip="Text"
                >
                  <Type className="h-3.5 w-3.5" />
                </MenuButton>
              </div>

              <div className="flex items-center gap-1 px-1 border-r border-border/10">
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  isActive={editor.isActive('bold')}
                  tooltip="Bold"
                >
                  <Bold className="h-3.5 w-3.5" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  isActive={editor.isActive('italic')}
                  tooltip="Italic"
                >
                  <Italic className="h-3.5 w-3.5" />
                </MenuButton>
              </div>
              
              <div className="flex items-center gap-1 px-1">
                <MenuButton 
                  onClick={() => {
                    const url = prompt('URL');
                    if (url) editor.chain().focus().toggleLink({ href: url }).run();
                  }}
                  isActive={editor.isActive('link')}
                  tooltip="Link"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                </MenuButton>
              </div>
            </div>
          </BubbleMenu>
        )}
      </div>


      {/* Character Count / Stats Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/10 border-t border-border/10 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50">
        <div className="flex gap-4">
          <span>{editor.storage.characterCount.words()} Words</span>
          <span>{editor.storage.characterCount.characters()} Characters</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Rich Text Active
        </div>
      </div>
    </div>
  );
}
