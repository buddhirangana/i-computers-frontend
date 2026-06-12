import { createClient } from "@supabase/supabase-js";

let url = import.meta.env.VITE_SUPABASE_URL;
let key = import.meta.env.VITE_SUPABASE_KEY;

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