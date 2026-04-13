import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface RecentTasksProps {
  tasks: Task[];
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

export function RecentTasks({ tasks }: RecentTasksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
        <CardDescription>Latest task updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
            >
              <div className="flex items-center gap-3">
                {task.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : task.status === "in_progress" ? (
                  <Clock className="h-5 w-5 text-yellow-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-slate-400" />
                )}
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-slate-500">{task.assignedTo}</p>
                </div>
              </div>
              {getTaskStatusBadge(task.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
