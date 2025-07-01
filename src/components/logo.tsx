import { ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ textClassName }: { textClassName?: string }) {
  return (
    <div className="flex items-center gap-2">
      <ClipboardCheck className="h-6 w-6 text-primary" />
      <span className={cn("font-semibold text-lg text-foreground", textClassName)}>TaskFlow</span>
    </div>
  );
}
