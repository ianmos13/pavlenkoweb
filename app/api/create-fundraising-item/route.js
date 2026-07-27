import { NextResponse } from "next/server";
import { strapiFetch } from "@/lib/strapi";

export const runtime = "nodejs";

const CYRILLIC_TO_LATIN = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

const slugify = (text) => {
  if (!text?.trim()) return "";

  const transliterated = text
    .trim()
    .toLowerCase()
    .split("")
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("");

  return transliterated
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 80);
};

const isSlugTaken = async (slug) => {
  const query = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "fields[0]": "slug",
    "pagination[pageSize]": "1",
  });

  const result = await strapiFetch(`/fundraising-items?${query}`);
  return Array.isArray(result?.data) && result.data.length > 0;
};

const generateUniqueSlug = async (fundraisingName) => {
  const baseSlug = slugify(fundraisingName) || `fundraising-${Date.now()}`;
  let slug = baseSlug;
  let counter = 2;

  while (await isSlugTaken(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
};

const RATE_LIMIT_MS = 10 * 60 * 1000;

const hasRecentFundraisingCreation = async (organizerEmail) => {
  const normalizedEmail = organizerEmail.trim().toLowerCase();
  const createdAfter = new Date(Date.now() - RATE_LIMIT_MS).toISOString();

  const query = new URLSearchParams({
    "filters[organizerEmail][$eq]": normalizedEmail,
    "filters[createdAt][$gte]": createdAfter,
    "fields[0]": "createdAt",
    "sort[0]": "createdAt:desc",
    "pagination[pageSize]": "1",
  });

  const result = await strapiFetch(`/fundraising-items?${query}`);
  return Array.isArray(result?.data) && result.data.length > 0;
};

export async function POST(req) {
  try {
    const {
      organizerName,
      organizerEmail,
      organizerPhone,
      fundraisingName,
      fundraisingGoal,
      fundraisingDescription,
      fundraisingEnd,
    } = await req.json();

    if (!organizerEmail?.trim()) {
      return NextResponse.json(
        { error: "Email организатора обязателен для создания сбора." },
        { status: 400 }
      );
    }

    const isRateLimited = await hasRecentFundraisingCreation(organizerEmail);

    if (isRateLimited) {
      return NextResponse.json(
        {
          error:
            "Вы уже создавали сбор недавно. Повторное создание возможно через 10 минут.",
        },
        { status: 429 }
      );
    }

    const slug = await generateUniqueSlug(fundraisingName);

    const result = await strapiFetch("/fundraising-items", {
      method: "POST",
      body: JSON.stringify({
        data: {
          slug,
          name: fundraisingName,
          goal: fundraisingGoal,
          description: fundraisingDescription,
          fundraisingEnd,
          organizerName,
          organizerEmail: organizerEmail.trim().toLowerCase(),
          organizerPhone,
          collectedValue: 0,
          peopleCount: 0,
        },
      }),
    });

    return NextResponse.json({
      success: true,
      slug,
      data: result?.data ?? result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Ошибка сервера при создании сбора" },
      { status: error.status || 500 }
    );
  }
}
