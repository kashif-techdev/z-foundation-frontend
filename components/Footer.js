import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <span>
        Developer:{" "}
        <Link href="https://kashiftechdev.com" target="_blank" rel="noopener noreferrer">
          Kashif
        </Link>{" "}
        | <span className="far fa-copyright" /> 2025 All rights reserved.
      </span>
    </footer>
  );
}
