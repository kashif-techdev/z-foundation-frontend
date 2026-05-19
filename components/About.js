import ImageWithFallback from "./ImageWithFallback";

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="max-width about-wrap">
        <h2 className="title" id="about-heading">
          About Us
        </h2>

        <div className="about-content">
          <div className="about-media">
            <ImageWithFallback
              src="/images/logo.jpg"
              alt="Z-Foundation logo"
              width={320}
              height={320}
              className="about-logo"
            />
          </div>

          <div className="about-copy">
            <p>
              Z-Foundation is a non-profit organization working to improve the lives
              of underprivileged communities by supporting healthcare, education, and
              basic needs. We provide direct help to individuals and families who need
              support. We collect Zakat, Fitrana, Sadaqah, and other charitable donations
              from financially capable individuals and distribute them to deserving people
              in accordance with Islamic principles and the laws of the country. Through
              compassion, transparency, and teamwork, we aim to create a positive impact
              and build a better future for those we serve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
