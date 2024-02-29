import { createClient } from '@supabase/supabase-js'

const getSupabaseClient = () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )
    return supabase
}

export { getSupabaseClient }