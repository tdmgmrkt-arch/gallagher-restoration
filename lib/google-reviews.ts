import { GBP, REVIEWS, TESTIMONIALS } from "@/lib/site";

export type LiveReview = {
  authorName: string;
  authorUri?: string;
  authorPhotoUri?: string;
  rating: number;
  relativeTime: string;
  publishTime: string;
  text: string;
  reviewUri?: string;
};

export type GoogleReviewsData = {
  ratingValue: number;
  reviewCount: number;
  reviews: LiveReview[];
  source: "google-places" | "fallback";
};

const FIELD_MASK = [
  "id",
  "displayName",
  "rating",
  "userRatingCount",
  "reviews",
].join(",");

const REVALIDATE_SECONDS = 21600; // 6 hours

type PlaceApiReview = {
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  googleMapsUri?: string;
};

export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || !GBP.placeId) return fallback();

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${GBP.placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        next: { revalidate: REVALIDATE_SECONDS, tags: ["google-reviews"] },
      },
    );
    if (!res.ok) return fallback();
    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      reviews?: PlaceApiReview[];
    };
    const reviews = (data.reviews ?? []).map(mapReview).filter((r) => r.text);
    return {
      ratingValue: Number(data.rating ?? REVIEWS.ratingValue),
      reviewCount: Number(data.userRatingCount ?? REVIEWS.reviewCount),
      reviews: reviews.length ? reviews : fallback().reviews,
      source: "google-places",
    };
  } catch {
    return fallback();
  }
}

function mapReview(r: PlaceApiReview): LiveReview {
  return {
    authorName: r.authorAttribution?.displayName ?? "Google User",
    authorUri: r.authorAttribution?.uri,
    authorPhotoUri: r.authorAttribution?.photoUri,
    rating: Number(r.rating ?? 5),
    relativeTime: r.relativePublishTimeDescription ?? "",
    publishTime: r.publishTime ?? "",
    text: r.text?.text ?? r.originalText?.text ?? "",
    reviewUri: r.googleMapsUri,
  };
}

function fallback(): GoogleReviewsData {
  return {
    ratingValue: REVIEWS.ratingValue,
    reviewCount: REVIEWS.reviewCount,
    reviews: TESTIMONIALS.map((t) => ({
      authorName: t.name,
      rating: 5,
      relativeTime: "",
      publishTime: "",
      text: t.quote,
    })),
    source: "fallback",
  };
}
