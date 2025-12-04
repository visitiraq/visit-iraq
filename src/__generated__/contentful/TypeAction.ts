import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypePageSkeleton } from "./TypePage";

export interface TypeActionFields {
    contentfulName?: EntryFieldTypes.Symbol;
    text?: EntryFieldTypes.Symbol;
    internal?: EntryFieldTypes.EntryLink<TypePageSkeleton>;
    external?: EntryFieldTypes.Symbol;
    variant?: EntryFieldTypes.Symbol<"Outlined" | "Primary">;
    behaviour?: EntryFieldTypes.Symbol<"Flex" | "Wrap">;
}

export type TypeActionSkeleton = EntrySkeletonType<TypeActionFields, "action">;
export type TypeAction<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeActionSkeleton, Modifiers, Locales>;

export function isTypeAction<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAction<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'action'
}
