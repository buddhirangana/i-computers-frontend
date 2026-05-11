import { createClient } from "@supabase/supabase-js";

let url = "https://oqebshcqwhjdopmjtxll.supabase.co";
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xZWJzaGNxd2hqZG9wbWp0eGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTkyMjksImV4cCI6MjA4ODg5NTIyOX0.YXd6EFZRVOcp5g6vmPz8sTUgu33GqG04rEeG9xtON-E";

const supabase = createClient(url, key);

export default function uploadMedia(file) {
    return new Promise((resolve, reject) => {

        if (!file) {
            reject(new Error("No file selected"));
            return;
        }

        const timestamp = new Date().getTime();
        const fileName = `${timestamp}_${file.name}`;

        supabase.storage
            .from("images")
            .upload(fileName, file, {
                upsert: false,
                cacheControl: "3600",
            })
            .then(() => {
                const { data } = supabase.storage
                    .from("images")
                    .getPublicUrl(fileName);

                if (!data || !data.publicUrl) {
                    reject(new Error("Failed to get image public URL"));
                    return;
                }

                resolve(data.publicUrl);
            })
            .catch((error) => {
                const errorMessage = error?.message || "Failed to upload image to storage";
                reject(new Error(errorMessage));
            });
    });
}