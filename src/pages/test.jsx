import { createClient } from "@supabase/supabase-js";
import { useState } from "react"

let url = "https://oqebshcqwhjdopmjtxll.supabase.co";
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xZWJzaGNxd2hqZG9wbWp0eGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTkyMjksImV4cCI6MjA4ODg5NTIyOX0.YXd6EFZRVOcp5g6vmPz8sTUgu33GqG04rEeG9xtON-E";

const supabase = createClient(url, key);

export default function TestPage() {
    const [file, setFile] = useState(null);

    function handleUpload() {
        console.log(file);
        supabase.storage.from("images").upload(file.name, file, {
            upsert: false,
            cacheControl: "3600",
        }).then((response) => {
            console.log(response);
            const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl;
            console.log(publicUrl);
        }).catch((error) => {
            console.log(error);
        });

    }
   

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-primary">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button className="bg-secondary text-white px-4 py-2 rounded-lg" onClick={handleUpload}>
                Upload
            </button>
        </div>
    )
}