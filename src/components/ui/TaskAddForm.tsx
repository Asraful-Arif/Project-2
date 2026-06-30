import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Task, User } from "../../Types/types";
import SubtaskList from "./SubTask";

interface TaskModalProps {
  onClose: () => void;
  onSave: (task: Task) => void;
  projectId: string;
  members: User[];
  initialStatus?: Task["status"];
  editTask?: Task;
}

const TaskAddForm = ({
  onClose,
  onSave,
  projectId,
  members,
  initialStatus = "todo",
  editTask,
}: TaskModalProps) => {
  const [title, setTitle] = useState(editTask?.title ?? "");
  const [description, setDescription] = useState(editTask?.description ?? "");
  const [status, setStatus] = useState<Task["status"]>(
    editTask?.status ?? initialStatus,
  );
  const [priority, setPriority] = useState<Task["priority"]>(
    editTask?.priority ?? "medium",
  );
  const [assigneeId, setAssigneeId] = useState(
    editTask?.assigneeId ?? members[0]?.id ?? "",
  );
  const [dueDate, setDueDate] = useState(editTask?.dueDate ?? "");
  const [tags, setTags] = useState(editTask?.tags?.join(", ") ?? "");
  const [subtasks, setSubtasks] = useState(editTask?.subtasks ?? []);

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    const newTask: Task = {
      id: editTask?.id ?? `t${Date.now()}`,
      projectId,
      title,
      description,
      status,
      priority,
      assigneeId,
      dueDate,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 3),
      subtasks: subtasks,
    };
    onSave(newTask);
    toast.success("Task saved successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-800 text-lg">
            {editTask ? "Edit Task" : "New Task"}
          </h2>
          <button
            title="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Title </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter  title"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label className="text-sm text-slate-800 block mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="Status"
                className="text-sm text-slate-800 block mb-1"
              >
                Status
              </label>
              <select
                id="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Task["status"])}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="blocked">Blocked</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="Priority"
                className="text-sm text-slate-800 block mb-1"
              >
                Priority
              </label>
              <select
                id="Priority"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Task["priority"])
                }
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="Assignee"
                className="text-sm text-slate-800 block mb-1"
              >
                Assignee
              </label>
              <select
                id="Assignee"
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="Date"
                className="text-sm text-gray-500 block mb-1"
              >
                Due Date
              </label>
              <input
                id="Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Tags (comma separated, max 3)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Frontend, Backend, UI"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <SubtaskList subtasks={subtasks} onChange={setSubtasks} />
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <button
            title="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskAddForm;
