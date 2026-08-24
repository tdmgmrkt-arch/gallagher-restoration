import { getGoogleReviews } from "@/lib/google-reviews";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export async function Testimonials() {
  const data = await getGoogleReviews();
  return (
    <TestimonialsCarousel
      reviews={data.reviews}
      isLive={data.source === "google-places"}
    />
  );
}
