import { TypeCard, TypeSection } from "@/__generated__/contentful";
import Text from "./Text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import ContentfulImage from "./ContentfulImage";

type PropsType = {
  section: TypeSection<"WITHOUT_UNRESOLVABLE_LINKS">;
};

const AttractionSlider = ({ section }: PropsType) => {
  return (
    <section className="clamp-[mt,1.5rem,2.5rem] flex justify-center items-center flex-col gap-8">
      {section.fields.title && (
        <Text size="titleLg" as="h2">
          {section.fields.title}
        </Text>
      )}

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        loop={true}
        autoplay={{ delay: 15000, disableOnInteraction: false }}
        className="w-full"
      >
        {section.fields.content?.map((item) => {
          const card = item as TypeCard<"WITHOUT_UNRESOLVABLE_LINKS">;
          return (
            <SwiperSlide key={card?.sys?.id}>
              <div className="flex flex-col gap-8 font-medium">
                {card.fields.media && (
                  <ContentfulImage
                    media={card.fields.media}
                    className="w-full object-cover"
                  />
                )}
                {card.fields.title && (
                  <Text size="titleLgAlt">{card.fields.title}</Text>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default AttractionSlider;
