import { users } from "@/Data/dummy";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { Search, UserMinus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Task,User } from "../../Types/types";
import { Badge } from "../ui/badge";
import Table from "../ui/Table";
import { useProjects } from "../ui/ProjectContext";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/Combobox";
import { Button } from "../ui/button";
import Confirm from "../ui/Confirm";
const MembersView = ({ projectId }: { projectId: string }) => {
     const { projectList, taskList, updateProject } = useProjects();
     const project = projectList.find((p) => p.id === projectId)!;
  const memberList: User[] = users.filter((u) =>
    project.memberIds.includes(u.id)
  );
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState("all");
 
  const [selectedId, setSelectedId] = useState("");
  const [confirmTarget, setConfirmTarget] = useState<User | null>(null);
  const filteredData = useMemo(() => {
    return memberList
      .filter((member) => {
        const data = searchData.toLowerCase();
        return (
          member.name.toLowerCase().includes(data) ||
          member.email.toLowerCase().includes(data)
        );
      })

      .filter((member) => {
        if (filterData === "all") return true;
        return member.role === filterData;
      });
  }, [memberList, searchData, filterData]);
  const inviteOptions = users
    .filter((u) => !project.memberIds.includes(u.id))
    .map((u) => ({ value: u.id, label: u.name, avatar: u.avatar }))

const handleRemove = (user: User) => {
    if (user.id === "u1") {
      toast.error("Cannot remove Admin");
      return;
    }
    setConfirmTarget(user);
  };

  const confirmRemove = () => {
    if (!confirmTarget) return;
    updateProject({
      ...project,
      memberIds: project.memberIds.filter((id) => id !== confirmTarget.id),
    });
    toast.error(`${confirmTarget.name} removed`);
    setConfirmTarget(null);
  };

  const handleInvite = () => {
    if (!selectedId) return;
    updateProject({
      ...project,
      memberIds: [...project.memberIds, selectedId],
    });
    const userName = users.find((u) => u.id === selectedId)?.name;
    toast.success(`${userName} invited successfully`);
    setSelectedId("");
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info: CellContext<User, unknown>) => (
        <div className="flex gap-3">
          <img
            src={info.row.original.avatar}
            alt={info.row.original.name}
            className="w-4 h-4 rounded-full"
          />
          <span>{info.row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (info: CellContext<User, unknown>) => {
        const role = info.row.original.role;
        return (
          <Badge variant={role === "admin" ? "default" : "secondary"}>
            {role}
          </Badge>
        );
      },
    },
    {
  id: "taskCount",
  header: "Tasks",
  cell: (info: CellContext<User, unknown>) => {
    const count = taskList.filter(
      (t: Task) =>
        t.projectId === projectId &&
        t.assigneeId === info.row.original.id
    ).length;
    return (
      <span className="text-sm font-semibold text-slate-600">
        {count} task{count !== 1 ? "s" : ""}
      </span>
    );
  },
},
    {
      id: "actions",
      header: "Actions",
      cell: (info: CellContext<User, unknown>) => (
        <button
          title="button"
          onClick={() => handleRemove(info.row.original)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <UserMinus size={16} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-slate-800 rounded-lg mb-5 text-2xl font-bold">
        Members
      </h1>
      <div
        className="text-slate-800 rounded-lg  mb-3
      "
      >
        <h2 className="text-xl font-semibold mb-2"></h2>
        <div className="flex gap-2">
          <div className="w-30 flex gap-2 items-center justify-start px-2  bg-slate-400 text-white text-sm rounded-lg lg:w-50 py-2">
            <span>
              <Search size={18}  className="shrink-0" />
            </span>
            <input
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              type="search"
              className="bg-transparent outline-none flex-1 placeholder:text-white/70"
              placeholder="Search..."
            />
          </div>
          <div className="hidden md:block">
            <select
              value={filterData}
              onChange={(e) => setFilterData(e.target.value)}
              className="bg-slate-400 text-white text-sm rounded-lg px-3 py-2 outline-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div className="flex gap-2 ml-auto items-center">
          <Combobox
            value={selectedId}
            onValueChange={(value) => setSelectedId(value as string)}
          >
            <ComboboxInput placeholder="Select member..." />
            <ComboboxContent>
              <ComboboxEmpty>No user found.</ComboboxEmpty>
              <ComboboxList>
                {inviteOptions.map((option) => (
                  <ComboboxItem key={option.value} value={option.value}>
                    <img
                      src={option.avatar}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    {option.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <Button onClick={handleInvite} disabled={!selectedId}>
            Invite
          </Button>
        </div>
      </div>
      </div> 
      <Table columns={columns} data={filteredData} />
      {confirmTarget && (
        <Confirm
          name={confirmTarget.name}
          onConfirm={confirmRemove}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
    </div>
  );
  };


export default MembersView;
