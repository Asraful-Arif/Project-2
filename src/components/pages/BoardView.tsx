import type { Task, User } from "../../Types/types";

import TaskCard from "../UI/TaskCard";

import {
  DndContext,
  closestCorners,
  useDroppable,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import TaskAddForm from "../UI/TaskAddForm";
interface BoardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  members: User[];
  projectId: string;
}
const columns = [
  { id: "todo", label: "To Do", color: "bg-gray-100", dot: "bg-gray-400" },
  {
    id: "inprogress",
    label: "In Progress",
    color: "bg-blue-50",
    dot: "bg-blue-400",
  },
  { id: "blocked", label: "Blocked", color: "bg-red-50", dot: "bg-red-400" },
  {
    id: "completed",
    label: "Completed",
    color: "bg-green-50",
    dot: "bg-green-400",
  },
];

const DroppableColumn = ({
  id,
  tasks,
  members,
}: {
  id: string;
  tasks: Task[];
  members: User[];
}) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="min-h-32 space-y-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} members={members} />
      ))}
    </div>
  );
};

const BoardView = ({ tasks, setTasks, members, projectId }: BoardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<Task["status"]>("todo");
  const handleDragend = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, status: newStatus } : t,
    );
    setTasks(updated);
  };

  const handleAddClick = (status: Task["status"]) => {
    setModalStatus(status);
    setShowModal(true);
  };
  const handleSaveTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragend}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className={`${col.color} rounded-lg p-3`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                    <span className="text-sm font-medium text-slate-800 ">
                      {col.label}
                    </span>
                    <span className="text-xs text-slate-700 bg-white rounded-full px-2">
                      {colTasks.length}
                    </span>
                  </div>

                  <button
                    title="Add"
                    onClick={() => handleAddClick(col.id as Task["status"])}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <DroppableColumn
                  id={col.id}
                  tasks={colTasks}
                  members={members}
                />
              </div>
            );
          })}
        </div>
      </DndContext>
      {showModal && (
        <TaskAddForm
          onClose={() => setShowModal(false)}
          onSave={handleSaveTask}
          projectId={projectId}
          members={members}
          initialStatus={modalStatus}
        />
      )}
    </>
  );
};

export default BoardView;
