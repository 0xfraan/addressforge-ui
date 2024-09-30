import React from "react";
import { X } from "lucide-react";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-mono p-4 z-30">
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-blue-500 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-blue-400 font-mono text-lg sm:text-xl">
            Instructions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <div className="text-blue-300 space-y-4 text-sm sm:text-base">
          <p>
            <strong>1. Set Deployer Address:</strong> Your connected wallet
            address will be automatically set as the deployer. You can edit this
            if needed.
          </p>
          <p>
            <strong>2. Gas Reduction:</strong> If you want, select a gas
            reduction level (2, 4, or 8) to determine the number of leading
            zeros in your contract address.
          </p>
          <p>
            <strong>3. Enter Pattern:</strong> Input your desired address
            pattern. You can use hexadecimal characters (0-9, a-f).
          </p>
          <p>
            <strong>4. Execute:</strong> Click the "Execute" button to submit
            your job. You have a limited number of free submissions. View the
            status of your submitted jobs.
          </p>
          <p>
            <strong>Note:</strong> If you run out of free executions, you can
            continue using the service by holding GLM tokens.
          </p>
        </div>
      </div>
    </div>
  );
};
