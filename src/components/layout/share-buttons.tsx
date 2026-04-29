"use client";

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Pin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const sharePlatforms = [
    {
        id: "facebook",
        name: "Facebook",
        icon: <Facebook className="w-4 h-4 mr-2" />,
        color: "hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/30",
        url: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    {
        id: "twitter",
        name: "X",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
        ),
        color: "hover:bg-black/20 hover:text-black dark:hover:text-white hover:border-black/30",
        url: (url: string) => `https://twitter.com/intent/tweet?url=${url}&text=Check%20out%20this%20post%20on%20AdsVerse!`
    },
    {
        id: "whatsapp",
        name: "WhatsApp",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.457l-6.354 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
        ),
        color: "hover:bg-[#25D366]/20 hover:text-[#25D366] hover:border-[#25D366]/30",
        url: (url: string) => `https://wa.me/?text=${encodeURIComponent("Check out this post on AdsVerse: " + url)}`
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        icon: <Linkedin className="w-4 h-4 mr-2" />,
        color: "hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
        url: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    },
    {
        id: "pinterest",
        name: "Pinterest",
        icon: <Pin className="w-4 h-4 mr-2" />,
        color: "hover:bg-[#BD081C]/20 hover:text-[#BD081C] hover:border-[#BD081C]/30",
        url: (url: string) => `https://pinterest.com/pin/create/button/?url=${url}&description=AdsVerse%20Post`
    },
    {
        id: "reddit",
        name: "Reddit",
        icon: <MessageSquare className="w-4 h-4 mr-2" />,
        color: "hover:bg-[#FF4500]/20 hover:text-[#FF4500] hover:border-[#FF4500]/30",
        url: (url: string) => `https://www.reddit.com/submit?url=${url}&title=AdsVerse%20Post`
    },
    {
        id: "telegram",
        name: "Telegram",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12.01 12.01 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.762 5.319-1.056 6.891-.124.664-.37 1.154-.606 1.176-.512.047-.9-.338-1.396-.663-.775-.508-1.213-.824-1.964-1.318-.868-.57-.306-.883.19-1.398.13-.135 2.388-2.19 2.432-2.38.005-.024.01-.115-.05-.166-.06-.051-.148-.034-.212-.02-.09.02-1.53.972-4.307 2.846-.406.279-.773.414-1.101.407-.36-.007-1.054-.203-1.57-.37-.632-.204-1.134-.313-1.09-.661.023-.181.272-.367.74-.556 2.896-1.259 4.827-2.091 5.792-2.494 2.743-1.144 3.313-1.343 3.684-1.348z"/>
            </svg>
        ),
        color: "hover:bg-[#0088cc]/20 hover:text-[#0088cc] hover:border-[#0088cc]/30",
        url: (url: string) => `https://t.me/share/url?url=${url}&text=Check%20out%20this%20post%20on%20AdsVerse!`
    },
    {
        id: "instagram",
        name: "Instagram",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
        ),
        color: "hover:bg-[#E4405F]/20 hover:text-[#E4405F] hover:border-[#E4405F]/30",
        url: null,
        isCopy: true
    },
];

export function ShareButtons() {
    const pathname = usePathname();
    const url = `https://adsverse.in${pathname}`;

    const handleAction = (platform: any) => {
        if (platform.isCopy || platform.id === "copy") {
            navigator.clipboard.writeText(url);
            toast({
                title: "Link Copied!",
                description: platform.id === "instagram" ? "Link copied for Instagram sharing." : "Post link copied to clipboard.",
            });
            return;
        }

        if (platform.url) {
            window.open(platform.url(url), "_blank");
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 mt-12 py-8 border-y border-border/50">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-primary" /> Spread the Knowledge
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30" />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl">
                {sharePlatforms.map((platform) => (
                    <Button
                        key={platform.id}
                        size="sm"
                        variant="outline"
                        className={cn(
                            "rounded-xl h-10 px-4 transition-all duration-300 border-border/40 font-bold text-xs uppercase tracking-wider",
                            platform.color
                        )}
                        onClick={() => handleAction(platform)}
                    >
                        {platform.icon} {platform.name}
                    </Button>
                ))}
                
                <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl h-10 px-4 border-border/40 hover:bg-primary/10 hover:text-primary hover:border-primary/30 font-bold text-xs uppercase tracking-wider transition-all duration-300"
                    onClick={() => handleAction({ id: "copy", isCopy: true })}
                >
                    <LinkIcon className="w-4 h-4 mr-2" /> Copy link
                </Button>
            </div>
        </div>
    );
}
