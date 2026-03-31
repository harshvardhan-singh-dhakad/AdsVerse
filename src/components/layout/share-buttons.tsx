"use client";

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export function ShareButtons() {
    const pathname = usePathname();
    const url = `https://adsverse.in${pathname}`;

    const handleShare = (platform: string) => {
        let shareUrl = "";
        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Check%20out%20AdsVerse!`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case "copy":
                navigator.clipboard.writeText(url);
                toast({
                    title: "Link Copied!",
                    description: "Site URL copied to clipboard.",
                });
                return;
        }
        if (shareUrl) window.open(shareUrl, "_blank");
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="text-sm font-medium text-muted-foreground mr-2 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share AdsVerse:
            </span>
            <Button
                size="sm"
                variant="outline"
                className="rounded-full hover:bg-primary/20"
                onClick={() => handleShare("facebook")}
            >
                <Facebook className="w-4 h-4 mr-2" /> Facebook
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="rounded-full hover:bg-primary/20"
                onClick={() => handleShare("twitter")}
            >
                <Twitter className="w-4 h-4 mr-2" /> X
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="rounded-full hover:bg-primary/20"
                onClick={() => handleShare("linkedin")}
            >
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="rounded-full hover:bg-accent/20"
                onClick={() => handleShare("copy")}
            >
                <LinkIcon className="w-4 h-4 mr-2" /> Copy link
            </Button>
        </div>
    );
}
