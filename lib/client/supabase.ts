import { createBrowserClient , createServerClient } from "@supabase/ssr"
import { Database } from "@/types/supabase"


export const createSuperbaseBrowserClient =()=>
    // api setting
    createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPERBASE_URL!,
        process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY!
    );
