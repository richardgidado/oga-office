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
  status: string;
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface StaffOnSuspensionProps {
  staffMembers: Staff[];
}

export function StaffOnSuspension({ staffMembers }: StaffOnSuspensionProps) {
  const suspended = staffMembers.filter((s) => s.status === "suspended");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff on Suspension</CardTitle>
        <CardDescription>Currently suspended</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suspended.map((staff) => (
            <div
              key={staff.id}
              className="flex items-center justify-between rounded-lg bg-red-50 p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-white text-black">
                    {staff.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{staff.name}</p>
                  <p className="text-xs text-slate-500">{staff.role}</p>
                </div>
              </div>
              <Badge variant="destructive">Suspended</Badge>
            </div>
          ))}
          {suspended.length === 0 && (
            <p className="py-4 text-center text-sm text-slate-500">
              No staff on suspension
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
