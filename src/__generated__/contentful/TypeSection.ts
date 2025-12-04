import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeActionSkeleton } from "./TypeAction";
import type { TypeCardSkeleton } from "./TypeCard";

export interface TypeSectionFields {
    contentfulName?: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    text?: EntryFieldTypes.RichText;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCardSkeleton>>;
    media?: EntryFieldTypes.AssetLink;
    variant?: EntryFieldTypes.Symbol<"Attraction Slider" | "Dishes Slider" | "Hero" | "Iraq CTA" | "Things To Do" | "Travel Intro">;
    actions?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeActionSkeleton>>;
}

export type TypeSectionSkeleton = EntrySkeletonType<TypeSectionFields, "section">;
export type TypeSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSectionSkeleton, Modifiers, Locales>;

export function isTypeSection<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeSection<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'section'
}
