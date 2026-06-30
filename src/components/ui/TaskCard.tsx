import { useDraggable } from "@dnd-kit/core";
import { AlertCircle, Calendar } from "lucide-react";
import type { Task, User } from "../../Types/types";
interface CardProps {
  task: Task;
  members: User[];
  onOpen: (task: Task) => void;
}
const priorityColor: Record<string, string> = {
  low: "bg-gray-100 text-gray-500",
  medium: "bg-blue-100 text-blue-600",
  high: "bg-amber-100 text-amber-600",
  critical: "bg-red-100 text-red-600",
};

const TaskCard = ({ task, members,onOpen }: CardProps) => {
  const assignee = members.find((m) => m.id === task.assigneeId);
  const completedSubtasks = task.subtasks.filter((s) => s.done).length;
  const { attributes, listeners, setNodeRef, transform,isDragging  } =
    useDraggable({ id: task.id });
  const style = transform
    ? { transform: `translate(${transform.x}px,${transform.y}px)` }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={{ ...style, touchAction: "none" }}
      {...listeners}
      {...attributes}
      onClick={() =>  {
        if (!isDragging) onOpen(task); 
      }}
      className="bg-white border-slate-400 rounded-lg shadow-sm cursor-grab p-2"
    >
     
      {task.tags.length > 0 && (
        <div className=" flex flex-wrap gap-1 mb-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-50 text-slate-800 px-2 py-3"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm font-medium text-slate-800 mb-2">{task.title}</p>
      <span  className={`text-xs px-2 py-0.5 rounded-full ${priorityColor[task.priority]}`}>{task.priority}</span>
      <div className="flex items-center justify-between mt-3"></div>
      {task.dueDate && (
        <div className="flex items-center gap-2 text-xs mb-1">
          <Calendar size={12} />
          <span>{task.dueDate}</span>
        </div>
      )}
      <div className="flex items-center gap-2 ml-auto">
        {task.subtasks.length > 0 && (
          <div className=" flex items-center gap-1 text-xs mb-1">
            <AlertCircle size={12} />
            <span>
              {completedSubtasks}/ {task.subtasks.length}
            </span>
          </div>
        )}
      </div>
      {assignee && (
        <img
          src={assignee.avatar}
          alt={assignee.name}
          className="w-6 h-6 rounded-full mt-1"
        />
      )}
    </div>
  );
};

export default TaskCard;
