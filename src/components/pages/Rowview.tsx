import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Task, User } from "../../Types/types";
import Table from "../UI/Table";
import TaskAddForm from "../UI/TaskAddForm";
interface RowViewProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  members: User[];
}

const priorityColor: Record<string, string> = {
  low: "bg-gray-100 text-gray-500",
  medium: "bg-blue-100 text-blue-600",
  high: "bg-amber-100 text-amber-600",
  critical: "bg-red-100 text-red-600",
};
const statusColor: Record<string, string> = {
  todo: "bg-gray-100 text-gray-600",
  inprogress: "bg-blue-100 text-blue-600",
  blocked: "bg-red-100 text-red-600",
  completed: "bg-green-100 text-green-600",
};
const RowView = ({ tasks, setTasks, members }: RowViewProps) => {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const handleDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast("Task Deleted");
  };
  const handleSave = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue() as string;
        return (
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[value]}`}
          >
            {value === "inprogress"
              ? "In Progress"
              : value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue() as string;
        return (
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColor[value]}`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: "assigneeId",
      header: "Assignee",
      cell: ({ getValue }: { getValue: () => any }) => {
        const id = getValue() as string;
        const member = members.find((m) => m.id === id);
        return member ? (
          <div className="flex items-center gap-2">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm">{member.name}</span>
          </div>
        ) : (
          "-"
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ getValue }: { getValue: () => any }) => (
        <span>{(getValue() as string) || "-"}</span>
      ),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ getValue }: { getValue: () => any }) => (
        <div className="flex gap-1 flex-wrap">
          {(getValue() as string[]).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-50 text-slate-800 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info: CellContext<Task, unknown>) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditTask(info.row.original)}
            title="button"
            className="text-slate-400 hover:text-slate-500"
          >
            <Pencil size={15} />
          </button>
          <button
            title="button"
            onClick={() => handleDelete(info.row.original.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} data={tasks} />

      {editTask && (
        <TaskAddForm
          onClose={() => setEditTask(null)}
          onSave={handleSave}
          projectId={editTask.projectId}
          members={members}
          editTask={editTask}
        />
      )}
    </div>
  );
};

export default RowView;
