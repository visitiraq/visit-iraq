import { TypeSection } from "@/__generated__/contentful";
import Text from "./Text";
import SizedRichText from "./SizedRichText";

type PropsType = {
  section: TypeSection<"WITHOUT_UNRESOLVABLE_LINKS">;
};

const Hero = ({ section }: PropsType) => {
  return (
    <section className="bg-cyan text-white flex justify-center items-center gap-8 flex-col min-h-screen text-center">
      {section.fields.title && (
        <Text size="displayLarge" as="h1">
          {section.fields.title}
        </Text>
      )}

      {section.fields.text && (
        <SizedRichText className="max-w-160" textSize="titleLgAlt">
          {section.fields.text}
        </SizedRichText>
      )}
    </section>
  );
};

export default Hero;
