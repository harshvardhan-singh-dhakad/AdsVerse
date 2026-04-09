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
  Type, Palette, ChevronDown
} from 'lucide-react';
import { Extension } from '@tiptap/core';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// Custom Font Size Extension
const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }: any) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run();
      },
      unsetFontSize: () => ({ chain }: any) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run();
      },
    } as any;
  },
});

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      TextStyle,
      Color,
      FontSize,
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
    immediatelyRender: false,
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
    <div className={cn('flex flex-col rounded-3xl border border-border/10 bg-muted/5 overflow-visible ring-1 ring-white/5 shadow-2xl transition-all hover:border-border/20', className)}>
      {/* Editor Content */}
      <div className="relative group flex-1 rounded-t-3xl overflow-hidden">
        <EditorContent editor={editor} />
        {editor && (
          <BubbleMenu 
            editor={editor} 
            options={{ placement: 'top', offset: 8 }}
            className="z-[9999] relative"
          >
            <div className="flex items-center gap-1 p-1 bg-muted/95 backdrop-blur-xl rounded-2xl border border-border/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/10 animate-in fade-in zoom-in duration-200">
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
                
                {/* Color Picker */}
                <MenuButton 
                  onClick={() => {}} 
                  isActive={editor.isActive('textStyle', { color: editor.getAttributes('textStyle').color })}
                  tooltip="Text Color"
                >
                  <label className="cursor-pointer flex items-center justify-center w-full h-full">
                    <input 
                      type="color" 
                      className="sr-only"
                      onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
                      value={editor.getAttributes('textStyle').color || '#ffffff'}
                    />
                    <Palette className="h-3.5 w-3.5" style={{ color: editor.getAttributes('textStyle').color || 'inherit' }} />
                  </label>
                </MenuButton>

                {/* Font Size Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-1.5 gap-0.5 text-muted-foreground hover:bg-muted-foreground/10 rounded-md"
                      title="Font Size"
                    >
                      <span className="text-[10px] font-bold">
                        {editor.getAttributes('textStyle').fontSize?.replace('px', '') || '16'}
                      </span>
                      <ChevronDown className="h-2.5 w-2.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-16 bg-muted/95 backdrop-blur-xl border-border/20 z-[10000]">
                    {['12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'].map((size) => (
                      <DropdownMenuItem 
                        key={size}
                        onClick={() => (editor as any).commands.setFontSize(size)}
                        className="text-[10px] py-1 px-2 focus:bg-primary/20 focus:text-primary cursor-pointer font-bold"
                      >
                        {size.replace('px', '')}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-1 px-1 border-r border-border/10">
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  isActive={editor.isActive('bulletList')}
                  tooltip="Bullet List"
                >
                  <List className="h-3.5 w-3.5" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  isActive={editor.isActive('orderedList')}
                  tooltip="Number List"
                >
                  <ListOrdered className="h-3.5 w-3.5" />
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
                <MenuButton 
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  isActive={editor.isActive('blockquote')}
                  tooltip="Quote"
                >
                  <Quote className="h-3.5 w-3.5" />
                </MenuButton>
              </div>
            </div>
          </BubbleMenu>
        )}
      </div>

      {/* Toolbar (Moved to Bottom + Mobile Scroll) */}
      <div className="flex flex-nowrap md:flex-wrap items-center gap-1 p-2 bg-muted/90 backdrop-blur-lg border-t border-border/20 sticky bottom-0 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] overflow-x-auto no-scrollbar scroll-smooth">
        {/* Heading Group */}
        <div className="flex items-center gap-1 px-2 border-r border-border/10 mr-1 shrink-0">
          <MenuButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            tooltip="H2"
          >
            <Heading2 className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            tooltip="H3"
          >
            <Heading3 className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            isActive={editor.isActive('heading', { level: 4 })}
            tooltip="H4"
          >
            <Heading4 className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive('paragraph')}
            tooltip="Regular Text"
          >
            <Type className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Styles Group */}
        <div className="flex items-center gap-1 px-2 border-r border-border/10 mr-1 shrink-0">
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
          
          {/* Color Picker */}
          <div className="relative group/color">
            <MenuButton 
              onClick={() => {}} // Controlled by label click
              isActive={editor.isActive('textStyle', { color: editor.getAttributes('textStyle').color })}
              tooltip="Text Color"
            >
              <label className="cursor-pointer flex items-center justify-center w-full h-full">
                <input 
                  type="color" 
                  className="sr-only"
                  onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
                  value={editor.getAttributes('textStyle').color || '#ffffff'}
                />
                <Palette className="h-4 w-4" style={{ color: editor.getAttributes('textStyle').color || 'inherit' }} />
              </label>
            </MenuButton>
          </div>

          {/* Font Size Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 gap-1 text-muted-foreground hover:bg-muted-foreground/10 rounded-md"
                title="Font Size"
              >
                <span className="text-xs font-medium">
                  {editor.getAttributes('textStyle').fontSize?.replace('px', '') || '16'}
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-20 bg-muted/95 backdrop-blur-xl border-border/20 z-[100]">
              {['12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'].map((size) => (
                <DropdownMenuItem 
                  key={size}
                  onClick={() => (editor as any).commands.setFontSize(size)}
                  className="text-xs focus:bg-primary/20 focus:text-primary cursor-pointer"
                >
                  {size.replace('px', '')}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem 
                onClick={() => (editor as any).commands.unsetFontSize()}
                className="text-xs focus:bg-destructive/20 focus:text-destructive cursor-pointer border-t border-border/10 mt-1"
              >
                Reset
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Lists & Link Group */}
        <div className="flex items-center gap-1 px-2 border-r border-border/10 mr-1 shrink-0">
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
            tooltip="Number List"
          >
            <ListOrdered className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => {
              const url = prompt('Enter URL');
              if (url) editor.chain().focus().toggleLink({ href: url }).run();
            }}
            isActive={editor.isActive('link')}
            tooltip="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </MenuButton>
          <MenuButton 
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            tooltip="Quote"
          >
            <Quote className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Helper Group (Undo/Redo) */}
        <div className="flex items-center gap-1 px-2 border-r border-border/10 mr-1 ml-auto shrink-0">
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
        </div>
      </div>

      {/* Word Counter & Navigation Help */}
      <div className="flex items-center justify-between px-6 py-3 bg-primary/5 border-t border-border/10 backdrop-blur-sm rounded-b-3xl shrink-0">
        <div className="flex gap-8 items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Words</span>
            <span className="text-lg font-headline font-bold text-primary leading-tight">
              {editor.storage.characterCount.words()}
            </span>
          </div>
          <div className="h-8 w-[1px] bg-border/20" />
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Characters</span>
            <span className="text-lg font-headline font-bold text-muted-foreground/80 leading-tight">
              {editor.storage.characterCount.characters()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-inner">
          <div className="relative">
            <span className="absolute inset-0 h-2 w-2 rounded-full bg-primary animate-ping opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Live Writing Active</span>
        </div>
      </div>
    </div>
  );
}
