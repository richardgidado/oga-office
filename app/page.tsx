"use client";

import { useState } from "react";
import {
  Users,
  DollarSign,
  ClipboardList,
  Shield,
  LayoutDashboard,
  Plus,
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  Camera,
  Bell,
  Settings,
  ChevronRight,
  Gift,
  Phone,
  Mail,
  MapPin,
  Building2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatDate } from "@/lib/utils";

// Mock data
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
    status: "pending_vetting",
    avatar: "SA",
    joinedDate: "2024-01-01",
    tasksCompleted: 0,
    leaveDays: 0,
  },
];

const tasks = [
  {
    id: 1,
    title: "Take G-Wagon for servicing",
    assignedTo: "Emeka Okonkwo",
    dueDate: "2024-01-25",
    status: "pending",
    priority: "high",
    hasProof: false,
  },
  {
    id: 2,
    title: "Prepare dinner for 8 guests",
    assignedTo: "Amaka Johnson",
    dueDate: "2024-01-24",
    status: "completed",
    priority: "high",
    hasProof: true,
  },
  {
    id: 3,
    title: "Deep clean the master bedroom",
    assignedTo: "Fatima Bello",
    dueDate: "2024-01-26",
    status: "in_progress",
    priority: "medium",
    hasProof: false,
  },
  {
    id: 4,
    title: "Install new security cameras",
    assignedTo: "Chidi Okafor",
    dueDate: "2024-01-28",
    status: "pending",
    priority: "low",
    hasProof: false,
  },
];

const payments = [
  { id: 1, staffName: "Emeka Okonkwo", type: "salary", amount: 150000, date: "2024-01-01", status: "completed" },
  { id: 2, staffName: "Amaka Johnson", type: "salary", amount: 200000, date: "2024-01-01", status: "completed" },
  { id: 3, staffName: "Chidi Okafor", type: "salary", amount: 120000, date: "2024-01-01", status: "completed" },
  { id: 4, staffName: "Fatima Bello", type: "salary", amount: 100000, date: "2024-01-01", status: "pending" },
  { id: 5, staffName: "Amaka Johnson", type: "bonus", amount: 50000, date: "2024-01-15", status: "completed", note: "Christmas bonus" },
];

const vettingRequests = [
  { id: 1, name: "Sunday Adeyemi", type: "Driver", status: "in_progress", submittedDate: "2024-01-10" },
  { id: 2, name: "Grace Matthew", type: "Nanny", status: "pending", submittedDate: "2024-01-20" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isPaySalaryOpen, setIsPaySalaryOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const totalStaff = staffMembers.length;
  const activeStaff = staffMembers.filter((s) => s.status === "active").length;
  const totalMonthlySalary = staffMembers.reduce((sum, s) => sum + s.salary, 0);
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "on_leave":
        return <Badge variant="warning">On Leave</Badge>;
      case "pending_vetting":
        return <Badge variant="secondary">Pending Vetting</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "in_progress":
        return <Badge variant="warning">In Progress</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Paid</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 gap-2 sm:gap-0 py-2 sm:py-0">
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Oga's Office</h1>
                <p className="text-xs text-slate-500">Household Staff Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-end">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="h-9 w-9">
                <AvatarFallback>OA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-col md:flex-row w-full mb-6 gap-2">
            <TabsTrigger value="dashboard" className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 py-3 px-4">
              <span className="data-[state=active]:text-blue-600"><LayoutDashboard className="w-4 h-4 active:bg-amber-600" /></span>
              <span className="data-[state=active]:text-blue-600">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 py-3 px-4">
              <span className="data-[state=active]:text-blue-600"><Users className="w-4 h-4" /></span>
              <span className="data-[state=active]:text-blue-600">Staff</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 py-3 px-4">
              <span className="data-[state=active]:text-blue-600"><DollarSign className="w-4 h-4" /></span>
              <span className="data-[state=active]:text-blue-600">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 py-3 px-4">
              <span className="data-[state=active]:text-blue-600"><ClipboardList className="w-4 h-4" /></span>
              <span className="data-[state=active]:text-blue-600">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="vetting" className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 py-3 px-4">
              <span className="data-[state=active]:text-blue-600"><Shield className="w-4 h-4" /></span>
              <span className="data-[state=active]:text-blue-600">Vetting</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                  <Users className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStaff}</div>
                  <p className="text-xs text-slate-500">{activeStaff} active</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
                  <DollarSign className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(totalMonthlySalary)}</div>
                  <p className="text-xs text-slate-500">+{formatCurrency(50000)} in bonuses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <ClipboardList className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingTasks}</div>
                  <p className="text-xs text-slate-500">{tasks.filter(t => t.status === 'in_progress').length} in progress</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Vetting Pending</CardTitle>
                  <Shield className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vettingRequests.length}</div>
                  <p className="text-xs text-slate-500">Background checks</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tasks</CardTitle>
                  <CardDescription>Latest task updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {task.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : task.status === "in_progress" ? (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-slate-400" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{task.title}</p>
                            <p className="text-xs text-slate-500">{task.assignedTo}</p>
                          </div>
                        </div>
                        {getTaskStatusBadge(task.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staff on Leave</CardTitle>
                  <CardDescription>Currently away</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffMembers.filter(s => s.status === "on_leave").map((staff) => (
                      <div key={staff.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{staff.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{staff.name}</p>
                            <p className="text-xs text-slate-500">{staff.role}</p>
                          </div>
                        </div>
                        <Badge variant="warning">{staff.leaveDays} days left</Badge>
                      </div>
                    ))}
                    {staffMembers.filter(s => s.status === "on_leave").length === 0 && (
                      <p className="text-sm text-slate-500 text-center py-4">No staff on leave</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>Manage your household staff</CardDescription>
                </div>
                <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Staff
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Staff Member</DialogTitle>
                      <DialogDescription>Enter the staff member details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter full name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="driver">Driver</SelectItem>
                            <SelectItem value="chef">Chef</SelectItem>
                            <SelectItem value="housekeeper">Housekeeper</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="nanny">Nanny</SelectItem>
                            <SelectItem value="gardener">Gardener</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-slate-400 transition-colors">
                          <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                          <p className="text-sm text-slate-500">Upload ID or passport</p>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Guarantor Form</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-slate-400 transition-colors">
                          <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                          <p className="text-sm text-slate-500">Upload guarantor form</p>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>Cancel</Button>
                      <Button onClick={() => setIsAddStaffOpen(false)}>Add Staff</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffMembers.map((staff) => (
                    <div key={staff.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-slate-900 text-white">{staff.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{staff.name}</p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {staff.phone}
                          </p>
                          <p className="text-xs text-slate-400">Joined: {formatDate(staff.joinedDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(staff.salary)}</p>
                          <p className="text-xs text-slate-500">/month</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{staff.role}</p>
                          {getStatusBadge(staff.status)}
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Payment Management</CardTitle>
                  <CardDescription>Salaries and bonuses</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Gift className="w-4 h-4 mr-2" />
                        Add Bonus
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Bonus / "Dash"</DialogTitle>
                        <DialogDescription>Give a staff member a bonus</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Select Staff</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose staff member" />
                            </SelectTrigger>
                            <SelectContent>
                              {staffMembers.map((staff) => (
                                <SelectItem key={staff.id} value={staff.id.toString()}>
                                  {staff.name} - {staff.role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bonus-amount">Bonus Amount (NGN)</Label>
                          <Input id="bonus-amount" type="number" placeholder="50000" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bonus-note">Note (optional)</Label>
                          <Input id="bonus-note" placeholder="e.g., Christmas bonus, performance bonus" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddPaymentOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsAddPaymentOpen(false)}>Send Bonus</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isPaySalaryOpen} onOpenChange={setIsPaySalaryOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <DollarSign className="w-4 h-4 mr-2" />
                        Pay Salaries
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Pay Salaries</DialogTitle>
                        <DialogDescription>Select staff members to pay salary</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        {/* Select All Option */}
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg mb-4">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="selectAll"
                              checked={selectAll}
                              onChange={(e) => {
                                setSelectAll(e.target.checked);
                                if (e.target.checked) {
                                  setSelectedStaff(staffMembers.filter(s => s.status === 'active').map(s => s.id));
                                } else {
                                  setSelectedStaff([]);
                                }
                              }}
                              className="w-4 h-4"
                            />
                            <Label htmlFor="selectAll" className="font-medium cursor-pointer">Select All Staff</Label>
                          </div>
                          <span className="text-sm text-slate-500">{selectedStaff.length} selected</span>
                        </div>

                        {/* Individual Staff Selection */}
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {staffMembers.filter(s => s.status === 'active').map((staff) => (
                            <div key={staff.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  id={`staff-${staff.id}`}
                                  checked={selectedStaff.includes(staff.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedStaff([...selectedStaff, staff.id]);
                                    } else {
                                      setSelectedStaff(selectedStaff.filter(id => id !== staff.id));
                                    }
                                  }}
                                  className="w-4 h-4"
                                />
                                <Label htmlFor={`staff-${staff.id}`} className="cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback className="bg-slate-900 text-white text-xs">{staff.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium text-sm">{staff.name}</p>
                                      <p className="text-xs text-slate-500">{staff.role}</p>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                              {selectedStaff.includes(staff.id) && (
                                <Check className="w-5 h-5 text-green-600" />
                              )}
                              <div className="text-right">
                                <p className="font-semibold text-sm">{formatCurrency(staff.salary)}</p>
                                <p className="text-xs text-slate-500">monthly</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Total */}
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">Total Amount</p>
                            <p className="font-bold text-lg text-blue-600">
                              {formatCurrency(selectedStaff.reduce((sum, id) => {
                                const staff = staffMembers.find(s => s.id === id);
                                return sum + (staff?.salary || 0);
                              }, 0))}
                            </p>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPaySalaryOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsPaySalaryOpen(false)}>Confirm Payment</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-lg gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${payment.type === 'salary' ? 'bg-blue-100' : 'bg-green-100'}`}>
                          {payment.type === 'salary' ? (
                            <DollarSign className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Gift className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{payment.staffName}</p>
                          <p className="text-sm text-slate-500 capitalize">{payment.type}</p>
                          {payment.note && <p className="text-xs text-slate-400">{payment.note}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold text-lg">{formatCurrency(payment.amount)}</p>
                          <p className="text-xs text-slate-500">{formatDate(payment.date)}</p>
                        </div>
                        {getPaymentStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>Assign and track tasks</CardDescription>
                </div>
                <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>Assign a task to a staff member</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="task-title">Task Description</Label>
                        <Input id="task-title" placeholder="e.g., Take G-Wagon for servicing" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Assign To</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select staff member" />
                          </SelectTrigger>
                          <SelectContent>
                            {staffMembers.filter(s => s.status === 'active').map((staff) => (
                              <SelectItem key={staff.id} value={staff.id.toString()}>
                                {staff.name} - {staff.role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="task-due">Due Date</Label>
                        <Input id="task-due" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Priority</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>Cancel</Button>
                      <Button onClick={() => setIsAddTaskOpen(false)}>Assign Task</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-lg gap-4">
                      <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${task.status === 'completed' ? 'bg-green-100' :
                            task.status === 'in_progress' ? 'bg-yellow-100' : 'bg-slate-100'
                          }`}>
                          {task.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : task.status === 'in_progress' ? (
                            <Clock className="w-5 h-5 text-yellow-600" />
                          ) : (
                            <ClipboardList className="w-5 h-5 text-slate-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{task.title}</p>
                          <p className="text-sm text-slate-500">Assigned to: {task.assignedTo}</p>
                          <p className="text-xs text-slate-400">Due: {formatDate(task.dueDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {task.hasProof && (
                          <div className="flex items-center gap-1 text-green-600">
                            <Camera className="w-4 h-4" />
                            <span className="text-xs">Proof uploaded</span>
                          </div>
                        )}
                        <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'warning' : 'secondary'}>
                          {task.priority}
                        </Badge>
                        {getTaskStatusBadge(task.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vetting Tab */}
          <TabsContent value="vetting">
            <Card>
              <CardHeader>
                <CardTitle>Background Checks & Vetting</CardTitle>
                <CardDescription>Verify staff credentials and background</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Integrated Vetting Service</p>
                        <p className="text-sm text-blue-700">We partner with verified background check agencies in Nigeria to provide comprehensive vetting including ID verification, address verification, and reference checks.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Pending Vetting Requests</h3>
                    {vettingRequests.map((request) => (
                      <div key={request.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-lg gap-4">
                        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-slate-200">{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{request.name}</p>
                            <p className="text-sm text-slate-500">{request.type}</p>
                            <p className="text-xs text-slate-400">Submitted: {formatDate(request.submittedDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={request.status === 'in_progress' ? 'warning' : 'secondary'}>
                            {request.status === 'in_progress' ? 'In Progress' : 'Pending'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {vettingRequests.length === 0 && (
                      <p className="text-center text-slate-500 py-8">No pending vetting requests</p>
                    )}
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold">Start New Vetting</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                        <FileText className="w-6 h-6" />
                        <span className="font-medium">ID Verification</span>
                        <span className="text-xs text-slate-500">Verify national ID, passport, or driver's license</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                        <Users className="w-6 h-6" />
                        <span className="font-medium">Reference Check</span>
                        <span className="text-xs text-slate-500">Contact previous employers and guarantors</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
