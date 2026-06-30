import { useState } from "react";
import type { Task } from "@/Types/types";

interface Props {
  subtasks: Task["subtasks"];
  onChange: (subtasks: Task["subtasks"]) => void;
}

const SubtaskList = ({ subtasks, onChange }: Props) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onChange([
      ...subtasks,
      { id: `st${Date.now()}`, title: input.trim(), done: false },
    ]);
    setInput("");
  };

  const handleToggle = (id: string) => {
    onChange(
      subtasks.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  return (
    <div>
      <label className="text-sm text-gray-500 block mb-1">Subtasks</label>

      
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add subtask..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {subtasks.map((sub) => (
          <div
            key={sub.id}
            onClick={() => handleToggle(sub.id)}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0
              ${sub.done ? "bg-green-500 border-green-500" : "border-slate-300"}`}
            >
              {sub.done && <span className="text-white text-xs">✓</span>}
            </div>
            <span className={sub.done ? "line-through text-slate-400" : "text-slate-600"}>
              {sub.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubtaskList;