"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import AuthNoticeModal from "@/components/AuthNoticeModal";

export default function LoginPage() {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-card" aria-labelledby="login-title">
          <h1 id="login-title">Login</h1>
          <p className="auth-description">Sign in to continue.</p>

          <form onSubmit={onLogin} className="auth-form">
            <label className="auth-field">
              <span>Username or Email</span>
              <input type="text" name="identifier" placeholder="Enter username or email" required />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input type="password" name="password" placeholder="Enter password" required />
            </label>

            <button type="submit" className="auth-action-btn">
              Login
            </button>
          </form>

          <p className="auth-switch-text">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="auth-switch-link">
              Register
            </Link>
          </p>
        </section>
      </main>

      <AuthNoticeModal isOpen={isNoticeOpen} onClose={() => setIsNoticeOpen(false)} />
    </>
  );
}
