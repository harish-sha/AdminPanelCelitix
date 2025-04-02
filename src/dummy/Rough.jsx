const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setAiSuggestion("");
    setIsTypingDone(false);
    setHasInserted(false);
    setGenerationCount((prev) => prev + 1); // forces new key

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4", // Use the appropriate model (e.g., gpt-3.5-turbo or gpt-4)
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: aiPrompt },
                ],
                max_tokens: 1024, // Limit the response length
                temperature: 0.7, // Adjust creativity level
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`, // Use the API key from the environment variable
                },
            }
        );

        const text = response.data.choices[0].message.content;

        const totalLength = templateFormat.length + text.length;
        const finalText =
            totalLength > 1024 ? text.slice(0, 1024 - templateFormat.length) : text;

        setAiSuggestion(finalText);
        setTypingKey((prev) => prev + 1); // force TypingText to re-render only here
    } catch (err) {
        console.error("Error generating content:", err);
        toast.error("Failed to generate AI response. Please try again.");
    } finally {
        setIsGenerating(false);
    }
};