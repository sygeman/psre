import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  children?: React.ReactNode;
}

export function AdminHeader({ title, description, backHref = "/", children }: AdminHeaderProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={backHref}>
              <Button variant="ghost" size="sm">
                ← Назад
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
          {children && (
            <div className="flex items-center space-x-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 