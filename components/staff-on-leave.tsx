import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Staff {
  id: number;
  name: string;
  role: string;
  avatar: string;
  leaveDays: number;
}

interface StaffOnLeaveProps {
  staffMembers: Staff[];
}

export function StaffOnLeave({ staffMembers }: StaffOnLeaveProps) {
  const onLeave = staffMembers.filter((s) => s.leaveDays > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff on Leave</CardTitle>
        <CardDescription>Currently away</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {onLeave.map((staff) => (
            <div
              key={staff.id}
              className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{staff.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{staff.name}</p>
                  <p className="text-xs text-slate-500">{staff.role}</p>
                </div>
              </div>
              <Badge variant="warning">{staff.leaveDays} days left</Badge>
            </div>
          ))}
          {onLeave.length === 0 && (
            <p className="py-4 text-center text-sm text-slate-500">
              No staff on leave
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
