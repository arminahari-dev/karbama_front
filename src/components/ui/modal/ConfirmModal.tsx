interface ModalProps {
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{content}</h2>
        <div className="flex justify-between">
          <button
            className="!bg-transparent border border-border"
            onClick={onCancel}
          >
            لغو
          </button>
          <button onClick={onConfirm}>تایید</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
