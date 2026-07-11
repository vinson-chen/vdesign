import * as React from "react";
type CardSize = "sm" | "base" | "lg";
declare function Card({ className, size, ...props }: React.ComponentProps<"div"> & {
    size?: CardSize;
}): import("react/jsx-runtime").JSX.Element;
declare function CardHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function CardContent({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function CardFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export { Card, CardHeader, CardContent, CardFooter };
