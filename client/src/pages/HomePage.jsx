import { lazy, Suspense } from "react";
import Hero from "../components/home/Hero";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Lazy-load everything below the fold
const DestinationsMarquee = lazy(() => import("../components/home/DestinationsMarquee"));
const TravelStyles = lazy(() => import("../components/home/TravelStyles"));
const FeaturedPackages = lazy(() => import("../components/home/FeaturedPackages"));
const WhyUs = lazy(() => import("../components/home/WhyUs"));
const CTABanner = lazy(() => import("../components/home/CTABanner"));
const Reviews = lazy(() => import("../components/home/Reviews"));

const SectionSkeleton = ({ dark = false }) => (
  <div className={`py-20 px-8 animate-pulse ${dark ? "bg-[#0E0C0A]" : "bg-[#F5F0E8]"}`}>
    <div className="max-w-7xl mx-auto">
      <div className={`h-4 ${dark ? "bg-white/10" : "bg-[#EDE8E0]"} rounded w-24 mb-3`} />
      <div className={`h-8 ${dark ? "bg-white/10" : "bg-[#EDE8E0]"} rounded w-64 mb-10`} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1,2,3].map(i => <div key={i} className={`h-48 ${dark ? "bg-white/5" : "bg-[#EDE8E0]"} rounded-2xl`} />)}
      </div>
    </div>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionSkeleton />}><DestinationsMarquee /></Suspense>
      <Suspense fallback={<SectionSkeleton dark />}><TravelStyles /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><FeaturedPackages /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><WhyUs /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><CTABanner /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><Reviews /></Suspense>
      <Footer />
    </div>
  );
}
