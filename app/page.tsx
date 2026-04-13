"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import { DashboardStats } from "@/components/dashboard-stats";
import { RecentTasks } from "@/components/recent-tasks";
import { StaffOnLeave } from "@/components/staff-on-leave";
import { StaffOnSuspension } from "@/components/staff-on-suspension";
import { StaffTab } from "@/components/staff-tab";
import { PaymentsTab } from "@/components/payments-tab";
import { TasksTab } from "@/components/tasks-tab";

const staffMembers = [
  {
    id: 1,
    name: "Emeka Okonkwo",
    role: "Driver",
    phone: "+234 803 123 4567",
    salary: 150000,
    status: "active",
    avatar: "EO",
    joinedDate: "2023-01-15",
    tasksCompleted: 45,
    leaveDays: 2,
  },
  {
    id: 2,
    name: "Amaka Johnson",
    role: "Chef",
    phone: "+234 805 234 5678",
    salary: 200000,
    status: "active",
    avatar: "AJ",
    joinedDate: "2022-06-01",
    tasksCompleted: 120,
    leaveDays: 5,
  },
  {
    id: 3,
    name: "Chidi Okafor",
    role: "Security",
    phone: "+234 806 345 6789",
    salary: 120000,
    status: "active",
    avatar: "CO",
    joinedDate: "2023-03-20",
    tasksCompleted: 30,
    leaveDays: 0,
  },
  {
    id: 4,
    name: "Fatima Bello",
    role: "Housekeeper",
    phone: "+234 807 456 7890",
    salary: 100000,
    status: "on_leave",
    avatar: "FB",
    joinedDate: "2022-09-10",
    tasksCompleted: 180,
    leaveDays: 8,
  },
  {
    id: 5,
    name: "Sunday Adeyemi",
    role: "Driver",
    phone: "+234 808 567 8901",
    salary: 150000,
    status: "suspended",
    avatar: "SA",
    joinedDate: "2024-01-01",
    tasksCompleted: 0,
    leaveDays: 10,
  },
  {
    id: 6,
    name: "Grace Nwankwo",
    role: "Nanny",
    phone: "+234 809 678 9012",
    salary: 180000,
    status: "active",
    avatar: "GN",
    joinedDate: "2023-05-15",
    tasksCompleted: 85,
    leaveDays: 0,
  },
  {
    id: 7,
    name: "Peter Okoro",
    role: "Gardener",
    phone: "+234 810 789 0123",
    salary: 80000,
    status: "on_leave",
    avatar: "PO",
    joinedDate: "2023-08-20",
    tasksCompleted: 65,
    leaveDays: 3,
  },
  {
    id: 8,
    name: "Sarah Musa",
    role: "Chef",
    phone: "+234 811 890 1234",
    salary: 220000,
    status: "suspended",
    avatar: "SM",
    joinedDate: "2022-11-01",
    tasksCompleted: 200,
    leaveDays: 5,
  },
];

const tasks = [
  {
    id: 1,
    title: "Take G-Wagon for servicing",
    assignedTo: "Emeka Okonkwo",
    dueDate: "2024-01-25",
    status: "pending",
    assignedAt: "2024-01-20T09:00:00Z",
  },
  {
    id: 2,
    title: "Prepare dinner for 8 guests",
    assignedTo: "Amaka Johnson",
    dueDate: "2024-01-24",
    status: "completed",
    assignedAt: "2024-01-18T10:00:00Z",
    startedAt: "2024-01-20T08:30:00Z",
    completedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: 3,
    title: "Deep clean the master bedroom",
    assignedTo: "Fatima Bello",
    dueDate: "2024-01-26",
    status: "in_progress",
    assignedAt: "2024-01-19T09:00:00Z",
    startedAt: "2024-01-20T07:00:00Z",
  },
  {
    id: 4,
    title: "Install new security cameras",
    assignedTo: "Chidi Okafor",
    dueDate: "2024-01-28",
    status: "pending",
    assignedAt: "2024-01-21T11:00:00Z",
  },
  {
    id: 5,
    title: "Pick kids from school",
    assignedTo: "Grace Nwankwo",
    dueDate: "2024-01-23",
    status: "completed",
    assignedAt: "2024-01-17T08:00:00Z",
    startedAt: "2024-01-23T14:00:00Z",
    completedAt: "2024-01-23T15:30:00Z",
  },
  {
    id: 6,
    title: "Mow the lawn",
    assignedTo: "Peter Okoro",
    dueDate: "2024-01-27",
    status: "pending",
    assignedAt: "2024-01-22T10:00:00Z",
  },
  {
    id: 7,
    title: "Wash the cars",
    assignedTo: "Emeka Okonkwo",
    dueDate: "2024-01-29",
    status: "pending",
    assignedAt: "2024-01-22T14:00:00Z",
  },
  {
    id: 8,
    title: "Clean the pool",
    assignedTo: "Peter Okoro",
    dueDate: "2024-01-30",
    status: "in_progress",
    assignedAt: "2024-01-20T09:00:00Z",
    startedAt: "2024-01-21T08:00:00Z",
  },
];

const payments = [
  {
    id: 1,
    staffName: "Emeka Okonkwo",
    type: "salary",
    amount: 150000,
    date: "2024-01-01",
    status: "completed",
  },
  {
    id: 2,
    staffName: "Amaka Johnson",
    type: "salary",
    amount: 200000,
    date: "2024-01-01",
    status: "completed",
  },
  {
    id: 3,
    staffName: "Chidi Okafor",
    type: "salary",
    amount: 120000,
    date: "2024-01-01",
    status: "completed",
  },
  {
    id: 4,
    staffName: "Fatima Bello",
    type: "salary",
    amount: 100000,
    date: "2024-01-01",
    status: "pending",
  },
  {
    id: 5,
    staffName: "Amaka Johnson",
    type: "bonus",
    amount: 50000,
    date: "2024-01-15",
    status: "completed",
    note: "Christmas bonus",
  },
  {
    id: 6,
    staffName: "Grace Nwankwo",
    type: "salary",
    amount: 180000,
    date: "2024-01-01",
    status: "completed",
  },
  {
    id: 7,
    staffName: "Peter Okoro",
    type: "salary",
    amount: 80000,
    date: "2024-01-01",
    status: "completed",
  },
  {
    id: 8,
    staffName: "Sunday Adeyemi",
    type: "bonus",
    amount: 25000,
    date: "2024-01-10",
    status: "pending",
    note: "Performance bonus",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const totalStaff = staffMembers.length;
  const activeStaff = staffMembers.filter((s) => s.status === "active").length;
  const totalMonthlySalary = staffMembers.reduce((sum, s) => sum + s.salary, 0);
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in_progress",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex w-full flex-col gap-2 md:flex-row">
            <TabsTrigger
              value="dashboard"
              className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3 hover:bg-gray-200"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="staff"
              className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3 hover:bg-gray-200"
            >
              <Users className="h-4 w-4" />
              <span>Staff</span>
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3 hover:bg-gray-200"
            >
              <DollarSign className="h-4 w-4" />
              <span>Payments</span>
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3 hover:bg-gray-200"
            >
              <ClipboardList className="h-4 w-4" />
              <span>Tasks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardStats
              totalStaff={totalStaff}
              activeStaff={activeStaff}
              totalMonthlySalary={totalMonthlySalary}
              pendingTasks={pendingTasks}
              inProgressTasks={inProgressTasks}
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <RecentTasks tasks={tasks} />
              <StaffOnLeave staffMembers={staffMembers} />
              <StaffOnSuspension staffMembers={staffMembers} />
            </div>
          </TabsContent>
          <TabsContent value="staff">
            <StaffTab staffMembers={staffMembers} />
          </TabsContent>
          <TabsContent value="payments">
            <PaymentsTab payments={payments} staffMembers={staffMembers} />
          </TabsContent>

          <TabsContent value="tasks">
            <TasksTab tasks={tasks} staffMembers={staffMembers} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
