import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { Inter } from "next/font/google";
import { isTypeSection } from "../__generated__/contentful/TypeSection";
import { fetchAllPageSlugs } from "../_contentful/queries/fetchAllPageSlugs";
import { fetchPageBySlug } from "../_contentful/queries/fetchPageBySlug";
import getContentfulSlug, {
  getLocaleSlug,
  getSplitSlug,
} from "../_contentful/utils/slugger";
import { DEFAULT_LOCALE } from "../constants";
import { LocaleType } from "@/types";
import RenderSection from "@/components/RenderSection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const noIndex = page.fields.features?.includes("No Index");
  return (
    <>
      {/* <NextSeo
        noindex={noIndex}
        nofollow={noIndex}
        title={page?.fields?.seoTitle || "Polymodel"}
        description={page?.fields.seoDescription || ""}
        openGraph={{
          title: page?.fields.seoTitle || "Polymodel",
          description: page?.fields.seoDescription || "",
          images: page?.fields.seoImage
            ? [
                {
                  url: page.fields?.seoImage?.fields?.file?.url || "",
                  width:
                    page.fields?.seoImage?.fields?.file?.details.image?.width ||
                    1024,
                  height:
                    page.fields?.seoImage?.fields?.file?.details.image
                      ?.height || 1024,
                  alt: page.fields.seoDescription || "",
                },
              ]
            : [],
        }}
      /> */}
      <main className={`${inter.className} font-sans page-wrapper`}>
        {page.fields.content?.map((item) => {
          if (!item) return null;

          if (isTypeSection(item)) {
            return <RenderSection key={item.sys.id} section={item} />;
          }

          return null;
        })}
      </main>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ pageSlugs: string[] }>
) {
  const locale = (context.locale || DEFAULT_LOCALE) as LocaleType;
  const pageSlug = getContentfulSlug(locale, context.params?.pageSlugs);

  const page = await fetchPageBySlug(pageSlug);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await fetchAllPageSlugs();

  const paths = slugs.map((item) => {
    const [locale, slug] = getLocaleSlug(item);

    return {
      params: {
        pageSlugs: getSplitSlug(slug),
        locale,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
