import { TypeCard, TypeSection } from "@/__generated__/contentful";
import Text from "./Text";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ContentfulImage from "./ContentfulImage";
import SizedRichText from "./SizedRichText";

type PropsType = {
  section: TypeSection<"WITHOUT_UNRESOLVABLE_LINKS">;
};

const DishesSlider = ({ section }: PropsType) => {
  return (
    <section className="clamp-[mt,1.5rem,2.5rem] flex justify-center items-center flex-col gap-8">
      {section.fields.title && (
        <Text size="titleLg" as="h2">
          {section.fields.title}
        </Text>
      )}

      <Swiper spaceBetween={16} slidesPerView={"auto"} className="w-full h-fit">
        {section.fields.content?.map((item) => {
          const card = item as TypeCard<"WITHOUT_UNRESOLVABLE_LINKS">;
          return (
            <SwiperSlide
              key={card?.sys?.id}
              style={{ width: "250px", height: "auto" }}
            >
              <div className="w-full h-full flex flex-col gap-4 text-white font-medium relative p-4 ">
                {card.fields.media && (
                  <ContentfulImage
                    media={card.fields.media}
                    className="w-full h-full absolute left-0 top-0 object-cover -z-20"
                  />
                )}
                <div className="w-full h-full absolute -z-10 left-0 top-0 bg-black/30"></div>
                {card.fields.title && (
                  <Text size="titleLgAlt">{card.fields.title}</Text>
                )}
                {card.fields.text && (
                  <SizedRichText>{card.fields.text}</SizedRichText>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default DishesSlider;
