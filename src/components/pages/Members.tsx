import { users } from "@/Data/dummy";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { UserMinus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { User } from "../../Types/types";
import { Badge } from "../UI/badge";
import Table from "../UI/Table";

const Members = () => {
  const [memberList, setMemberList] = useState<User[]>(users);
  const [selectedId, setSelectedId] = useState("");
  const handleRemove = (id: string) => {
    if (id === "u1") {
      toast.error("Cannot Remove Admin");
      return;
    }
    setMemberList((pv) => pv.filter((m) => m.id !== id));
    toast.error("Member Remove");
  };
  const handleInvite = () => {
    const user = users.find((u) => u.id === selectedId);
    if (!user) return;
    if (memberList.find((m) => m.id === selectedId)) {
      toast.error("Member already exists");
      return;
    }
    setMemberList((prev) => [...prev, user]);
    toast.success("Member invited successfully");
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
      id: "actions",
      header: "Actions",
      cell: (info: CellContext<User, unknown>) => (
        <button
          title="button"
          onClick={() => handleRemove(info.row.original.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <UserMinus size={16} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-slate-800 rounded-lg p-5 mb-5">Members</h1>
      <div
        className="text-slate-800 rounded-lg p-5 mb-3
      "
      >
        <h2>Invite Members</h2>
        <div className="flex gap-2">
          <select
            title="name"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Select A member</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleInvite}
            className="px-4 py-2 bg-slate-400 text-white text-sm rounded-lg hover:bg-blue-500"
          >
            Invite
          </button>
        </div>
      </div>
      <Table columns={columns} data={memberList} />
    </div>
  );
};

export default Members;
