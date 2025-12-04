import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeUniqueComponentFields {
    contnetfulName?: EntryFieldTypes.Symbol;
    json?: EntryFieldTypes.Object;
    variant?: EntryFieldTypes.Symbol<"Footer" | "Menu">;
    media?: EntryFieldTypes.AssetLink;
}

export type TypeUniqueComponentSkeleton = EntrySkeletonType<TypeUniqueComponentFields, "uniqueComponent">;
export type TypeUniqueComponent<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeUniqueComponentSkeleton, Modifiers, Locales>;

export function isTypeUniqueComponent<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeUniqueComponent<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'uniqueComponent'
}
