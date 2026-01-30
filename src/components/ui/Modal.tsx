import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  children,
  title,
  description,
  className,
}: ModalProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 transition-opacity duration-200" />
        <BaseDialog.Popup
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-white p-6 shadow-xl data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 transition-all duration-200",
            className,
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              {title && (
                <BaseDialog.Title className="text-lg font-bold text-slate-900">
                  {title}
                </BaseDialog.Title>
              )}
              {description && (
                <BaseDialog.Description className="mt-1 text-sm text-slate-500">
                  {description}
                </BaseDialog.Description>
              )}
            </div>
            <BaseDialog.Close className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
              <Icon icon="solar:close-circle-linear" width={20} />
            </BaseDialog.Close>
          </div>
          <div className="mt-6">{children}</div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
