import { Plus } from "lucide-react";
import { useState } from "react";
import { users } from "../../Data/dummy";

import AddProjectCard from "../ui/AddProjectCard";
import ProjectCard from "../ui/ProjectCard";
import { useProjects } from "../ui/ProjectContext";
import { Button } from "../ui/button";

const Projects = () => {
  const { projectList, taskList, addProject, deleteProject } = useProjects();

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between p-2">
        <h1>Projects</h1>
        <Button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center px-4 py-2 gap-2 border border-slate-400 bg-blue-400 rounded-lg
            "
        >
          <Plus size={18} />
          New Project
        </Button>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      "
      >
        {projectList.map((project) => (
          <ProjectCard
            key={project.id}
            projects={project}
            tasks={taskList}
            members={users.filter((u) => project.memberIds.includes(u.id))}
            onDelete={deleteProject}
          />
        ))}
      </div>
      {showModal && (
        <AddProjectCard
          onAdd={(p) => {
            addProject(p);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Projects;
