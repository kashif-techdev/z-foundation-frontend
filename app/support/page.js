import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportRequestForm from "@/components/forms/SupportRequestForm";

export const metadata = {
  title: "Support | Z-Foundation",
  description: "Get help with donations, volunteering, the website, or general questions about Z-Foundation.",
};

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="standpage">
        <div className="max-width standpage__inner">
          <nav className="blog-breadcrumb standpage__crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="blog-breadcrumb__sep" aria-hidden="true">
              /
            </span>
            <span className="blog-breadcrumb__current">Support</span>
          </nav>
          <h1 className="standpage__title">Help &amp; support</h1>
          <p className="standpage__lead">
            Choose the topic that best matches your question. We aim to reply within a few business days.
          </p>
          <SupportRequestForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
