import { TypeUniqueComponentSkeleton } from "@/__generated__/contentful/TypeUniqueComponent";
import { client } from "../client";

export async function fetchUniqueComponentByVariant(
  variant: "Footer" | "Menu"
) {
  const response =
    await client.withoutUnresolvableLinks.getEntries<TypeUniqueComponentSkeleton>(
      {
        content_type: "uniqueComponent",
        "fields.variant": variant,
        limit: 1,
      }
    );

  const entry = response.items[0];

  if (!entry) {
    return null;
  }

  return entry;
}
