import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <span>
        <Link href="/blog">Blog</Link>
        {" "}
        | <Link href="/volunteer">Volunteer</Link>
        {" "}
        | <span className="far fa-copyright" /> 2026 All rights reserved to Z-Founation .
      </span>
    </footer>
  );
}
