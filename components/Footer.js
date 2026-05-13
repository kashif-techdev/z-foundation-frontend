import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <span>
        <Link href="/blog">Blog</Link>
        {" "}
        | <Link href="/donate">Donate</Link>
        {" "}
        | <Link href="/volunteer">Volunteer</Link>
        {" "}
        | <Link href="/support">Support</Link>
        {" "}
        | <a href="mailto:info@zifoundation.com">info@zifoundation.com</a>
        {" "}
        | <span className="far fa-copyright" /> 2026 All rights reserved to Z-Founation .
      </span>
    </footer>
  );
}
