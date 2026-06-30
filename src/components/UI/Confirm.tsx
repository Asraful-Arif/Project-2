import { Button } from "./button";

const Confirm = ({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-80 shadow-xl">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Remove Member?
      </h3>
      <p className="text-sm text-slate-500 mb-5">
        <span className="font-medium text-slate-700">{name}</span>
      </p>
      <div className="flex gap-3 justify-end">
        <Button
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-lg border border-slate-300 "
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Remove
        </Button>
      </div>
    </div>
  </div>
);

export default Confirm;