import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Project } from "../../Types/types";
import { Button } from "./button";
interface CardProps {
  onAdd: (projects: Project) => void;
  onClose: () => void;
}
const colorList = ['#4F46E5', '#16A34A', '#D97706', '#DC2626', '#0EA5E9', '#7C3AED'];

const AddProjectCard = ({ onAdd, onClose }: CardProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("green");
  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Create a Project Name");
      return;
    }
    const NewProject: Project = {
      id: `p${Date.now()}`,
      name,
      description,
      color,
      memberIds: ["u1"],
      createdAt: new Date().toISOString().split("T")[0],
    };
    onAdd(NewProject);
    toast.success("Project Created Successfully");
    onClose();
  };
  return (
   
      <div className="fixed inset-0 flex
      items-center justify-center bg-slate-100/70 border
      ">
        <div className="max-w-md w-full bg-white rounded-lg px-4 py-7 border border-blue-300 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Create Project</h2>
          <Button title="button" type="button"  onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        <div>
          <label className="text-xl font-semibold block mb-1">Name</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="w-full border border-slate-400 placeholder:text-slate-800 outline-none mb-2 rounded-md py-2 px-1"
          />
        </div>
        <div>
          <label className="text-xl font-semibold block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write Description"
            rows={3}
            className="w-full border border-slate-400 placeholder:text-slate-800 outline-none mb-2 rounded-md px-1"
          />
        </div>
        <div>
          <h3 className="mb-1">Color</h3>
          <div className="flex gap-2">
            {colorList.map((c) => (
              <button title="button"
                onClick={() => setColor(c)}
                key={c}
                style={{background:c}}
                className={`w-7 h-7 rounded-full mb-2 ${c === color ? "ring-2 ring-slate-800" : ""}`}
              />
                
              
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 ">
          <button onClick={onClose} className="border bg-slate-400 px-4 py-2 rounded-lg text-slate-100">
            Cancle
          </button>
          <button
            onClick={handleSubmit}
            className="border  bg-green-500 text-slate-100 px-4 py-2 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    
      </div>
  );
};

export default AddProjectCard;
