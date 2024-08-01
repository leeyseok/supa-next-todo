import { createServerSideClient } from "@/lib/supabase"

export const getUser = async ({ serverComponent = false }) => {
  const supabase = await createServerSideClient(serverComponent);
  const user = await supabase.auth.getUser();
  return user?.data?.user;
};

export const getProfileById = async({
  serverComponet = false,
  userId= "",
}) => {
  const supabase = await createServerSideClient(serverComponet);
  const profile = await supabase.from("profiles").select("*").eq("id", userId) 
  return profile?.data?.[0];
};
