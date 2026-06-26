import { Plus } from "lucide-react";
import { useState } from "react";
import { projects, tasks, users } from "../../Data/dummy";
import type { Project } from "../../Types/types";
import AddProjectCard from "../UI/AddProjectCard";
import ProjectCard from "../UI/ProjectCard";

const Projects = () => {
  const [projectList, setProductList] = useState<Project[]>(projects);
  const [showModal, setShowModal] = useState(false);
  const handleDelete = (id: string) => {
    setProductList((pv) => pv.filter((p) => p.id !== id));
  };
  const handleAdd = (projects: Project) => {
    setProductList((pv) => [...pv, projects]);
    setShowModal(false);
  };
  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between p-2">
        <h1>Projects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center px-4 py-2 gap-2 border border-slate-400 bg-blue-400 rounded-lg
            "
        >
          <Plus size={18} />
          New Project
        </button>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      "
      >
        {projectList.map((project) => (
          <ProjectCard
            key={project.id}
            projects={project}
            tasks={tasks}
            members={users.filter((u) => project.memberIds.includes(u.id))}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {showModal && (
        
            <AddProjectCard
              onAdd={handleAdd}
              onClose={() => setShowModal(false)}
            />
          
        
      )}
    </div>
  );
};

export default Projects;
