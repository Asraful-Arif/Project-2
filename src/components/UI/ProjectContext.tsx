import { projects, tasks } from "@/Data/dummy";
import { Project, Task } from "@/Types/types";
import { createContext, ReactNode, useContext, useState } from "react"
interface ProjectContextType {
  projectList: Project[];
  taskList: Task[];
  addProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (p: Project) => void;
  addTask: (t: Task) => void;
  updateTasks: (tasks: Task[]) => void;
}
const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({children}:{children:ReactNode }) =>{
   
const [projectList,setProjectList] = useState<Project[]>(projects)
const [taskList,setTaskList] = useState<Task[]>(tasks)
const addProject = (p: Project) => setProjectList((pv) => [...pv, p]);
  const deleteProject = (id: string) =>
    setProjectList((pv) => pv.filter((p) => p.id !== id));
   const updateProject = (p: Project) => setProjectList((pv) => pv.map((pr) => pr.id === p.id ? p : pr)); 
  const addTask = (t: Task) => setTaskList((pv) => [...pv, t]);
  const updateTasks = (tasks: Task[]) => setTaskList(tasks);

  return (
    <ProjectContext.Provider
      value={{ projectList, taskList, addProject, deleteProject,updateProject, addTask, updateTasks }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjects must be used within ProjectProvider");
  return context;
};