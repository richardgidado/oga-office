"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ClipboardList,
  Plus,
  Search,
  Play,
  Circle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { formatDate } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: string;
  assignedAt?: string;
  startedAt?: string;
  completedAt?: string;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  status: string;
}

interface TasksTabProps {
  tasks: Task[];
  staffMembers: Staff[];
}

function getTaskStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge variant="success">Completed</Badge>;
    case "in_progress":
      return <Badge variant="warning">In Progress</Badge>;
    case "pending":
      return <Badge variant="pending">Pending</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

function formatTimeAgo(timestamp: string | undefined): string {
  if (!timestamp) return "";

  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

export function TasksTab({ tasks: initialTasks, staffMembers }: TasksTabProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStartTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "in_progress",
              startedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  };

  const handleCompleteTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed",
              completedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  };

  const activeStaff = staffMembers.filter((s) => s.status === "active");

  const staffOptions = activeStaff.map((staff) => ({
    value: staff.id.toString(),
    label: `${staff.name} - ${staff.role}`,
  }));

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const filteredTasks = tasks.filter(
    (task) =>
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>Assign and track tasks</CardDescription>
        </div>
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle style={{ color: "black" }}>
                Create New Task
              </DialogTitle>
              <DialogDescription>
                Assign a task to a staff member
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Description</Label>
                <Input
                  id="task-title"
                  placeholder="e.g., Take G-Wagon for servicing"
                />
              </div>
              <div className="grid gap-2">
                <Label>Assign To</Label>
                <SearchableSelect
                  options={staffOptions}
                  value={selectedStaff}
                  onChange={setSelectedStaff}
                  placeholder="Select staff member"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-due">Due Date</Label>
                <Input id="task-due" type="date" />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <SearchableSelect
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  placeholder="Select status"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddTaskOpen(false);
                  setSelectedStaff("");
                  setSelectedStatus("");
                }}
                className="bg-white-300 cursor-pointer text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setIsAddTaskOpen(false);
                  setSelectedStaff("");
                  setSelectedStatus("");
                }}
                className="cursor-pointer"
              >
                Assign Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
          <Input
            placeholder="Search by name or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100"
                        : task.status === "in_progress"
                          ? "bg-yellow-100"
                          : "bg-slate-100"
                    }`}
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : task.status === "in_progress" ? (
                      <Clock className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <ClipboardList className="h-5 w-5 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-slate-500">
                      Assigned to: {task.assignedTo}
                    </p>
                    <p className="text-xs text-slate-400">
                      Due: {formatDate(task.dueDate)}
                    </p>
                    {task.startedAt && (
                      <p className="text-xs text-blue-500">
                        Started {formatTimeAgo(task.startedAt)}
                      </p>
                    )}
                    {task.completedAt && (
                      <p className="text-xs text-green-600">
                        Completed {formatTimeAgo(task.completedAt)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTaskStatusBadge(task.status)}
                  {task.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => handleStartTask(task.id)}
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="mr-1 h-3 w-3" />
                      Start
                    </Button>
                  )}
                  {task.status === "in_progress" && (
                    <Button
                      size="sm"
                      onClick={() => handleCompleteTask(task.id)}
                      className="cursor-pointer bg-green-600 hover:bg-green-700"
                    >
                      <Circle className="mr-1 h-3 w-3" />
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500">
              No tasks found matching your search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
