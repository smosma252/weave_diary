import Link from "next/link";
import { AuthCard, AuthDivider } from "../_components/AuthCard";
import { EmailPasswordForm } from "../_components/EmailPasswordForm";
import { GoogleButton } from "../_components/GoogleButton";
import { signUp } from "./actions";

interface SignUpPageProps {
  searchParams: Promise<{
    next?: string;
    email?: string;
    error?: string;
    confirm?: string;
  }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { next, email, error, confirm } = await searchParams;

  if (confirm) {
    return (
      <AuthCard
        eyebrow="Almost there"
        title="Check your inbox"
        subtitle={`We sent a confirmation link to ${confirm}. Click it to finish signing up.`}
        footer={
          <>
            Wrong address?{" "}
            <Link href="/sign-up" style={{ color: "var(--link)" }}>
              Start over
            </Link>
          </>
        }
      >
        <p
          style={{
            font: "var(--type-body-sm)",
            color: "var(--fg-3)",
            margin: 0,
          }}
        >
          The link expires in an hour. If it doesn&rsquo;t arrive, check spam,
          then try again.
        </p>
      </AuthCard>
    );
  }

  const signInHref = next ? `/sign-in?next=${encodeURIComponent(next)}` : "/sign-in";

  return (
    <AuthCard
      eyebrow="Begin weaving"
      title="Create your diary"
      subtitle="Connect a thread or two, leave a voice note tonight, and read your first entry tomorrow morning."
      footer={
        <>
          Already have an account?{" "}
          <Link href={signInHref} style={{ color: "var(--link)" }}>
            Sign in
          </Link>
        </>
      }
    >
      <GoogleButton next={next} />
      <AuthDivider />
      <EmailPasswordForm
        mode="sign-up"
        action={signUp}
        next={next}
        defaultEmail={email}
        errorMessage={error}
      />
    </AuthCard>
  );
}
