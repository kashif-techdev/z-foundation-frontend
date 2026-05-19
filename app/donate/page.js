import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonateInquiryForm from "@/components/forms/DonateInquiryForm";
import EasyPaisaPaymentPanel from "@/components/donate/EasyPaisaPaymentPanel";

export const metadata = {
  title: "Donate | Z-Foundation",
  description:
    "Support Z-Foundation via EasyPaisa—manual transfer instructions, optional WhatsApp confirmation, and donation inquiries.",
};

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="standpage donate-page">
        <div className="max-width donate-page__inner">
          <nav className="blog-breadcrumb standpage__crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="blog-breadcrumb__sep" aria-hidden="true">
              /
            </span>
            <span className="blog-breadcrumb__current">Donate</span>
          </nav>

          <header className="donate-page__hero">
            <h1 className="standpage__title">Donate to Z-Foundation</h1>
            <p className="standpage__lead donate-page__lead">
            Every donation brings hope to families struggling with poverty, 
            illness, hunger, and hardship. Your support helps provide
             medical care, education, and emergency assistance to people 
             who need it most across Pakistan.
            </p>
          </header>

          <EasyPaisaPaymentPanel />

          <section className="donate-steps" aria-labelledby="donate-steps-heading">
            <h2 className="donate-section-title" id="donate-steps-heading">
              How to donate
            </h2>
            <ol className="donate-steps__list">
              <li>Open the <strong>EasyPaisa</strong> app .</li>
              <li>
                Select <strong>Send Money</strong> and enter the mobile number.
              </li>
              <li>Enter the amount you wish to give and complete the transfer.</li>
              <li>
               Share your receipt on WhatsApp for confirmation
              </li>
            </ol>
          </section>

          <section className="donate-inquiry-section" aria-labelledby="donate-inquiry-heading">
            <h2 className="donate-section-title" id="donate-inquiry-heading">
              Inquiry or receipt
            </h2>
            <p className="donate-inquiry-intro">
            For Zakat, Sadqah, sponsorships, or larger contributions,
             please contact us directly so we can assist you properly
            </p>
            <DonateInquiryForm />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
