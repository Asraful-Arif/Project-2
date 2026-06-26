import { useState } from "react";
import { useParams } from "react-router";
import { tasks as InitialTAsks, projects, users } from "../../Data/dummy";

import type { Task } from "../../Types/types";

import BoardView from "./BoardView";
import RowView from "./Rowview";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [tasks, setTasks] = useState<Task[]>(
    InitialTAsks.filter((t) => t.projectId === id),
  );
  const [view, setView] = useState<"board" | "row">("board");
  if (!project) return <div>Project not found</div>;
  const members = users.filter((u) => project.memberIds.includes(u.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 " style={{ background: project.color }} />
          <h1>{project.name}</h1>
          <span>{project.description}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setView("board")}
            className={`px-4 py-2 rounded-lg ${view === "board" ? "bg-blue-500 text-white" : "bg-white border border-slate-400"}`}
          >
            board
          </button>
          <button
            onClick={() => setView("row")}
            className={`px-4 py-2 rounded-lg ${view === "row" ? "bg-blue-500 text-white" : "bg-white border border-slate-400"}`}
          >
            row
          </button>
        </div>
      </div>
      {view === "board" ? (
        <BoardView
          tasks={tasks}
          setTasks={setTasks}
          members={members}
          projectId={id!}
        />
      ) : (
        <RowView tasks={tasks} setTasks={setTasks} members={members} />
      )}
    </div>
  );
};

export default ProjectDetails;
