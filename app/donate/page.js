import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonateInquiryForm from "@/components/forms/DonateInquiryForm";

export const metadata = {
  title: "Donate | Z-Foundation",
  description: "Inquire about supporting Z-Foundation—one-time gifts, monthly giving, in-kind donations, and more.",
};

export default function DonatePage() {
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
            <span className="blog-breadcrumb__current">Donate</span>
          </nav>
          <h1 className="standpage__title">Donation inquiry</h1>
          <p className="standpage__lead">
            Tell us how you would like to help. We will follow up by email—no payment details are collected on this form.
          </p>
          <DonateInquiryForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
