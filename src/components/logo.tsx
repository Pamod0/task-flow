import { ClipboardCheck } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <ClipboardCheck className="h-6 w-6 text-primary" />
      <span className="font-semibold text-lg text-foreground group-data-[collapsible=icon]:hidden">TaskFlow</span>
    </div>
  );
}
