export const ResetChat = ({ onReset }) => {
  return (
    <div className="d-flex flex-row align-items-center">
      <button
        className="ms-2 btn btn-sm btn-dark h-100 font-weight-bold rounded-lg hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-neutral-300"
        onClick={() => onReset()}
      >
        Reset
      </button>
    </div>
  );
};