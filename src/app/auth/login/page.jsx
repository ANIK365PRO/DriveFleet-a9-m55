"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  Eye,
  EyeSlash,
  Person,
} from "@gravity-ui/icons";

import { signIn } from "@/lib/auth-client";

const fieldClass =
  "h-12 rounded-xl border border-border bg-surface px-4 text-foreground shadow-sm transition-all duration-200 placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 dark:bg-surface";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const registered = searchParams.get("registered") === "true";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    try {
      setIsLoading(true);

      const formData = new FormData(event.currentTarget);

      const email = formData.get("email")?.toString().trim();
      const password = formData.get("password")?.toString();

      if (!email) {
        setServerError("Please enter your email address.");
        return;
      }

      if (!password) {
        setServerError("Please enter your password.");
        return;
      }

      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);

        const message = error.message?.toLowerCase() || "";

        if (
          message.includes("invalid") ||
          message.includes("credential") ||
          message.includes("password") ||
          message.includes("unauthorized")
        ) {
          setServerError(
            "Invalid email or password. Please check your credentials and try again."
          );
        } else {
          setServerError(
            "Unable to sign in right now. Please try again in a moment."
          );
        }

        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);

      setServerError(
        "Something went wrong while signing in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-background px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl lg:grid-cols-[1.1fr_0.9fr]">
        {/* =====================================================
            LEFT BRAND PANEL
        ====================================================== */}
        <section className="relative hidden overflow-hidden bg-primary p-8 text-white lg:flex lg:min-h-[680px] lg:flex-col lg:justify-between lg:p-12">
          {/* Decorative shapes */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to DriveFleet
            </Link>

            <div className="mt-24 max-w-md">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-primary shadow-lg">
                <Person className="h-7 w-7" />
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                Welcome back to{" "}
                <span className="text-gold">DriveFleet.</span>
              </h1>

              <p className="mt-6 text-base leading-7 text-white/70">
                Sign in to manage your bookings, explore available vehicles,
                and continue your journey with DriveFleet.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="relative z-10 space-y-4">
            {[
              "Manage your car bookings easily",
              "Explore available vehicles",
              "Enjoy a simple rental experience",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <CircleCheck className="h-4 w-4" />
                </span>

                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            LOGIN FORM
        ====================================================== */}
        <section className="flex items-center justify-center p-5 sm:p-8 md:p-10 lg:p-12">
          <div className="w-full max-w-xl">
            {/* =================================================
                MOBILE HEADER
            ================================================== */}
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to DriveFleet
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-primary">
                  <Person className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase text-accent">
                    Welcome Back
                  </p>

                  <p className="text-xl font-bold text-text-primary">
                    Sign in to DriveFleet
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                HEADING
            ================================================== */}
            <div className="mb-8">
              <p className="mb-2 hidden text-sm font-semibold uppercase tracking-[0.18em] text-accent lg:flex">
                Welcome Back
              </p>

              <h2 className="hidden text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:flex">
                Sign in to your account
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary sm:text-base">
                Enter your credentials to access your DriveFleet account.
              </p>
            </div>

            {/* =================================================
                REGISTRATION SUCCESS
            ================================================== */}
            {registered && (
              <div
                role="status"
                className="mb-6 flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success"
              >
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" />

                <div>
                  <p className="font-semibold">Account created successfully!</p>

                  <p className="mt-1 text-success/80">
                    Please sign in with your email and password.
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                SERVER ERROR
            ================================================== */}
            {serverError && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm font-medium text-error"
              >
                {serverError}
              </div>
            )}

            {/* =================================================
                LOGIN FORM
            ================================================== */}
            <Form
              className="w-full"
              onSubmit={handleSubmit}
              validationBehavior="native"
            >
              <Fieldset className="border-0 p-0">
                <FieldGroup className="gap-5">
                  {/* ================= EMAIL ================= */}
                  <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                      if (!value.trim()) {
                        return "Email is required.";
                      }

                      if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                      ) {
                        return "Please enter a valid email address.";
                      }

                      return null;
                    }}
                  >
                    <Label className="mb-2 font-medium text-text-primary">
                      Email Address
                    </Label>

                    <Input
                      className={fieldClass}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />

                    <FieldError className="mt-1 text-sm text-error" />
                  </TextField>

                  {/* ================= PASSWORD ================= */}
                  <TextField
                    isRequired
                    name="password"
                    type={showPassword ? "text" : "password"}
                    validate={(value) => {
                      if (!value.trim()) {
                        return "Password is required.";
                      }

                      return null;
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="font-medium text-text-primary">
                        Password
                      </Label>

                      <Link
                        href="/auth/forgot-password"
                        className="text-sm font-medium text-accent transition-colors hover:text-gold hover:underline hover:underline-offset-4"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <Input
                        className={`${fieldClass} pr-12 w-full`}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-text-muted transition-colors hover:text-text-primary"
                      >
                        {showPassword ? (
                          <EyeSlash className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <FieldError className="mt-1 text-sm text-error" />
                  </TextField>
                </FieldGroup>

                {/* =================================================
                    ACTIONS
                ================================================== */}
                <Fieldset.Actions className="mt-7 flex flex-col gap-4">
                  {/* Login Button */}
                  <Button
                    type="submit"
                    isDisabled={isLoading}
                    className="h-12 w-full rounded-xl bg-gold font-bold text-primary shadow-md shadow-gold/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="flex w-full items-center gap-3">
                    <div className="h-px flex-1 bg-border" />

                    <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      or
                    </span>

                    <div className="h-px flex-1 bg-border" />
                  </div>

                  {/* Google */}
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-12 w-full rounded-xl border border-border bg-transparent font-semibold text-text-primary transition-all hover:border-accent hover:bg-accent/5"
                  >
                    <GoogleIcon />
                    Continue with Google
                  </Button>
                </Fieldset.Actions>
              </Fieldset>
            </Form>

            {/* =================================================
                REGISTER LINK
            ================================================== */}
            <p className="mt-7 text-center text-sm text-text-secondary">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-accent underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                Create Account
              </Link>
            </p>

            {/* =================================================
                FOOTER NOTE
            ================================================== */}
            <p className="mt-6 text-center text-xs leading-5 text-text-muted">
              By signing in, you agree to use DriveFleet responsibly and keep
              your account information secure.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

/* =========================================================
   GOOGLE ICON
========================================================= */

const GoogleIcon = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z" />
      <path d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.5Z" />
      <path d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.11-1.08.31-1.59V7.89H3.3A9.5 9.5 0 0 0 2.5 12c0 1.53.37 2.97.8 4.11l3.24-2.52Z" />
      <path d="M12 6.38c1.43 0 2.7.49 3.71 1.46l2.78-2.78C16.84 3.49 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.52C7.31 8.1 9.46 6.38 12 6.38Z" />
    </svg>
  );
};

export default LoginPage;