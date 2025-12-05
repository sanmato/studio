import Link from 'next/link';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-center md:text-left text-sm text-muted-foreground mb-4 md:mb-0">
            Hecho con pasión en Argentina 🇦🇷. © {new Date().getFullYear()} Strategia Libre.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground">
              Agency Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
