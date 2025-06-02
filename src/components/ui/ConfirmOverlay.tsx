import Button from "./Button";
import Text from "./Text";

interface ConfirmOverlayProps {
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmOverlay: React.FC<ConfirmOverlayProps> = ({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <>
      <div className="confirm-overlay-blur" />
      <div className="confirm-overlay-modal">
        <Text variant="regular-white-22">{message}</Text>
        <div className="confirm-overlay-modal__buttons">
          <Button variant="orange" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant="orange" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOverlay;
