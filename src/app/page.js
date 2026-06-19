import Banner from "@/Sections/Banner";
import ContactSection from "@/Sections/ContactSection";
import CustomerReviews from "@/Sections/CustomerReviews";
import FeaturedProperties from "@/Sections/FeaturedProperties";
import TopLocations from "@/Sections/TopLocations";
import WhyChooseUs from "@/Sections/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProperties />
      <WhyChooseUs />
      <CustomerReviews />
      <TopLocations />
      <ContactSection />

    </div>
  );
}
