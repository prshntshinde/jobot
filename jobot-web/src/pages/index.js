import { useState } from "react";
import Head from "next/head";

export default function Home() {
    const [apiKey, setApiKey] = useState("");
    /* Message History & Chat Input */
    const [userMessage, setUserMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "system",
            content: "You are Jobot, a helpful AI developed by Prashant ans powered by state-of-the-art machine learning models.",
        },
    ]);

    const API_URL = "https://api.openai.com/v1/chat/completions";
    const sendRequest = async () => {
        const updateMessages = [...messages,
        {
            role: "user",
            content: userMessage,
        },
        ];

        setMessages(updatedMessages);
        setUserMessage("");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: updateMessages,
                }),
            });

            const resJson = await response.json();
            console.log(resJson);

            const updatedMessages2 = [...updateMessages, resJson.choices[0].message];
            setMessages(updatedMessages2);
        } catch (error) {
            console.error("error");
            window.alert("Error: " + error.message);
        }
    };


    /* API Invocation with Fetch */
    /* const API_URL = "https://api.openai.com/v1/chat/completions";
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
    }; */


    /* Add more logic here*/

    
    return (
        <>
            <Head>
                <title>Jobot - Powered by GPT</title></Head>
            <div className="flex flex-col h-screen">
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
                {/* Message History */}
                <div className="flex-1 overflow-y-scroll">
                    <div className="mx-auto w-full max-w-screen-md p-4">
                        {messages.filter((msg) => msg.role !== "system").map((msg, idx) => (
                            <div key={idx} className="mt-3">
                                <div className="font-bold">
                                    {msg.role === "user" ? "You" : "Jobot"}
                                </div>
                                <div className="text-lg">{msg.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
                { /* Message Input */}
                <div className="mx-auto w-full max-w-screen-md px-4 pt-0 pb-2 flex">
                    <textarea className="border rounded-md text-lg p-2 flex-1" rows={1} placeholder="Ask me anything..." value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
                    <button onClick={sendRequest} className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2">
                        Send
                    </button>
                </div>
                </div>
            </>
            );
}