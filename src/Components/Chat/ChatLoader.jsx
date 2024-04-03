import { BiDotsHorizontal } from "react-icons/bi";

export const ChatLoader = () => {
  return (
    <div className="d-flex flex-column align-items-start">
      <div
        className={`d-flex align-items-center bg-third border border-neutral-300 px-4 py-2 rounded-3`}
        style={{ overflowWrap: "anywhere" }}
      >
        <BiDotsHorizontal color="white" />
      </div>
    </div>
  );
};