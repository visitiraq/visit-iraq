import { Asset } from "contentful";
import Image, { ImageProps } from "next/image";

type ContentfulImageProps = {
  media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">;
  className?: string;
  alt?: string;
} & Omit<ImageProps, "src" | "width" | "height" | "alt">;

const ContentfulImage = ({
  media,
  className,
  alt,
  ...props
}: ContentfulImageProps) => {
  if (!media?.fields?.file) return null;

  const { url, details, contentType } = media.fields.file;
  const width = details?.image?.width || 500;
  const height = details?.image?.height || 500;

  const imageAlt = alt ?? media.fields?.title ?? "";

  if (contentType?.includes("image/")) {
    return (
      <Image
        src={`https:${url}`}
        width={width}
        height={height}
        alt={imageAlt}
        className={className}
        {...props}
      />
    );
  }
};

export default ContentfulImage;
