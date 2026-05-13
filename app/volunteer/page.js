import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Volunteer | Z-Foundation",
  description:
    "Join Z-Foundation as a volunteer—field weekends, health camps, education support, and remote skills. Learn how we work and how to get started.",
};

const WHY = [
  {
    icon: "fa-heart",
    title: "Direct impact",
    text: "Your time supports flood-affected communities, health outreach, and education where it is needed most.",
  },
  {
    icon: "fa-users",
    title: "Work with locals",
    text: "We plan every activity with community leaders so efforts stay respectful, safe, and useful after we leave.",
  },
  {
    icon: "fa-shield-halved",
    title: "Clear expectations",
    text: "Briefings, roles, and rest breaks are standard. We never treat volunteers as informal labour.",
  },
];

const ROLES = [
  {
    icon: "fa-seedling",
    title: "Field & relief",
    text: "Weekend drives: ration packing, sanitation kits, light construction, and site prep alongside trained staff.",
    accent: "teal",
  },
  {
    icon: "fa-stethoscope",
    title: "Health camps",
    text: "Licensed medics and nurses for screening; non-medical volunteers for registration, crowd flow, and logistics.",
    accent: "ocean",
  },
  {
    icon: "fa-book-open",
    title: "Education",
    text: "Holiday catch-up sessions, reading support, and distribution of books and uniforms with local schools.",
    accent: "amber",
  },
  {
    icon: "fa-laptop",
    title: "Skills from anywhere",
    text: "Design, writing, translation, data, and fundraising help—remote contributions matter too.",
    accent: "slate",
  },
];

const STEPS = [
  { n: "1", title: "Tell us about you", text: "Reach out with your city, availability, and any professional skills." },
  { n: "2", title: "Short orientation", text: "We share safety rules, dignity standards, and what to expect on site." },
  { n: "3", title: "Match to a project", text: "We align you with a date and role that fits your capacity and experience." },
  { n: "4", title: "Join the team", text: "On the day, staff lead; you focus on your assigned tasks with full support." },
];

const FAQ = [
  {
    q: "Do I need prior NGO experience?",
    a: "No. Many roles only need reliability, punctuality, and willingness to follow briefings. Medical roles require valid credentials.",
  },
  {
    q: "Is there a minimum age?",
    a: "Generally 16+ for independent volunteers; younger participants may join with a guardian when a family day is organised. We confirm per activity.",
  },
  {
    q: "Are travel and meals covered?",
    a: "Field days are usually local or regional. We publish what is provided before you commit—typically water, shade, and a simple meal on full-day camps when budget allows.",
  },
  {
    q: "Can corporate or student groups volunteer?",
    a: "Yes. Write to us with group size, preferred dates, and any accessibility needs. We will propose a suitable project.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="volunteer-page">
        <header className="volunteer-hero">
          <div className="volunteer-hero__bg" aria-hidden="true" />
          <div className="max-width volunteer-hero__inner">
            <nav className="blog-breadcrumb blog-breadcrumb--on-dark volunteer-hero__breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="blog-breadcrumb__sep" aria-hidden="true">
                /
              </span>
              <span className="blog-breadcrumb__current">Volunteer</span>
            </nav>
            <p className="volunteer-hero__eyebrow">Get involved</p>
            <h1 className="volunteer-hero__title">Volunteer with Z-Foundation</h1>
            <p className="volunteer-hero__lead">
              Whether you can spare a weekend on the ground or an hour a week online, there is a meaningful way to help.
              Read how we work—then tell us how you would like to contribute.
            </p>
            <div className="volunteer-hero__actions">
              <Link href="/#contact" className="volunteer-btn volunteer-btn--primary">
                Apply / ask a question
              </Link>
              <Link href="/blog" className="volunteer-btn volunteer-btn--ghost">
                Read field stories
              </Link>
            </div>
          </div>
        </header>

        <div className="max-width volunteer-layout">
          <section className="volunteer-section" aria-labelledby="why-volunteer">
            <h2 id="why-volunteer" className="volunteer-section__title">
              Why volunteer with us
            </h2>
            <p className="volunteer-section__intro">
              We are a small team with big community partnerships. Volunteers extend our reach without replacing local
              leadership.
            </p>
            <ul className="volunteer-why-grid">
              {WHY.map((item) => (
                <li key={item.title}>
                  <article className="volunteer-why-card">
                    <div className="volunteer-why-card__icon" aria-hidden="true">
                      <i className={`fas ${item.icon}`} />
                    </div>
                    <h3 className="volunteer-why-card__title">{item.title}</h3>
                    <p className="volunteer-why-card__text">{item.text}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section className="volunteer-section" aria-labelledby="ways-to-help">
            <h2 id="ways-to-help" className="volunteer-section__title">
              Ways to help
            </h2>
            <p className="volunteer-section__intro">Pick what fits your skills and schedule—you can change paths later.</p>
            <ul className="volunteer-role-grid">
              {ROLES.map((role) => (
                <li key={role.title}>
                  <article className={`volunteer-role-card volunteer-role-card--${role.accent}`}>
                    <div className="volunteer-role-card__icon" aria-hidden="true">
                      <i className={`fas ${role.icon}`} />
                    </div>
                    <h3 className="volunteer-role-card__title">{role.title}</h3>
                    <p className="volunteer-role-card__text">{role.text}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section className="volunteer-section volunteer-section--tint" aria-labelledby="how-it-works">
            <h2 id="how-it-works" className="volunteer-section__title">
              How it works
            </h2>
            <p className="volunteer-section__intro">A simple path from interest to action—no guesswork.</p>
            <ol className="volunteer-steps">
              {STEPS.map((step) => (
                <li key={step.n} className="volunteer-step">
                  <span className="volunteer-step__num" aria-hidden="true">
                    {step.n}
                  </span>
                  <div className="volunteer-step__body">
                    <h3 className="volunteer-step__title">{step.title}</h3>
                    <p className="volunteer-step__text">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="volunteer-section" aria-labelledby="expectations">
            <h2 id="expectations" className="volunteer-section__title">
              What we ask—and what you can expect
            </h2>
            <div className="volunteer-split">
              <div className="volunteer-split__card">
                <h3 className="volunteer-split__heading">
                  <i className="fas fa-hand-holding-heart" aria-hidden="true" /> You bring
                </h3>
                <ul className="volunteer-checklist">
                  <li>Punctuality and respect for community norms</li>
                  <li>Willingness to follow safety instructions</li>
                  <li>Clear communication if your plans change</li>
                  <li>Comfortable clothing and closed shoes for field days</li>
                </ul>
              </div>
              <div className="volunteer-split__card volunteer-split__card--emphasis">
                <h3 className="volunteer-split__heading">
                  <i className="fas fa-circle-check" aria-hidden="true" /> We provide
                </h3>
                <ul className="volunteer-checklist">
                  <li>Briefings and a named point of contact on site</li>
                  <li>Rest, shade, and drinking water on outdoor activities</li>
                  <li>Roles matched to your capacity—no pressure to overextend</li>
                  <li>Recognition of your time in our annual impact summary</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="volunteer-section" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="volunteer-section__title">
              Common questions
            </h2>
            <div className="volunteer-faq">
              {FAQ.map((item) => (
                <details key={item.q} className="volunteer-faq__item">
                  <summary className="volunteer-faq__summary">{item.q}</summary>
                  <p className="volunteer-faq__answer">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <aside className="blog-cta volunteer-cta-bottom" aria-labelledby="volunteer-cta-title">
            <div className="blog-cta__inner">
              <div>
                <h2 id="volunteer-cta-title" className="blog-cta__title">
                  Ready to start?
                </h2>
                <p className="blog-cta__text">
                  Send us a short note with your location, availability, and interests—we reply as soon as we can.
                </p>
              </div>
              <Link href="/#contact" className="blog-cta__btn">
                Contact us
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
