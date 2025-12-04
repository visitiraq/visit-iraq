import Text, { Size } from "@/components/Text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

type TextProps = {
  tag?: keyof typeof BLOCKS;
  size?: Size;
};

function RichOverwrite({ tag = "PARAGRAPH", size = "p" }: TextProps): Options {
  return {
    renderNode: {
      [BLOCKS[tag]]: (node, children) => {
        return <Text size={size}>{children}</Text>;
      },
    },
  };
}

export default RichOverwrite;
