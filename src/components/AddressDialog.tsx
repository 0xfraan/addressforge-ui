import React from "react";
import { X } from "lucide-react";

interface AddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editAddress: string;
  setEditAddress: (address: string) => void;
  onSubmit: () => void;
}

export const AddressDialog: React.FC<AddressDialogProps> = ({
  isOpen,
  onClose,
  editAddress,
  setEditAddress,
  onSubmit,
}) =>
  isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg border border-blue-500 w-full max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-blue-400 font-mono text-xl">
            Edit Deployer Address
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <input
          type="text"
          value={editAddress}
          onChange={(e) => setEditAddress(e.target.value)}
          placeholder="Enter new address"
          className="w-full bg-gray-700 text-blue-300 border border-blue-500 focus:border-blue-400 placeholder-gray-500 font-mono rounded-md p-3 mb-6 text-lg"
          maxLength={42}
        />
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-black font-bold px-6 py-3 rounded-md text-lg transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  ) : null;
