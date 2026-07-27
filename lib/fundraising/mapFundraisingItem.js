const getStrapiAttributes = (item) => item?.attributes ?? item ?? {};

export const mapFundraisingItemFromStrapi = (item) => {
  const attrs = getStrapiAttributes(item);

  return {
    organizerName: attrs.organizerName ?? "",
    organizerEmail: attrs.organizerEmail ?? "",
    organizerPhone: attrs.organizerPhone ?? "",
    fundraisingName: attrs.name ?? "",
    fundraisingGoal: attrs.goal ?? "",
    fundraisingDescription: attrs.description ?? "",
    fundraisingEnd: attrs.fundraisingEnd ?? "",
    slug: attrs.slug ?? "",
    fixedValue: Number(attrs.fixedValue) || 0,
    collectedValue: Number(attrs.collectedValue) || 0,
    peopleCount: Number(attrs.peopleCount) || 0,
  };
};

export const isFundraisingItemPublished = (item) => {
  const attrs = getStrapiAttributes(item);

  if (attrs.completeModeration === true) return true;

  return false;
};

export const mapFundraisingCardFromStrapi = (item, goalsBySlug = {}, apiUrl = "") => {
  const attrs = getStrapiAttributes(item);
  const goal = goalsBySlug[attrs.goal] ?? null;
  const goalImage = goal?.image?.url
    ? `${apiUrl}${goal.image.url}`
    : goal?.image
      ? goal.image
      : "/images/news_images/default-image.svg";

  return {
    id: item.id ?? attrs.id,
    header: goalImage,
    title: attrs.name ?? "",
    body: attrs.description ?? "",
    category: goal?.name ?? "Сбор",
    date: attrs.fundraisingEnd ?? "",
    link: attrs.slug ? `/fundraising/${attrs.slug}` : "",
  };
};
