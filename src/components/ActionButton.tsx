import { TypeAction } from "@/__generated__/contentful";
import { Button, ButtonProps } from "./Button";
import Link from "next/link";

type PropsType = {
  action: TypeAction<"WITHOUT_UNRESOLVABLE_LINKS">;
  className?: string;
};

const ActionButton = ({ action, className }: PropsType) => {
  const { external, internal, text, variant, behaviour } = action.fields;

  if (external) {
    return (
      <Button
        asChild
        variant={variant as ButtonProps["variant"]}
        className={className}
        isFullWidth={behaviour === "Flex"}
      >
        <a href={external} target="_blank" rel="noreferrer">
          {text}
        </a>
      </Button>
    );
  }

  if (internal?.fields.slug) {
    return (
      <Button
        asChild
        variant={variant as ButtonProps["variant"]}
        className={className}
        isFullWidth={behaviour === "Flex"}
      >
        <Link href={internal?.fields.slug}>{text}</Link>
      </Button>
    );
  }
};

export default ActionButton;
