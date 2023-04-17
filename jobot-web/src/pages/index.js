import { useState } from "react";

export default function Home() {
    const [apiKey, setApiKey] = useState("");
    return (<div className="flex flex-col h-screen">
        {/* Navbar */}
        <nav className="bg-white shadow w-full">
            <div className="px-4 g-14 flex justify-between items-center">
                <div className="text-xl font-bold">Jobot</div>
                <div>
                    <input
                        type="password"
                        className="border rounded p-1"
                        placeholder="Enter API Key..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>
            </div>
        </nav>
        {/* Add more UI here */}
    </div>
    );
}