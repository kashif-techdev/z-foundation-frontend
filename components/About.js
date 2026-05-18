import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

const FACEBOOK_URL = "#";

const PILLARS = [
  {
    icon: "fa-heart-pulse",
    title: "Healthcare",
    description: "Medical aid and wellness support for families in need.",
  },
  {
    icon: "fa-graduation-cap",
    title: "Education",
    description: "Learning resources and opportunities for underprivileged youth.",
  },
  {
    icon: "fa-hand-holding-heart",
    title: "Basic needs",
    description: "Food, clothing, and shelter for those facing hardship.",
  },
  {
    icon: "fa-scale-balanced",
    title: "Transparent giving",
    description: "Zakat, Fitrana, and Sadaqah distributed per Islamic principles.",
  },
];

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="max-width">
        <h2 className="title" id="about-heading">
          About us
        </h2>
        <p className="about-subtitle">
          Compassion in action — serving communities with dignity and care.
        </p>

        <div className="about-content">
          <div className="column left">
            <div className="about-image-card">
              <div className="about-image-accent" aria-hidden="true" />
              <ImageWithFallback
                src="/images/logo.jpg"
                alt="Z-Foundation logo — a non-profit helping communities"
                width={400}
                height={400}
                className="about-logo"
              />
              <span className="about-badge">
                <i className="fas fa-hands-helping" aria-hidden="true" />
                Non-profit
              </span>
            </div>
          </div>

          <div className="column right">
            <p className="about-lead">
              Z-Foundation is a non-profit organization dedicated to improving
              the lives of underprivileged communities through healthcare,
              education, and essential support.
            </p>
            <p className="about-body">
              We provide direct assistance to individuals and families, collect
              Zakat, Fitrana, Sadaqah, and other charitable donations from those
              who are able to give, and distribute them to deserving people in
              accordance with Islamic principles and the laws of the country.
              Through compassion, transparency, and teamwork, we work toward a
              better future for every person we serve.
            </p>

            <ul className="about-pillars" aria-label="Our focus areas">
              {PILLARS.map((pillar) => (
                <li key={pillar.title} className="about-pillar">
                  <span className="about-pillar-icon" aria-hidden="true">
                    <i className={`fas ${pillar.icon}`} />
                  </span>
                  <div>
                    <h3 className="about-pillar-title">{pillar.title}</h3>
                    <p className="about-pillar-desc">{pillar.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="about-actions">
              <Link href="/donate" className="about-btn about-btn--primary">
                <i className="fas fa-hand-holding-heart" aria-hidden="true" />
                Support our mission
              </Link>
              <Link href="#contact" className="about-btn about-btn--secondary">
                <i className="fas fa-envelope" aria-hidden="true" />
                Get in touch
              </Link>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="about-btn about-btn--social"
                aria-label="Visit Z-Foundation on Facebook"
              >
                <i className="fab fa-facebook-f" aria-hidden="true" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
