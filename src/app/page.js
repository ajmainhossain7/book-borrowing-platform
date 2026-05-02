import Banner from "@/components/Banner";
import FeaturedAuthors from "@/components/FeaturedAuthors";
import Marquee from "@/components/Marquee";
import OffersSection from "@/components/OffersSection";
import TopRated from "./top-books/page";


export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Marquee></Marquee>
      <TopRated></TopRated>
      <OffersSection></OffersSection>
      <FeaturedAuthors></FeaturedAuthors>
      
    </div>
  );
}
