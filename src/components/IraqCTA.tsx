import { TypeSection } from "@/__generated__/contentful";
import SizedRichText from "./SizedRichText";
import ActionButton from "./ActionButton";

type PropsType = {
  section: TypeSection<"WITHOUT_UNRESOLVABLE_LINKS">;
};

const IraqCTA = ({ section }: PropsType) => {
  return (
    <section className="clamp-[mt,1.5rem,2.5rem] flex justify-center items-center flex-col gap-8">
      {section.fields.text && (
        <SizedRichText className="max-w-170 text-center" textSize="titleLg">
          {section.fields.text}
        </SizedRichText>
      )}

      {Boolean(section?.fields?.actions?.length) && (
        <div className="flex gap-2 flex-wrap">
          {section.fields.actions?.map((item) => {
            if (!item) return null;
            return (
              <ActionButton
                key={item.sys.id}
                action={item}
                className="w-full md:w-auto"
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default IraqCTA;
