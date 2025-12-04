import { TypeCard, TypeSection } from "@/__generated__/contentful";
import Text from "./Text";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ContentfulImage from "./ContentfulImage";
import SizedRichText from "./SizedRichText";

type PropsType = {
  section: TypeSection<"WITHOUT_UNRESOLVABLE_LINKS">;
};

const ThingsToDo = ({ section }: PropsType) => {
  return (
    <section className="clamp-[mt,1.5rem,2.5rem] flex justify-center items-center flex-col gap-8">
      {section.fields.title && (
        <Text size="titleLg" as="h2">
          {section.fields.title}
        </Text>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {section.fields.content?.map((item) => {
          const card = item as TypeCard<"WITHOUT_UNRESOLVABLE_LINKS">;
          return (
            <div className="w-full h-full flex flex-col gap-4 pt-4 border-t border-dark-gray ">
              {card.fields.title && (
                <Text size="titleSmall">{card.fields.title}</Text>
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

export default ThingsToDo;
