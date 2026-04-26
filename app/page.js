import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import About from "@/components/About";
import Services from "@/components/Services";
import Members from "@/components/Members";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import SkipLink from "@/components/SkipLink";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Page() {
  return (
    <ErrorBoundary>
      <SkipLink />
      <Navbar />
      <main id="main-content">
        <Home />
        <About />
        <Services />
        <Members />
        <Contact />
        <Footer />
      </main>
      <ScrollToTop />
      <WhatsAppButton />
    </ErrorBoundary>
  );
}
