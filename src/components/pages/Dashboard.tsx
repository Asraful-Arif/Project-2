import { Briefcase, CheckCheck, Clock, ListTodo } from "lucide-react";
import { projects, tasks } from "../../Data/dummy";
import BarChart from "../ui/BarChart";
import DonutChart from "../ui/DonutChart";
import LineChart from "../ui/LineChart";
import LiveClock from "../ui/LiveClock";
import State from "../ui/State";

const cartItem = [
  {
    label: "Total Projects",
    value: projects.length,
    trend: "+1 this week",
    icon: Briefcase,
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    label: "Total Tasks",
    value: tasks.length,
    trend: "+3 this week",
    icon: ListTodo,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "In Progress",
    value: tasks.filter((t) => t.status === "inprogress").length,
    trend: "+2 this week",
    icon: Clock,
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Completed",
    value: tasks.filter((t) => t.status === "completed").length,
    trend: "+1 this week",
    icon: CheckCheck,
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
];

const Dashboard = () => {
  return (
    <div className="overflow-y-auto m-2">
      <div>
        <div className="m-3">
          <h1 className="text-2xl text-slate-800 font-bold ">DashBoard</h1>
        <LiveClock/>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-2">
          {cartItem.map((item) => (
            <State key={item.label} {...item} />
          ))}
        </div>
      </div>
     <div className="m-1">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
        <DonutChart />
        <BarChart />
      </div>
      <div className="mt-4">
        <LineChart />
      </div>
     </div>
    </div>
  );
};

export default Dashboard;
