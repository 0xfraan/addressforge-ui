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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg border border-blue-500">
        <h2 className="text-blue-400 font-mono text-lg mb-4">
          Edit Deployer Address
        </h2>
        <input
          type="text"
          value={editAddress}
          onChange={(e) => setEditAddress(e.target.value)}
          placeholder="Enter new address"
          className="w-full bg-gray-700 text-blue-300 border border-blue-500 focus:border-blue-400 placeholder-gray-500 font-mono rounded-md p-2 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-black font-bold px-4 py-2 rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  ) : null;
