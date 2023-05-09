export const slugify = (str: string) => {
  if (!str) return str;

  return str
    ?.toLowerCase()
    ?.replace(/ /g, "-")
    ?.replace(/[^\w-]+/g, "")
    .trim();
};
