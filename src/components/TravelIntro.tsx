import { TypeCard, TypeSection } from "@/__generated__/contentful";
import Text from "./Text";
import SizedRichText from "./SizedRichText";

type PropsType = {
  section: TypeSection<"WITHOUT_UNRESOLVABLE_LINKS">;
};

const TravelIntro = ({ section }: PropsType) => {
  return (
    <section className="clamp-[mt,1.5rem,2.5rem] flex justify-center items-center flex-col gap-8">
      {" "}
      {section.fields.title && (
        <Text size="titleLg" as="h2">
          {section.fields.title}
        </Text>
      )}
      {section.fields.text && (
        <SizedRichText className="max-w-170 ">
          {section.fields.text}
        </SizedRichText>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-170 text-center">
        {section.fields.content?.map((item) => {
          const card = item as TypeCard<"WITHOUT_UNRESOLVABLE_LINKS">;
          return (
            <div
              key={card?.sys?.id}
              className="flex flex-col gap-2 font-medium"
            >
              {card.fields.title && (
                <Text className="text-terracotta">{card.fields.title}</Text>
              )}
              {card.fields.text && (
                <SizedRichText>{card.fields.text}</SizedRichText>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TravelIntro;
