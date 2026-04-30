"use client";

import { useState } from "react";
import { DollarSign, Gift, Check, Search } from "lucide-react";
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
import { formatCurrency, formatDate } from "@/lib/utils";

interface Payment {
  id: number;
  staffName: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  note?: string;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  salary: number;
  status: string;
  avatar: string;
}

interface PaymentsTabProps {
  payments: Payment[];
  staffMembers: Staff[];
}

function getPaymentStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge variant="success">Paid</Badge>;
    case "pending":
      return <Badge variant="pending">Pending</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export function PaymentsTab({ payments, staffMembers }: PaymentsTabProps) {
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isPaySalaryOpen, setIsPaySalaryOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBonusStaff, setSelectedBonusStaff] = useState("");
  const [salarySearchQuery, setSalarySearchQuery] = useState("");

  const activeStaff = staffMembers.filter((s) => s.status === "active");
  const staffOptions = activeStaff.map((staff) => ({
    value: staff.id.toString(),
    label: `${staff.name} - ${staff.role}`,
  }));

  const filteredPayments = payments.filter((payment) => {
    const query = searchQuery.toLowerCase();
    return (
      payment.staffName.toLowerCase().includes(query) ||
      payment.type.toLowerCase().includes(query) ||
      payment.status.toLowerCase().includes(query) ||
      payment.date.toLowerCase().includes(query) ||
      payment.amount.toString().includes(query) ||
      (payment.note && payment.note.toLowerCase().includes(query))
    );
  });

  const filteredSalaryStaff = activeStaff.filter((staff) =>
    staff.name.toLowerCase().includes(salarySearchQuery.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Payment Management</CardTitle>
          <CardDescription>Salaries and bonuses</CardDescription>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                <Gift className="mr-2 h-4 w-4" />
                Add Bonus
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle style={{ color: "black" }}>Add Bonus</DialogTitle>
                <DialogDescription>
                  Give a staff member a bonus
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Select Staff</Label>
                  <SearchableSelect
                    options={staffOptions}
                    value={selectedBonusStaff}
                    onChange={setSelectedBonusStaff}
                    placeholder="Choose staff member"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bonus-amount">Bonus Amount (NGN)</Label>
                  <Input id="bonus-amount" type="number" placeholder="50000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bonus-note">Note (optional)</Label>
                  <Input
                    id="bonus-note"
                    placeholder="e.g., Christmas bonus, performance bonus"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddPaymentOpen(false);
                    setSelectedBonusStaff("");
                  }}
                  className="cursor-pointer bg-white text-black"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsAddPaymentOpen(false);
                    setSelectedBonusStaff("");
                  }}
                  className="cursor-pointer"
                >
                  Send Bonus
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isPaySalaryOpen} onOpenChange={setIsPaySalaryOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <DollarSign className="mr-2 h-4 w-4" />
                Pay Salaries
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle style={{ color: "black" }}>
                  Pay Salaries
                </DialogTitle>
                <DialogDescription>
                  Select staff members to pay salary
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4">
                  <Input
                    placeholder="Search staff by name..."
                    value={salarySearchQuery}
                    onChange={(e) => setSalarySearchQuery(e.target.value)}
                  />
                </div>
                <div className="mb-4 flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="selectAll"
                      checked={selectAll}
                      onChange={(e) => {
                        setSelectAll(e.target.checked);
                        if (e.target.checked) {
                          setSelectedStaff(
                            filteredSalaryStaff.map((s) => s.id),
                          );
                        } else {
                          setSelectedStaff([]);
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <Label
                      htmlFor="selectAll"
                      className="cursor-pointer font-medium"
                    >
                      Select All Staff
                    </Label>
                  </div>
                  <span className="text-sm text-slate-500">
                    {selectedStaff.length} selected
                  </span>
                </div>
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {filteredSalaryStaff.map((staff) => (
                    <div
                      key={staff.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`staff-${staff.id}`}
                          checked={selectedStaff.includes(staff.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStaff([...selectedStaff, staff.id]);
                            } else {
                              setSelectedStaff(
                                selectedStaff.filter((id) => id !== staff.id),
                              );
                            }
                          }}
                          className="h-4 w-4"
                        />
                        <Label
                          htmlFor={`staff-${staff.id}`}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-slate-900 text-xs text-white">
                                {staff.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {staff.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {staff.role}
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                      {selectedStaff.includes(staff.id) && (
                        <Check className="h-5 w-5 text-green-600"/>
                      )}
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {formatCurrency(staff.salary)}
                        </p>
                        <p className="text-xs text-slate-500">monthly</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Total Amount</p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatCurrency(
                        selectedStaff.reduce((sum, id) => {
                          const staff = staffMembers.find((s) => s.id === id);
                          return sum + (staff?.salary || 0);
                        }, 0),
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-white-300 cursor-pointer text-black"
                  variant="outline"
                  onClick={() => setIsPaySalaryOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsPaySalaryOpen(false)}
                  className="cursor-pointer"
                >
                  Confirm Payment
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
            placeholder="Search by name, type, status, date, amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="space-y-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      payment.type === "salary" ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    {payment.type === "salary" ? (
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Gift className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{payment.staffName}</p>
                    <p className="text-sm text-slate-500 capitalize">
                      {payment.type}
                    </p>
                    {payment.note && (
                      <p className="text-xs text-slate-400">{payment.note}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {formatCurrency(payment.amount)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(payment.date)}
                    </p>
                  </div>
                  {getPaymentStatusBadge(payment.status)}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500">
              No payments found matching your search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
