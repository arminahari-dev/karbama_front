"use client";

import React, { ReactNode } from "react";

interface ModalProps {
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  InputElement: ReactNode;
}

const EditModal: React.FC<ModalProps> = ({
  content,
  onConfirm,
  onCancel,
  InputElement,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{content}</h2>
        <>{InputElement}</>
        <div className="flex justify-between">
          <button className="!bg-transparent border border-border" onClick={onCancel}>لغو</button>
          <button onClick={onConfirm}>تایید</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
