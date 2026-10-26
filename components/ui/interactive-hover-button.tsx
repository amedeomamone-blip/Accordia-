import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { text?: string; }
const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
 ({text="Button", className, type="button", ...props},ref)=>(
 <button ref={ref} type={type} className={cn("group relative isolate inline-flex min-h-11 max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-background px-8 py-2 text-center font-semibold disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",className)} {...props}>
 <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 motion-reduce:transition-none">{text}</span>
 <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 flex -translate-x-4 items-center justify-center gap-2 px-4 text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none">{text}<ArrowRight size={18}/></span>
 <span aria-hidden="true" className="absolute left-3 top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rounded-full bg-primary transition-transform duration-300 group-hover:scale-[120] motion-reduce:transition-none"/>
 </button>));
InteractiveHoverButton.displayName="InteractiveHoverButton";
export {InteractiveHoverButton};
