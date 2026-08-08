import { ToggleButton } from "@kobalte/core";
import type { ToggleButtonRootProps } from "@kobalte/core/toggle-button";
import { cva, type VariantProps } from "class-variance-authority";
import { splitProps } from "solid-js";
import { cn } from "../../lib/utils";

export const toggleVariants = cva("mn-ui-button mn-ui-toggle", {
  variants: {
    variant: {
      default: "mn-ui-button-default",
      outline: "mn-ui-button-outline",
    },
    size: {
      default: "mn-ui-button-size-default",
      sm: "mn-ui-button-size-sm",
      icon: "mn-ui-button-size-icon",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "sm",
  },
});

type ToggleProps = ToggleButtonRootProps &
  VariantProps<typeof toggleVariants> & {
    class?: string;
    title?: string;
  };

export function Toggle(props: ToggleProps) {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);

  return (
    <ToggleButton.Root
      class={cn(toggleVariants({ variant: local.variant, size: local.size }), local.class)}
      {...others}
    />
  );
}
