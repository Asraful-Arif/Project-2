import type { Task, User } from "../../Types/types";

import TaskCard from "../ui/TaskCard";

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import TaskAddForm from "../ui/TaskAddForm";
import TaskDetailsPage from "../ui/TaskDetailsPage";
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
  onOpen,
}: {
  id: string;
  tasks: Task[];
  members: User[];
  onOpen: (task: Task) => void;
}) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="min-h-32 space-y-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} members={members} onOpen={onOpen} />
      ))}
    </div>
  );
};

const BoardView = ({ tasks, setTasks, members, projectId }: BoardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<Task["status"]>("todo");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
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
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,      
      tolerance: 8,     
    },
  }),
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragend}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div className="flex flex-col space-y-3">
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
                  </div>

                  <DroppableColumn
                    id={col.id}
                    tasks={colTasks}
                    members={members}
                    onOpen={(task) => setSelectedTask(task)}
                  />
                </div>
                <button
                  title="Add"
                  onClick={() => handleAddClick(col.id as Task["status"])}
                  className="  flex items-center justify-center gap-2 border border-slate-100 py-2 text-white rounded-lg hover:bg-purple-400 hover:font-semibold hover:text-black"
                >
                  <Plus size={16} />
                  <span className="text-sm ">Add New Task</span>
                </button>
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
      {selectedTask && (
        <TaskDetailsPage
          task={selectedTask}
          members={members}
          onClose={() => setSelectedTask(null)}
          onDelete={handleDeleteTask}
        />
      )}
    </>
  );
};

export default BoardView;
