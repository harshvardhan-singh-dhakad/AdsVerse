"use client";

import React, { useState } from "react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, updateDoc, increment } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, UserCheck, Shield, Crown, Sparkles, Loader2, Search, PlusCircle, 
  Mail, Calendar, ArrowUpDown, Check, RefreshCw 
} from "lucide-react";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

interface AuditUser {
  id: string;
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phone?: string;
  provider?: string;
  role?: "admin" | "user";
  paidCredits?: number;
  reportsRemaining?: number;
  plan?: string;
  createdAt?: Timestamp;
  lastLoginAt?: Timestamp;
}

export function UsersTable() {
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState("");
  const [creditModalUser, setCreditModalUser] = useState<AuditUser | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(5);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  const usersQuery = useMemoFirebase(
    () => query(collection(firestore, "audit_users"), orderBy("createdAt", "desc")),
    [firestore]
  );
  const { data: users, isLoading, error } = useCollection<AuditUser>(usersQuery);

  const filteredUsers = React.useMemo(() => {
    if (!users) return [];
    if (!searchTerm.trim()) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.email?.toLowerCase().includes(term) ||
        u.displayName?.toLowerCase().includes(term) ||
        u.phone?.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const totalUsers = users?.length || 0;
  const adminUsers = users?.filter((u) => u.role === "admin").length || 0;
  const totalCreditsInCirculation = users?.reduce((acc, u) => acc + (Number(u.paidCredits) || 0), 0) || 0;

  const handleAddCredits = async () => {
    if (!creditModalUser || creditAmount <= 0) return;
    setUpdatingUser(creditModalUser.uid);
    try {
      const userRef = doc(firestore, "audit_users", creditModalUser.uid);
      await updateDoc(userRef, {
        paidCredits: increment(creditAmount),
      });
      setCreditModalUser(null);
    } catch (err) {
      console.error("Failed to add credits:", err);
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleToggleRole = async (user: AuditUser) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    if (!confirm(`Are you sure you want to change ${user.email}'s role to ${newRole.toUpperCase()}?`)) return;
    
    setUpdatingUser(user.uid);
    try {
      const userRef = doc(firestore, "audit_users", user.uid);
      await updateDoc(userRef, {
        role: newRole,
      });
    } catch (err) {
      console.error("Failed to update role:", err);
    } finally {
      setUpdatingUser(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border border-border/40 bg-card/40 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Registered Users</CardTitle>
            <Users className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Synced with Google &amp; Email Auth</p>
          </CardContent>
        </Card>

        <Card className="border border-border/40 bg-card/40 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Admins &amp; Staff</CardTitle>
            <Crown className="w-5 h-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-amber-500">{adminUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Full system command access</p>
          </CardContent>
        </Card>

        <Card className="border border-border/40 bg-card/40 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Wallet Credits</CardTitle>
            <Sparkles className="w-5 h-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-500">{totalCreditsInCirculation}</div>
            <p className="text-xs text-muted-foreground mt-1">Paid audits available across users</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border border-border/40 bg-card/40 backdrop-blur-xl">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold">User Directory &amp; Audit Wallets</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Manage accounts, gift audit credits, and grant admin roles.
            </CardDescription>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background/50 text-xs"
            />
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No registered users found matching your search.
            </div>
          ) : (
            <div className="rounded-xl border border-border/40 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="text-xs">User Profile</TableHead>
                    <TableHead className="text-xs">Auth Method</TableHead>
                    <TableHead className="text-xs">Role</TableHead>
                    <TableHead className="text-xs text-center">Wallet Credits</TableHead>
                    <TableHead className="text-xs">Joined Date</TableHead>
                    <TableHead className="text-xs text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border/20">
                  {filteredUsers.map((u) => {
                    const isAdmin = u.role === "admin";
                    const credits = Number(u.paidCredits) || 0;
                    return (
                      <TableRow key={u.uid} className="hover:bg-muted/20 transition-colors">
                        
                        {/* Profile */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs shrink-0 overflow-hidden">
                              {u.photoURL ? (
                                <img src={u.photoURL} alt="" className="w-full h-full object-cover" />
                              ) : (
                                (u.displayName || u.email || "U")[0].toUpperCase()
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-foreground truncate">{u.displayName || "Anonymous User"}</div>
                              <div className="text-[11px] text-muted-foreground truncate">{u.email}</div>
                              {u.phone && <div className="text-[10px] text-emerald-400 font-mono">{u.phone}</div>}
                            </div>
                          </div>
                        </TableCell>

                        {/* Auth Provider */}
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-medium bg-background/50">
                            {u.provider?.includes("google") ? "🌐 Google Auth" : "✉️ Email / Pass"}
                          </Badge>
                        </TableCell>

                        {/* Role */}
                        <TableCell>
                          <Badge className={isAdmin ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px]" : "bg-slate-500/20 text-slate-400 text-[10px]"}>
                            {isAdmin ? "👑 Admin" : "👤 User"}
                          </Badge>
                        </TableCell>

                        {/* Credits */}
                        <TableCell className="text-center">
                          <span className="font-mono font-bold text-xs text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            {credits} {credits === 1 ? "credit" : "credits"}
                          </span>
                        </TableCell>

                        {/* Date */}
                        <TableCell className="text-[11px] text-muted-foreground">
                          {u.createdAt ? format(u.createdAt.toDate(), "MMM dd, yyyy") : "N/A"}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCreditModalUser(u)}
                              className="h-7 text-[11px] px-2.5 bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                            >
                              <PlusCircle className="w-3 h-3 mr-1" /> Gift Credits
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={updatingUser === u.uid}
                              onClick={() => handleToggleRole(u)}
                              className="h-7 text-[11px] px-2 text-muted-foreground hover:text-foreground"
                            >
                              {isAdmin ? "Demote" : "Make Admin"}
                            </Button>
                          </div>
                        </TableCell>

                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gift Credits Modal */}
      {creditModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-sm bg-card border border-border/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setCreditModalUser(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-foreground">Gift Audit Credits</h3>
            <p className="text-xs text-muted-foreground">
              Add paid audit credits to <span className="font-semibold text-primary">{creditModalUser.email}</span>.
            </p>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-foreground">Select or enter credit amount:</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 5, 10, 25].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCreditAmount(amt)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      creditAmount === amt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    +{amt}
                  </button>
                ))}
              </div>

              <Input
                type="number"
                min="1"
                max="100"
                value={creditAmount}
                onChange={(e) => setCreditAmount(Number(e.target.value))}
                className="text-xs"
                placeholder="Custom amount"
              />

              <Button
                onClick={handleAddCredits}
                disabled={updatingUser === creditModalUser.uid || creditAmount <= 0}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-4 mt-2"
              >
                {updatingUser === creditModalUser.uid ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-1" />
                )}
                Confirm +{creditAmount} Credits
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
