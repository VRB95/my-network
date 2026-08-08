import { cva, type VariantProps } from "class-variance-authority";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "../../lib/utils";

export const buttonVariants = cva("mn-ui-button", {
  variants: {
    variant: {
      default: "mn-ui-button-default",
      outline: "mn-ui-button-outline",
      destructive: "mn-ui-button-destructive",
      ghost: "mn-ui-button-ghost",
    },
    size: {
      default: "mn-ui-button-size-default",
      sm: "mn-ui-button-size-sm",
      icon: "mn-ui-button-size-icon",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);

  return (
    <button
      class={cn(buttonVariants({ variant: local.variant, size: local.size }), local.class)}
      {...others}
    />
  );
}
