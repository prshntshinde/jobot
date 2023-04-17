import { useState } from "react";

export default function Home() {
    const [apiKey, setApiKey] = useState("");

    /* API Invocation with Fetch */
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const [botMessage, setBotMessage] = useState("");
    const sendRequest = async () => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "Hello!" }],
            }),
        });

        const resJson = await response.json();
        console.log(resJson);

        setBotMessage(resJson.choices[0].message.content);
    };

    

    /* Add more logic here*/

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

    {/* Test Button */}
    <div className="p-4">
        <button onClick={sendRequest} className="w-40 bordered rounded bg-blue-500 hover:bg-blue-600 text-white p-2">Send Request </button>
        <div className="mt-4 text-lg">{botMessage}</div>
    </div>

        {/* Add more UI here */}
    </div>
    );
}