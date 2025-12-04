import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  Text as ContentfulText,
  Document,
  INLINES,
  MARKS,
} from "@contentful/rich-text-types";
import NextLink from "next/link";
import React, { Fragment } from "react";
import Text, { Size } from "./Text";

interface TextProps {
  children: React.ReactNode;
}

const Bold: React.FC<TextProps> = ({ children }) => (
  <span className="font-medium leading-[125%] md:leading-[115%]">
    {children}
  </span>
);

function getOptions(textSize: Size): Options {
  const richTextOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <Text size={textSize}>{children}</Text>;
      },
      [BLOCKS.HEADING_1]: (node, children) => {
        return (
          <Text size={textSize} as="h1">
            {children}
          </Text>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <Text size={textSize} as="h2">
            {children}
          </Text>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return (
          <Text size={textSize} as="h3">
            {children}
          </Text>
        );
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return (
          <Text size={textSize} as="h4">
            {children}
          </Text>
        );
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        return (
          <Text size={textSize} as="h5">
            {children}
          </Text>
        );
      },
      [BLOCKS.HEADING_6]: (node, children) => {
        return (
          <Text size={textSize} as={"h6"}>
            {children}
          </Text>
        );
      },

      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <NextLink href={uri} className="underline">
            {children}
          </NextLink>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <NextLink href={uri} className="underline" target="_blank">
            {children}
          </NextLink>
        );
      },

      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc pl-6 space-y-2">{children}</ul>
      ),

      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal pl-6 space-y-2">{children}</ol>
      ),

      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="mt-2">{children}</li>
      ),
    },

    renderText: (text) =>
      text.split("\n").map((line, index, arr) => (
        <Fragment key={index}>
          {line}
          {index < arr.length - 1 && <br />}
        </Fragment>
      )),
  };

  return richTextOptions;
}

type PropsType = {
  children: Document;
  textSize?: Size;
  className?: string;
};

export default function SizedRichText({
  textSize = "p",
  className,
  children,
}: PropsType) {
  return (
    <div className={className}>
      {documentToReactComponents(children, getOptions(textSize))}
    </div>
  );
}

export function toSizedRichText(
  doc: Document,
  textSize: Size = "p",
  options?: Options
) {
  const defaultOptions = getOptions(textSize);

  return documentToReactComponents(doc, {
    ...defaultOptions,
    renderMark: {
      ...defaultOptions.renderMark,
      ...options?.renderMark,
    },
    renderNode: {
      ...defaultOptions.renderNode,
      ...options?.renderNode,
    },
  });
}
