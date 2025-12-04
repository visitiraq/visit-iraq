import { TypePageSkeleton } from "@/__generated__/contentful/TypePage";
import { client } from "../client";

export async function fetchPageBySlug(slug: string) {
  const response =
    await client.withoutUnresolvableLinks.getEntries<TypePageSkeleton>({
      content_type: "page",
      "fields.slug": slug,
      limit: 1,
      include: 4,
    });

  const entry = response.items[0];

  if (!entry) {
    return null;
  }

  return entry;
}
