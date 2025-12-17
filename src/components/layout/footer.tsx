import Link from 'next/link';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:justify-between">
          
          <div className="flex flex-col items-center gap-4 md:order-2">
            <div className="flex items-center justify-center gap-2">
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
            </div>
            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground">
              Agency Dashboard
            </Link>
          </div>

          <p className="text-sm text-muted-foreground md:order-1">
            Hecho con pasión en Argentina 🇦🇷. © {new Date().getFullYear()} .merlo.
          </p>

        </div>
      </div>
    </footer>
  );
}
