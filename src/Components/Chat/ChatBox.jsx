import { Chat } from "./Chat";
import { useEffect, useRef, useState } from "react";
import { OpenAIStream } from "@/Utils/OpenAIStream";
import { SuperpowerAPI, gptmodel, PointAPI, PointDebit, PointCredit } from "@/Utils/AxiosUtils/API";
import { GetKnowldege } from "@/Utils/GetKnowldege/GetKnowldege";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/AxiosUtils";
import useCreate from "@/Utils/Hooks/useCreate";
import { calculateTokenPrice } from "@/Utils/TokenUtil/calculateTokenPrice";

export default function ChatBox({productData}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [tokenBalance, setTokenBalance] = useState(0);

  const messagesEndRef = useRef(null);

  const { data: superpowers, isLoading: superpowerloading } = useQuery([SuperpowerAPI, productData['superpowers']], () => request({ url: SuperpowerAPI, method: 'get', params: {ids: productData['superpowers'].join()} }), { refetchOnWindowFocus: false, select: (res) => res?.data.data });
  const { data: pointsData, isLoading: pointsDataLoading, refetch: refecthPointsData } = useQuery([PointAPI], () => request({ url: PointAPI, params: { paginate: 10 } }), {
    select: (res) => res?.data,
  });
  const { mutate: createPointDebit, isLoading: debitLoader } = useCreate(PointDebit, false, false, false, () => {
    refecthPointsData();
  }, true);
  const { mutate: createPointCredit, isLoading: creditLoader } = useCreate(PointCredit, false, false, false, () => {
    refecthPointsData();
  }, true);
  const { data: customModelData, isLoading: modelLoader, refetch, fetchStatus } = useQuery([gptmodel, productData['gpt_model']], () => request({
    url: `${gptmodel}/${productData['gpt_model']}`}), { refetchOnWindowFocus: false, select: (res) => res?.data });

  useEffect(() => {
    if(pointsData && !pointsDataLoading) {
      setTokenBalance(pointsData.balance)
    }
  }, [pointsData, pointsDataLoading])

  useEffect(() => {
    if(productData.prompts) {
        setSelectedPrompts(productData.prompts)
    }
  }, [productData])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message) => {
    if(pointsData?.balance <= 0) {
      alert("You don't have enough Points balances...");
      return;
    }

    const promptTexts = selectedPrompts.map(prom => ({role: "user", content: prom.prompt_text}))
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    let knowledgeText = "";

    if (productData['superpowers'] && productData['superpowers'].length > 0) {
      knowledgeText = await handleGetKnowledges(message.content);
    }

    try {
        const charLimit = 12000;
        let charCount = 0;
        let messagesToSend = [];

        for (let i = 0; i < updatedMessages.length; i++) {
            const message = updatedMessages[i];
            if (charCount + message.content.length > charLimit) {
                messagesToSend.push(...promptTexts);
                messagesToSend.push({role: 'user', content: `KNOWLEDGE DATA TO REFERENCE FOR YOU: ${knowledgeText}`});
                messagesToSend.push(updatedMessages[updatedMessages.length - 1]);
                break;
            }
            charCount += message.content.length;
            if(i === updatedMessages.length - 1) {
                messagesToSend.push(...promptTexts);
                messagesToSend.push({role: 'user', content: `KNOWLEDGE DATA TO REFERENCE FOR YOU: ${knowledgeText}`});
            }
            messagesToSend.push(message);
        }

        OpenAIStream(messagesToSend, customModelData?.name, customModelData?.api_url, customModelData?.api_key)
            .then(response => {
                setMessages((messages) => [
                    ...messages,
                    {
                    role: "assistant",
                    content: response.text,
                    },
                ]);
                const total_token_values = calculateTokenPrice(customModelData?.token_price, response.token);
                const equity = getEquityValue();
                createPointDebit({balance: total_token_values});
                createPointCredit({balance: total_token_values * equity, consumer_id: productData?.created_by_id});
                createPointCredit({balance: total_token_values * (1 - equity), consumer_id: 1});
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

  const getEquityValue = () => {
    switch (productData?.participate_type) {
      case "standard":
        return 0.1;
      case "premium":
        return 0.5;
      case "platinum":
        return 1;    
      default:
        break;
    }
    return 0.5;
  }

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

  const handleGetKnowledges = async (message) => {
    return new Promise((resolve, reject) => {
      const partition_names = superpowers?.map(item => (item.always_knowledges.split(','))).flat();
      GetKnowldege(message, partition_names)
        .then(response => {
          resolve(response[0]);
        })
        .catch(error => {
          reject(error);
        })
    })
  }

  return (
    <>
      <div className="d-flex flex-column">
        <div className="flex-grow-1 overflow-auto px-2 px-sm-10 pb-4 pb-sm-10">
          <div className="d-flex justify-content-end me-3" style={{color: "orange"}}>Points left: {tokenBalance}</div>
          <div className="mx-auto mt-4 mt-sm-12">
            <Chat
              messages={messages}
              loading={loading || superpowerloading || modelLoader}
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
