import Link from "next/link";
import { AuthCard, AuthDivider } from "../_components/AuthCard";
import { EmailPasswordForm } from "../_components/EmailPasswordForm";
import { GoogleButton } from "../_components/GoogleButton";
import { signIn } from "./actions";

interface SignInPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { next, error } = await searchParams;
  const signUpHref = next ? `/sign-up?next=${encodeURIComponent(next)}` : "/sign-up";

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in to your diary"
      footer={
        <>
          New here?{" "}
          <Link href={signUpHref} style={{ color: "var(--link)" }}>
            Begin weaving
          </Link>
        </>
      }
    >
      <GoogleButton next={next} />
      <AuthDivider />
      <EmailPasswordForm
        mode="sign-in"
        action={signIn}
        next={next}
        errorMessage={error}
      />
    </AuthCard>
  );
}
