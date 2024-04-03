import { useRef, useState } from "react";
import { ResetChat } from "./ResetChat";

export const ChatInput = ({ onSend, onReset, loading }) => {
  const [content, setContent] = useState();

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert("Message limit is 4000 characters");
      return;
    }

    setContent(value);
  };

  const handleSend = () => {
    if (!content) {
      alert("Please enter a message");
      return;
    }
    onSend({ role: "user", content });
    setContent("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

//   useEffect(() => {
//     if (textareaRef && textareaRef.current) {
//       textareaRef.current.style.height = "inherit";
//       textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
//     }
//   }, [content]);

  return (
    <div className="position-relative d-flex">
      <textarea
        ref={textareaRef}
        className="rounded-lg ps-4 pe-12 py-2 me-2" 
        style={{ resize: "none", width: "100%", border: "2px solid #cbd5e0" }}
        placeholder="Type a message..."
        value={content}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <div className="d-flex flex-row align-items-center">
        <button 
            disabled={loading}
            className="ms-2 btn btn-sm btn-dark h-100 font-weight-bold rounded-lg hover:bg-third focus:outline-none focus:ring-1 focus:ring-neutral-300"
            onClick={() => handleSend()}>
            Send
        </button>
      </div>
      <ResetChat onReset={onReset} />
    </div>
  );
};
