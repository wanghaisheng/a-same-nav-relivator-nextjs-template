import Link from "next/link";
import { Button } from '../../primitives/button';
import { Facebook, Twitter, Instagram, Youtube, Globe, ExternalLink } from "lucide-react";

export interface OfficialLinksProps {
  website?: string;
  appStores?: Array<{
    name: string;
    url: string;
    icon?: string;
  }>;
  socialNetworks?: Array<{
    name: string;
    url: string;
  }>;
  className?: string;
}

export function OfficialLinks({
  website,
  appStores = [],
  socialNetworks = [],
  className = "",
}: OfficialLinksProps) {
  // Helper function to render social network icon
  const renderSocialIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("facebook")) return <Facebook className="h-5 w-5" />;
    if (lowerName.includes("twitter") || lowerName.includes("x")) return <Twitter className="h-5 w-5" />;
    if (lowerName.includes("instagram")) return <Instagram className="h-5 w-5" />;
    if (lowerName.includes("youtube")) return <Youtube className="h-5 w-5" />;
    return <ExternalLink className="h-5 w-5" />;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-xl font-semibold">Official Links</h3>
      {website && (
        <div className="mb-4">
          <Button asChild className="w-full justify-start">
            <Link href={website} target="_blank" rel="noopener noreferrer">
              <Globe className="mr-2 h-5 w-5" />
              Official Website
            </Link>
          </Button>
        </div>
      )}
      {appStores.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">App Stores / Downloads</h4>
          <div className="flex flex-wrap gap-2">
            {appStores.map((store) => (
              <Button 
                key={store.name} 
                variant="outline" 
                asChild 
                className="flex items-center gap-2"
              >
                <Link href={store.url} target="_blank" rel="noopener noreferrer">
                  {store.icon ? (
                    <img src={store.icon} alt={store.name} className="h-5 w-5" />
                  ) : (
                    <ExternalLink className="h-5 w-5" />
                  )}
                  {store.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
      {socialNetworks.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Social Networks</h4>
          <div className="flex flex-wrap gap-2">
            {socialNetworks.map((sn) => (
              <Button
                key={sn.name}
                variant="ghost"
                asChild
                className="flex items-center gap-2"
              >
                <Link href={sn.url} target="_blank" rel="noopener noreferrer">
                  {renderSocialIcon(sn.name)}
                  {sn.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
