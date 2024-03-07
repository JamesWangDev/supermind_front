import { Chat } from "./Chat";
import { useEffect, useRef, useState } from "react";
import { OpenAIStream } from "@/Utils/OpenAIStream";
import { ChatGPTAPI, AnyScaleAPI } from "@/Utils/AxiosUtils/API";

export default function ChatBox({productData}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrompts, setSelectedPrompts] = useState([]);

  const messagesEndRef = useRef(null);

  // const { data: promptData, isLoading: promptLoader } = useQuery(["prompts", values['prompts']], () => request({ url: PromptAPI }), { refetchOnWindowFocus: false, select: (res) => res?.data });

  useEffect(() => {
    if(productData.prompts) {
        setSelectedPrompts(productData.prompts)
    }
  }, [productData])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message) => {
    const promptTexts = selectedPrompts.map(prom => ({role: "user", content: prom.prompt_text}))
    const updatedMessages = [...messages, message];

    const getModelandAPI = (model) => {
        if (model.includes("gpt")) {
            return {model: model, api: ChatGPTAPI, api_key: process.env.OPENAI_API_KEY};
        }
        if (model.includes("anyscale")) {
            return {model: model.replace("anyscale-", ""), api: AnyScaleAPI, api_key: process.env.ANYSCALE_API_KEY}
        }
        return {model: model, api: ChatGPTAPI, api_key: process.env.OPENAI_API_KEY};
    }

    const {model, api, api_key} = getModelandAPI(productData.gpt_model || "")

    setMessages(updatedMessages);
    setLoading(true);

    try {
        const charLimit = 12000;
        let charCount = 0;
        let messagesToSend = [];

        for (let i = 0; i < updatedMessages.length; i++) {
            const message = updatedMessages[i];
            if (charCount + message.content.length > charLimit) {
                messagesToSend.push(...promptTexts);
                messagesToSend.push(updatedMessages[updatedMessages.length - 1]);
                break;
            }
            charCount += message.content.length;
            if(i === updatedMessages.length - 1) {
                messagesToSend.push(...promptTexts);
            }
            messagesToSend.push(message);
        }

        OpenAIStream(messagesToSend, model, api, api_key)
            .then(response => {
                setMessages((messages) => [
                    ...messages,
                    {
                    role: "assistant",
                    content: response,
                    },
                ]);
            
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                alert("Error while fetching from API!")
                setMessages((messages) => [
                    ...messages,
                    {
                    role: "assistant",
                    content: "Fetch Error...",
                    },
                ]);
            })
    } catch (error) {
        console.error(error);
        setLoading(false);
        return;
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: productData['greetings'] || 'Hello, How can I assist you today?',
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: productData['greetings'] || 'Hello, How can I assist you today?',
      },
    ]);
  }, []);

  return (
    <>
      <div className="d-flex flex-column">
        <div className="flex-grow-1 overflow-auto px-2 px-sm-10 pb-4 pb-sm-10">
          <div className="mx-auto mt-4 mt-sm-12">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  );
}
