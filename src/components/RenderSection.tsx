import { TypeSection } from "@/__generated__/contentful";
import Hero from "./Hero";
import TravelIntro from "./TravelIntro";
import IraqCTA from "./IraqCTA";
import AttractionSlider from "./AttractionSlider";
import DishesSlider from "./DishesSlider";
import ThingsToDo from "./ThingsToDo";

type PropsType = { section: TypeSection<"WITHOUT_UNRESOLVABLE_LINKS"> };

const RenderSection = ({ section }: PropsType) => {
  if (section.fields.variant === "Hero")
    return <Hero key={section.sys.id} section={section} />;
  if (section.fields.variant === "Travel Intro")
    return <TravelIntro key={section.sys.id} section={section} />;
  if (section.fields.variant === "Iraq CTA")
    return <IraqCTA key={section.sys.id} section={section} />;
  if (section.fields.variant === "Attraction Slider")
    return <AttractionSlider key={section.sys.id} section={section} />;
  if (section.fields.variant === "Dishes Slider")
    return <DishesSlider key={section.sys.id} section={section} />;
  if (section.fields.variant === "Things To Do")
    return <ThingsToDo key={section.sys.id} section={section} />;
};

export default RenderSection;
