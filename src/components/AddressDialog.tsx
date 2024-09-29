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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2">
      <div className="bg-gray-800 p-4 rounded-lg border border-blue-500 w-full max-w-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-blue-400 font-mono text-lg">Edit Deployer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <input
          type="text"
          value={editAddress}
          onChange={(e) => setEditAddress(e.target.value)}
          placeholder="Enter new address"
          className="w-full bg-gray-700 text-blue-300 border border-blue-500 focus:border-blue-400 placeholder-gray-500 font-mono rounded-md p-2 mb-3 text-sm"
          maxLength={42}
        />
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md text-sm transition-colors font-mono"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  ) : null;
