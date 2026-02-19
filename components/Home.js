import Link from "next/link";
import TypingText from "./TypingText";
import Chatbot from "./Chatbot";

const FACEBOOK_URL = "#";
const INSTAGRAM_URL = "#";
// WhatsApp number - format: country code + number (remove any spaces/dashes)
const WHATSAPP_NUMBER = "923330202415"; // Pakistan: 92 + 3330202415
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const YOUTUBE_URL = "#";

export default function Home() {
  return (
    <section className="home" id="home">
      <div className="max-width">
        <div className="home-content">
          <div className="text-1">Welcome To</div>
          <div className="text-2">Z-Foundation</div>
          <div className="text-3">
            we provide <TypingText />
          </div>
          <Link href="#contact" className="cta-link">
            Donate us
          </Link>
          <div className="icons">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="fb"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="insta"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp" />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>
      </div>
      <Chatbot />
    </section>
  );
}
