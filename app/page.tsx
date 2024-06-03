import Services from "@/components/Services";
import Layout from "./layout";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Contact from "@/components/contact";
import Hero from "@/components/Hero";

const page: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Contact />
    </>
  );
};
export default page;