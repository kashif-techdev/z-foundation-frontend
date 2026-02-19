import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "72px", marginBottom: "20px", color: "#007bff" }}>
        404
      </h1>
      <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Page Not Found</h2>
      <p style={{ fontSize: "18px", marginBottom: "30px", color: "#666" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 30px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          fontSize: "18px",
          transition: "background-color 0.3s",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
