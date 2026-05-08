import { redirect } from "next/navigation";
import { createClient } from "./server";

// Used by every dashboard page (and any server action that needs the user).
// Returns the Supabase client + the authenticated user, or redirects to sign-in.
export async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/sign-in");
  }
  return { supabase, user: data.user };
}
