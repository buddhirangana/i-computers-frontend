import { createClient } from "@supabase/supabase-js";

let url = "https://oqebshcqwhjdopmjtxll.supabase.co";
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xZWJzaGNxd2hqZG9wbWp0eGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTkyMjksImV4cCI6MjA4ODg5NTIyOX0.YXd6EFZRVOcp5g6vmPz8sTUgu33GqG04rEeG9xtON-E";

const supabase = createClient(url, key);

export default function uploadMedia(file) {
    return new Promise();
}
