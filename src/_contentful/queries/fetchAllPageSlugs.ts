import { TypePageSkeleton } from "@/__generated__/contentful/TypePage";
import { client } from "../client";
import isDefined from "@/utils/isDefined";

export async function fetchAllPageSlugs() {
  const response =
    await client.withoutUnresolvableLinks.getEntries<TypePageSkeleton>({
      content_type: "page",
      select: ["fields.slug"],
      limit: 1000,
    });

  return response.items.map((item) => item.fields.slug).filter(isDefined);
}
