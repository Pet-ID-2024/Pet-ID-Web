import Services from "@/components/Services";
import Layout from "./layout";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Contact from "@/components/contact";
import Hero from "@/components/Hero";
import BannerForm from "@/components/BannerForm";
import BookingRequestList from "@/components/BookingRequestList";


const page: React.FC = () => {
  return (
    <>
      <Hero />
      <BannerForm />
      <BookingRequestList />
      
    </>
  );
};
export default page;