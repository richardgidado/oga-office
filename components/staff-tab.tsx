"use client";

import { useState } from "react";
import { Plus, Phone, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
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
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Staff {
  id: number;
  name: string;
  role: string;
  phone: string;
  salary: number;
  status: string;
  avatar: string;
  joinedDate: string;
}

interface StaffTabProps {
  staffMembers: Staff[];
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge variant="success">Active</Badge>;
    case "on_leave":
      return <Badge variant="warning">On Leave</Badge>;
    case "suspended":
      return <Badge variant="destructive">Suspended</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export function StaffTab({ staffMembers }: StaffTabProps) {
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [staffList, setStaffList] = useState<Staff[]>(staffMembers);

  const roles = [
    "driver",
    "chef",
    "housekeeper",
    "security",
    "nanny",
    "gardener",
  ];

  const roleOptions = roles.map((role) => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1),
  }));

  const handleSuspend = (id: number) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.id === id ? { ...staff, status: "suspended" } : staff,
      ),
    );
  };

  const handleUnsuspend = (id: number) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.id === id ? { ...staff, status: "active" } : staff,
      ),
    );
  };

  const handleFire = (id: number) => {
    setStaffList((prev) => prev.filter((staff) => staff.id !== id));
  };

  const filteredStaff = staffList.filter((staff) => {
    const query = searchQuery.toLowerCase();
    return (
      staff.name.toLowerCase().includes(query) ||
      staff.role.toLowerCase().includes(query) ||
      staff.phone.toLowerCase().includes(query) ||
      staff.status.toLowerCase().includes(query) ||
      staff.joinedDate.toLowerCase().includes(query) ||
      staff.salary.toString().includes(query)
    );
  });

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Staff Management</CardTitle>
          <CardDescription>Manage your household staffs</CardDescription>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer bg-white text-black hover:bg-sky-50"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ color: "black" }}>
                  Add New Role
                </DialogTitle>
                <DialogDescription>Enter the role name</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input
                    id="role-name"
                    placeholder="e.g., Personal Assistant"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddRoleOpen(false)}
                  className="cursor-pointer bg-white text-black"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsAddRoleOpen(false)}
                  className="cursor-pointer"
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ color: "black" }}>
                  Add New Staff Member
                </DialogTitle>
                <DialogDescription>
                  Enter the staff member details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <SearchableSelect
                    options={roleOptions}
                    value={selectedRole}
                    onChange={setSelectedRole}
                    placeholder="Select role"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+234 xxx xxx xxxx" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salary">Monthly Salary (NGN)</Label>
                  <Input id="salary" type="number" placeholder="150000" />
                </div>
                <div className="grid gap-2">
                  <Label>ID Document</Label>
                  <div className="cursor-pointer rounded-lg border-2 border-dashed border-slate-200 p-6 text-center transition-colors hover:border-slate-400">
                    <Upload className="mx-auto mb-2 h-8 w-8 text-slate-400" />
                    <p className="text-sm text-slate-500">
                      Upload ID or passport
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Guarantor Form</Label>
                  <div className="cursor-pointer rounded-lg border-2 border-dashed border-slate-200 p-6 text-center transition-colors hover:border-slate-400">
                    <Upload className="mx-auto mb-2 h-8 w-8 text-slate-400" />
                    <p className="text-sm text-slate-500">
                      Upload guarantor form
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-white-300 cursor-pointer text-black"
                  variant="outline"
                  onClick={() => {
                    setIsAddStaffOpen(false);
                    setSelectedRole("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    setIsAddStaffOpen(false);
                    setSelectedRole("");
                  }}
                >
                  Add Staff
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
          <Input
            placeholder="Search by name, role, phone, status, date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="cursor-pointer space-y-4">
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff) => {
              const isActiveOrLeave =
                staff.status === "active" || staff.status === "on_leave";
              const isSuspended = staff.status === "suspended";

              const menuOptions = [
                ...(isActiveOrLeave
                  ? [
                      {
                        label: "Suspend",
                        onClick: () => handleSuspend(staff.id),
                        icon: "suspend" as const,
                        className: "cursor-pointer",
                      },
                    ]
                  : []),
                ...(isSuspended
                  ? [
                      {
                        label: "Unsuspend",
                        onClick: () => handleUnsuspend(staff.id),
                        icon: "unsuspend" as const,
                        className: "cursor-pointer",
                      },
                    ]
                  : []),
                {
                  label: "Fire",
                  onClick: () => handleFire(staff.id),
                  icon: "fire" as const,
                  className: "cursor-pointer",
                },
              ];

              return (
                <div
                  key={staff.id}
                  className="flex flex-col gap-4 rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-slate-900 text-white">
                        {staff.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{staff.name}</p>
                      <p className="flex items-center gap-1 text-sm text-slate-500">
                        <Phone className="h-3 w-3" /> {staff.phone}
                      </p>
                      <p className="text-xs text-slate-400">
                        Joined: {formatDate(staff.joinedDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(staff.salary)}
                      </p>
                      <p className="text-xs text-slate-500">/month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{staff.role}</p>
                      {getStatusBadge(staff.status)}
                    </div>
                    <DropdownMenu options={menuOptions} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500">
              No staff found matching your search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
