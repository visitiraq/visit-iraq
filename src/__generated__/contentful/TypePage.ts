import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeSectionSkeleton } from "./TypeSection";

export interface TypePageFields {
    contentfulName?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSectionSkeleton>>;
    seoTitle?: EntryFieldTypes.Symbol;
    seoDescription?: EntryFieldTypes.Symbol;
    seoImage?: EntryFieldTypes.AssetLink;
    features?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"No Index">>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}
