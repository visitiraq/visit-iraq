/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Block,
  Document,
  Inline,
  Text,
} from "@contentful/rich-text-types";
import type { Asset, Entry } from "contentful";

export function resolveIncludes<
  TInput extends Entry<any>,
  TOutput extends Entry<any>
>(
  items: TInput[] = [],
  includes: { Entry?: Entry<any>[]; Asset?: Asset[] } = {}
): TOutput[] {
  const entryMap = new Map(
    [...(includes.Entry ?? []), ...items].map((e) => [e.sys.id, e])
  );
  const assetMap = new Map(includes.Asset?.map((a) => [a.sys.id, a]));

  function resolveRichText(
    node: Document | Block | Inline | Text,
    visited: Set<string>
  ): any {
    if (!node || typeof node !== "object") {
      return node;
    }

    if (node.data?.target?.sys?.type === "Link") {
      const { linkType, id } = node.data.target.sys;

      if (linkType === "Entry") {
        const resolved = entryMap.get(id);

        if (resolved) {
          const hydrated = resolveEntry(resolved, visited);
          node.data.resolved = hydrated;
        }
      } else if (linkType === "Asset") {
        const resolved = assetMap.get(id);

        if (
          typeof resolved?.fields?.file?.url === "string" &&
          resolved?.fields?.file?.url?.startsWith("//")
        ) {
          resolved.fields.file.url = "https:" + resolved.fields.file.url;
        }

        node.data.resolved = resolved;
      }
    }

    if (Array.isArray((node as any).content)) {
      (node as any).content = (node as any).content.map((child: any) =>
        resolveRichText(child, visited)
      );
    }

    return node;
  }

  function resolveValue(value: any, visited: Set<string>): any {
    if (Array.isArray(value)) {
      return value.map((v) => resolveValue(v, visited)).filter(Boolean);
    }
    if (value?.sys?.type === "Link") {
      if (value.sys.linkType === "Entry") {
        const resolved = entryMap.get(value.sys.id);
        if (resolved) {
          return resolveEntry(resolved, visited);
        }
        return undefined;
      }
      if (value.sys.linkType === "Asset") {
        const asset = assetMap.get(value.sys.id) ?? undefined;

        if (asset && asset.fields?.file) {
          const file = asset.fields.file;
          if (typeof file.url === "string" && file.url.startsWith("//")) {
            file.url = "https:" + file.url;
          }
        }

        return asset;
      }
    }

    if (value?.nodeType === "document" && Array.isArray(value.content)) {
      return resolveRichText(value as Document, visited);
    }

    return value;
  }

  function resolveEntry(entry: Entry<any>, visited: Set<string>): TOutput {
    if (visited.has(entry.sys.id)) {
      return entry as TOutput;
    }

    visited.add(entry.sys.id);

    return {
      ...entry,
      fields: Object.fromEntries(
        Object.entries(entry.fields).map(([k, v]) => [
          k,
          resolveValue(v, visited),
        ])
      ),
    } as TOutput;
  }

  return items.map((entry) => resolveEntry(entry, new Set()));
}
