import { BiDotsHorizontal } from "react-icons/bi";

export const ChatLoader = () => {
  return (
    <div className="d-flex flex-column align-items-start">
      <div
        className={`d-flex align-items-center bg-light border border-black px-4 py-2 rounded-3`}
        style={{ overflowWrap: "anywhere" }}
      >
        <BiDotsHorizontal color="black" />
      </div>
    </div>
  );
};