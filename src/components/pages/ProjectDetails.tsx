import { useState } from "react";
import { useParams } from "react-router";
import { users } from "../../Data/dummy";

import type { Task } from "../../Types/types";

import { useProjects } from "../ui/ProjectContext";
import { Button } from "../ui/button";
import BoardView from "./BoardView";
import MembersView from "./MembersView";
import RowView from "./Rowview";

const ProjectDetails = () => {
  const currentUser = JSON.parse(localStorage.getItem("taskflow_user") || "{}");
const isAdmin = currentUser.role === "admin";
  const { projectList, taskList, updateTasks } = useProjects();
  const { id } = useParams();
  const project = projectList.find((p) => p.id === id);
  const tasks = taskList.filter((t) => t.projectId === id);

  const setTasks = (updated: Task[]) => {
    const otherTasks = taskList.filter((t) => t.projectId !== id);
    updateTasks([...otherTasks, ...updated]);
  };
  const [view, setView] = useState<"board" | "row" | "members">("board");
  if (!project) return <div>Project not found</div>;
  const members = users.filter((u) => project.memberIds.includes(u.id));
 
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 " style={{ background: project.color }} />
          <h1>{project.name}</h1>
          <span className="hidden lg:block">{project.description}</span>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setView("board")}
            className={`px-4 py-2 rounded-lg ${view === "board" ? "bg-blue-500 text-white" : " border border-slate-400"}`}
          >
            board
          </Button>
          <Button
            onClick={() => setView("row")}
            className={`px-4 py-2 rounded-lg ${view === "row" ? "bg-blue-500 text-white" : " border border-slate-400"}`}
          >
            row
          </Button>
          {isAdmin && (
            <Button
            onClick={() => setView("members")}
            className={`px-4 py-2 rounded-lg ${view === "members" ? "bg-blue-500 text-white" : " border border-slate-400"}`}
          >
            members
          </Button>
          )}
        </div>
      </div>
      {view === "board" && (
        <BoardView
          tasks={tasks}
          setTasks={setTasks}
          members={members}
          projectId={id!}
        />
      )}
      {view === "row" && (
        <RowView tasks={tasks} setTasks={setTasks} members={members} />
      )}
      {view === "members" && <MembersView projectId={id!} />}
    </div>
  );
};

export default ProjectDetails;
