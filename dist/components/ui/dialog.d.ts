import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
declare const DialogContext: React.Context<{
    size: "base" | "lg";
}>;
declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const dialogContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare function DialogContent({ className, overlayClassName, size, children, slotId, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & {
    size?: "base" | "lg";
    overlayClassName?: string;
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function DialogHeader({ className, slotId, ...props }: React.ComponentProps<"div"> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function DialogBody({ className, slotId, ...props }: React.ComponentProps<"div"> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function DialogField({ className, slotId, ...props }: React.ComponentProps<"div"> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function DialogFooter({ className, slotId, ...props }: React.ComponentProps<"div"> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function DialogTitle({ className, slotId, ...props }: React.ComponentProps<typeof DialogPrimitive.Title> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function DialogDescription({ className, slotId, ...props }: React.ComponentProps<typeof DialogPrimitive.Description> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { Dialog, DialogTrigger, DialogPortal, DialogClose, DialogContent, DialogHeader, DialogBody, DialogField, DialogFooter, DialogTitle, DialogDescription, dialogContentVariants, DialogContext, };
