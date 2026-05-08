"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import AuthNoticeModal from "@/components/AuthNoticeModal";

export default function RegisterPage() {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const onRegister = (e) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-card" aria-labelledby="register-title">
          <h1 id="register-title">Register</h1>
          <p className="auth-description">Create your account to get started.</p>

          <form onSubmit={onRegister} className="auth-form">
            <label className="auth-field">
              <span>Username or Email</span>
              <input type="text" name="identifier" placeholder="Enter username or email" required />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input type="password" name="password" placeholder="Create password" required />
            </label>

            <button type="submit" className="auth-action-btn">
              Register
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account?{" "}
            <Link href="/login" className="auth-switch-link">
              Login
            </Link>
          </p>
        </section>
      </main>

      <AuthNoticeModal isOpen={isNoticeOpen} onClose={() => setIsNoticeOpen(false)} />
    </>
  );
}
