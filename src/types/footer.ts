export type Footer = {
  tagline: string;
  lists: Array<{
    name: string;
    list: Array<{
      name: string;
      slug: string;
    }>;
  }>;
};
