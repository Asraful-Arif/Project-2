import { Task, User } from "@/Types/types";
import { Calendar, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";


interface Props {
  task: Task;
  members: User[];
  onClose: () => void;
  onDelete: (id: string) => void;
}

const priorityColor: Record<string, string> = {
  low: "bg-gray-100 text-gray-500",
  medium: "bg-blue-100 text-blue-600",
  high: "bg-amber-100 text-amber-600",
  critical: "bg-red-100 text-red-600",
};

const status: Record<string, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  blocked: "Blocked",
  completed: "Completed",
};

const TaskDetailsPage = ({ task, members, onClose, onDelete }: Props) => {
  const assignee = members.find((m) => m.id === task.assigneeId);
  const completedSubtasks = task.subtasks.filter((s) => s.done).length;
  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg  w-130 h-140 p-6 shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {task.title}
          </h2>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </Button>
        </div>

        {task.tags.length > 0 && (
          <div className="flex gap-2 mb-3">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-slate-100 text-slate-800 px-3 py-1 rounded-lg m-2"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <span
            className={`text-sm px-3 py-1 rounded-lg ${priorityColor[task.priority]}`}
          >
            {task.priority}
          </span>
          <span className="text-sm px-3 py-1 rounded-lg bg-slate-100 text-slate-600">
            {status[task.status]}
          </span>
        </div>

        {task.description && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-slate-900 mb-1">
              Description
            </h3>
            <p className="text-sm text-slate-600">{task.description}</p>
          </div>
        )}

        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm text-slate-800 mb-4">
            <Calendar size={16} />
            <span>{task.dueDate}</span>
          </div>
        )}

        {task.subtasks.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">
              Subtasks ({completedSubtasks}/{task.subtasks.length})
            </h3>
            <div className="space-y-2">
              {task.subtasks.map((sub) => (
                <div key={sub.id} className="flex items-center gap-2 text-sm">
                  <div
                    className={`w-6 h-6 rounded border flex items-center justify-center
                    ${sub.done ? "bg-blue-500 border-slate-200" : "border-slate-300"}`}
                  >
                    {sub.done && <span className="text-white text-sm"><Check/></span>}
                  </div>
                  <span
                    className={sub.done ? " text-slate-800" : "text-slate-600"}
                  >
                    {sub.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {assignee && (
          <div className="flex items-center gap-2 mt-6">
            <img
              src={assignee.avatar}
              alt={assignee.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-lg text-slate-800">{assignee.name}</span>
          </div>
        )}
        <div className="flex justify-end mt-2">
          <Button
            onClick={() => {
              onDelete(task.id);
              toast.error("Task deleted");
              onClose();
            }}
            className="px-4 py-2 text-sm  text-white rounded-lg "
          >
            Delete Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
