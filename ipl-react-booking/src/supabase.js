import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lincywypxqnbydznxsti.supabase.co";

const supabaseKey = "sb_publishable_0bm_Z7UaViQHX_Vpsp7n0A_NFcBkMX_";

export const supabase = createClient(supabaseUrl, supabaseKey);