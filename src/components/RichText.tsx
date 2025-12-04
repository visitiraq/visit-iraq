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
import snakeCase from "lodash-es/snakeCase";
import NextLink from "next/link";
import React, { Fragment } from "react";
import Text from "./Text";

interface TextProps {
  children: React.ReactNode;
}

const Bold: React.FC<TextProps> = ({ children }) => (
  <span className="font-medium leading-[125%] md:leading-[115%]">
    {children}
  </span>
);

function getOptions(): Options {
  const richTextOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const textNode = node.content.find(
          (node) => node.nodeType === "text"
        ) as ContentfulText;

        const text = node.content
          .filter((n) => n.nodeType === "text")
          .map((t) => (t as ContentfulText).value)
          .join("")
          .trim();

        if (!text) return null;

        return (
          <Text
            size="p"
            id={snakeCase(`p_${textNode?.value || ""}`)}
            className="mb-4"
          >
            {children}
          </Text>
        );
      },
      [BLOCKS.HEADING_1]: (node, children) => {
        const textNode = node.content.find(
          (node) => node.nodeType === "text"
        ) as ContentfulText;
        return (
          <h1
            id={snakeCase(`h1_${textNode?.value || ""}`)}
            className="text-4xl font-bold mt-6 mb-4"
          >
            {children}
          </h1>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        const textNode = node.content.find(
          (node) => node.nodeType === "text"
        ) as ContentfulText;
        return (
          <Text
            id={snakeCase(`h2_${textNode?.value || ""}`)}
            as="h2"
            size="displaySmall"
            className="mb-6"
          >
            {children}
          </Text>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        const textNode = node.content.find(
          (node) => node.nodeType === "text"
        ) as ContentfulText;
        return (
          <Text
            id={snakeCase(`h3_${textNode?.value || ""}`)}
            size="titleSmall"
            className="mb-6"
          >
            {children}
          </Text>
        );
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        const textNode = node.content.find(
          (node) => node.nodeType === "text"
        ) as ContentfulText;
        return (
          <h4
            id={snakeCase(`h4_${textNode?.value || ""}`)}
            className="text-xl font-medium mt-4 mb-2"
          >
            {children}
          </h4>
        );
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        const textNode = node.content.find(
          (node) => node.nodeType === "text"
        ) as ContentfulText;
        return (
          <h5
            id={snakeCase(`h5_${textNode?.value || ""}`)}
            className="text-lg font-medium mt-3 mb-2"
          >
            {children}
          </h5>
        );
      },
      [BLOCKS.HEADING_6]: (node, children) => {
        const textNode = node.content.find(
          (node) => node.nodeType === "text"
        ) as ContentfulText;
        return (
          <h6
            id={snakeCase(`h6_${textNode?.value || ""}`)}
            className="text-base font-medium mt-2 mb-2"
          >
            {children}
          </h6>
        );
      },
      [BLOCKS.HR]: () => <hr className="my-4 border-t border-gray-300" />,

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
  className?: string;
};

export default function RichText({ children, className }: PropsType) {
  return (
    <div className={className}>
      {documentToReactComponents(children, getOptions())}
    </div>
  );
}

export function toRichText(doc: Document, options?: Options) {
  const defaultOptions = getOptions();

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
