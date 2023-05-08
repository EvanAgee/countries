export const slugify = (str) => {
  if (!str) return str;

  return str
    ?.toLowerCase()
    ?.replace(/ /g, "-")
    ?.replace(/[^\w-]+/g, "")
    .trim();
};
