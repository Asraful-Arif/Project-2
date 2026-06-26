export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
  avatar: string;
}
export interface Project {
  id: string;
  name: string;
  color: string;
  description: string;
  memberIds: string[];
  createdAt: string;
}
export type Status = "todo" | "inprogress" | "blocked" | "completed";
export type Priority = "low" | "medium" | "high" | "critical";

export interface subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assigneeId: string;
  dueDate: string;
  tags: string[];
  subtasks: subtask[];
}
