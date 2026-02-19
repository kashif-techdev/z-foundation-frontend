import Link from "next/link";
import TypingText from "./TypingText";
import ImageWithFallback from "./ImageWithFallback";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="max-width">
        <h2 className="title">About us</h2>
        <div className="about-content">
          <div className="column left">
            <ImageWithFallback
              src="/images/logo.jpg"
              alt="Z-Foundation logo - A non-profit organization helping communities"
              width={400}
              height={400}
            />
          </div>
          <div className="column right">
            <div className="text">
              Z-Foundation always help in <TypingText />
            </div>
            <p>
              During this Covid-19 pandemic we saw a lot of pains, deaths,
              hunger, fall down of education and many more problems. So we
              stand for this to solve some of these problems and provide
              everyone. Currently we are available in Darbhanga, Bihar. Need help
              to grow more.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Z-Foundation Facebook page"
            >
              Facebook page
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
