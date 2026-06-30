import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import type { Project, Task, User } from "../../Types/types";
import { toast } from "sonner";

interface CardProps {
  projects: Project;
  tasks: Task[];
  members: User[];
  onDelete: (id: string) => void;
}

const ProjectCard = ({ projects, tasks, members, onDelete }: CardProps) => {
  const navigate = useNavigate();
  const projectsTask = tasks.filter((t) => t.projectId === projects.id);
  const completedTask = projectsTask.filter(
    (t) => t.status === "completed",
  ).length;
  const progress =
    projectsTask.length > 0
      ? Math.round((completedTask / projectsTask.length) * 100)
      : 0;
  const handleDelete = () => {
  toast("Are You Sure to Delete This Project?", {
    action: {
      label: "Delete",
      onClick: () => {
        onDelete(projects.id);
        toast.error("Project deleted");
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
  });
};
  return (
    <div
      onClick={() => navigate(`/projects/${projects.id}`)}
      className="border border-slate-400 m-2 p-2 rounded-lg bg-slate-100 hover:cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2 ">
        <div className="flex items-center gap-1">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: projects.color }}
          />
          <h3 className="text-xl font-semibold ">{projects.name}</h3>
        </div>
        <button title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
      <div>
        <h3 className="text-sm text-slate-500 mb-2">{projects.description}</h3>
      </div>
      <div className="flex items-center gap-2 mb-2">
        {members.map((member) => (
          <img
            src={member.avatar}
            alt={member.id}
            key={member.id}
            className="w-7 h-7 rounded-full "
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span>
          {completedTask} / {projectsTask.length} tasks
        </span>
        <span>{progress}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-slate-300">
        <div
          className="h-1.5 rounded-full transition-colors"
          style={{ width: `${progress}%`, background: projects.color }}
        />
      </div>
    </div>
  );
};


export default ProjectCard;
