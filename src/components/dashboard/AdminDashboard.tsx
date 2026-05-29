import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Users, CreditCard, Dumbbell, UserCog } from "lucide-react";

type Role = "admin" | "trainer" | "member";
interface Profile { id: string; full_name: string; email: string | null; }
interface RoleRow { user_id: string; role: Role; }
interface Membership { id: string; user_id: string; plan: string; start_date: string; end_date: string; status: string; }
interface Payment { id: string; user_id: string; amount: number; currency: string; method: string; status: string; paid_at: string; }
interface Assignment { id: string; trainer_id: string; member_id: string; }

export function AdminDashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [workoutCount, setWorkoutCount] = useState(0);

  const load = async () => {
    const [p, r, ms, pay, a, wc] = await Promise.all([
      supabase.from("profiles").select("id, full_name, email"),
      supabase.from("user_roles").select("user_id, role"),
      supabase.from("memberships").select("*").order("end_date", { ascending: false }),
      supabase.from("payments").select("*").order("paid_at", { ascending: false }),
      supabase.from("trainer_assignments").select("*"),
      supabase.from("workouts").select("*", { count: "exact", head: true }),
    ]);
    setProfiles((p.data as Profile[]) ?? []);
    setRoles((r.data as RoleRow[]) ?? []);
    setMemberships((ms.data as Membership[]) ?? []);
    setPayments((pay.data as Payment[]) ?? []);
    setAssignments((a.data as Assignment[]) ?? []);
    setWorkoutCount(wc.count ?? 0);
  };
  useEffect(() => { load(); }, []);

  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.full_name || profiles.find((p) => p.id === id)?.email || id.slice(0, 8);
  const rolesOf = (id: string) => roles.filter((r) => r.user_id === id).map((r) => r.role);
  const trainers = profiles.filter((p) => rolesOf(p.id).includes("trainer"));
  const members = profiles.filter((p) => rolesOf(p.id).includes("member") && !rolesOf(p.id).includes("trainer"));
  const activeCount = memberships.filter((m) => m.status === "active" && new Date(m.end_date) >= new Date()).length;
  const revenue = payments.filter((p) => p.status === "completed").reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Admin Dashboard</p>
        <h1 className="font-display text-5xl mt-2">Operations</h1>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Stat icon={<Users className="size-5" />} label="Users" value={profiles.length} />
        <Stat icon={<CreditCard className="size-5" />} label="Active memberships" value={activeCount} />
        <Stat icon={<CreditCard className="size-5" />} label="Revenue" value={`KES ${revenue}`} />
        <Stat icon={<Dumbbell className="size-5" />} label="Workouts logged" value={workoutCount} />
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="assignments">Trainer Assignments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersTable profiles={profiles} roles={roles} onChanged={load} />
        </TabsContent>

        <TabsContent value="memberships">
          <NewMembershipForm members={profiles} onSaved={load} />
          <Card className="mt-4">
            <CardHeader><CardTitle>All Memberships</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Member</TableHead><TableHead>Plan</TableHead><TableHead>Start</TableHead><TableHead>End</TableHead><TableHead>Status</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {memberships.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{nameOf(m.user_id)}</TableCell>
                      <TableCell className="uppercase">{m.plan}</TableCell>
                      <TableCell>{m.start_date}</TableCell>
                      <TableCell>{m.end_date}</TableCell>
                      <TableCell>{m.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <NewPaymentForm members={profiles} memberships={memberships} onSaved={load} />
          <Card className="mt-4">
            <CardHeader><CardTitle>Transactions</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Date</TableHead><TableHead>Member</TableHead><TableHead>Amount</TableHead><TableHead>Method</TableHead><TableHead>Status</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{new Date(p.paid_at).toLocaleDateString()}</TableCell>
                      <TableCell>{nameOf(p.user_id)}</TableCell>
                      <TableCell>{p.currency} {p.amount}</TableCell>
                      <TableCell>{p.method}</TableCell>
                      <TableCell>{p.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <NewAssignmentForm trainers={trainers} members={members} onSaved={load} />
          <Card className="mt-4">
            <CardHeader><CardTitle>Current Assignments</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Trainer</TableHead><TableHead>Member</TableHead><TableHead /></TableRow></TableHeader>
                <TableBody>
                  {assignments.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{nameOf(a.trainer_id)}</TableCell>
                      <TableCell>{nameOf(a.member_id)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={async () => {
                          await supabase.from("trainer_assignments").delete().eq("id", a.id);
                          toast.success("Removed"); load();
                        }}>Remove</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <ReportsPanel profiles={profiles} memberships={memberships} payments={payments} workoutCount={workoutCount} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <Card><CardContent className="pt-6">
      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">{icon}{label}</div>
      <div className="mt-3 font-display text-4xl">{value}</div>
    </CardContent></Card>
  );
}

function UsersTable({ profiles, roles, onChanged }: { profiles: Profile[]; roles: RoleRow[]; onChanged: () => void }) {
  const rolesOf = (id: string) => roles.filter((r) => r.user_id === id).map((r) => r.role);
  const toggleRole = async (uid: string, role: Role, has: boolean) => {
    if (has) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", uid).eq("role", role);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: uid, role });
      if (error) return toast.error(error.message);
    }
    toast.success("Updated");
    onChanged();
  };
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><UserCog className="size-5" /> All Users</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow>
            <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Roles</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {profiles.map((p) => {
              const r = rolesOf(p.id);
              return (
                <TableRow key={p.id}>
                  <TableCell>{p.full_name || "—"}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell className="flex gap-2 flex-wrap">
                    {(["admin", "trainer", "member"] as Role[]).map((role) => (
                      <button key={role} onClick={() => toggleRole(p.id, role, r.includes(role))}
                        className={`px-2 py-1 text-[10px] uppercase tracking-wider border ${r.includes(role) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
                        {role}
                      </button>
                    ))}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function NewMembershipForm({ members, onSaved }: { members: Profile[]; onSaved: () => void }) {
  const [userId, setUserId] = useState("");
  const [plan, setPlan] = useState("basic");
  const [months, setMonths] = useState("1");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return toast.error("Pick a member");
    const start = new Date();
    const end = new Date(); end.setMonth(end.getMonth() + (Number(months) || 1));
    const { error } = await supabase.from("memberships").insert({
      user_id: userId, plan, start_date: start.toISOString().slice(0, 10),
      end_date: end.toISOString().slice(0, 10), status: "active",
    });
    if (error) return toast.error(error.message);
    toast.success("Membership created");
    onSaved();
  };

  return (
    <Card>
      <CardHeader><CardTitle>Create / Renew Membership</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <Label>Member</Label>
            <select value={userId} onChange={(e) => setUserId(e.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              <option value="">— select —</option>
              {members.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
            </select>
          </div>
          <div>
            <Label>Plan</Label>
            <select value={plan} onChange={(e) => setPlan(e.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              <option value="basic">Basic</option><option value="standard">Standard</option><option value="premium">Premium</option>
            </select>
          </div>
          <div><Label>Months</Label><Input type="number" value={months} onChange={(e) => setMonths(e.target.value)} /></div>
          <div className="md:col-span-4"><Button type="submit">Save</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}

function NewPaymentForm({ members, memberships, onSaved }: { members: Profile[]; memberships: Membership[]; onSaved: () => void }) {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return toast.error("Pick member");
    const latestMs = memberships.find((m) => m.user_id === userId);
    const { error } = await supabase.from("payments").insert({
      user_id: userId, amount: Number(amount) || 0, method, status: "completed",
      membership_id: latestMs?.id ?? null,
    });
    if (error) return toast.error(error.message);
    toast.success("Payment recorded");
    setAmount("");
    onSaved();
  };

  return (
    <Card>
      <CardHeader><CardTitle>Record Payment</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <Label>Member</Label>
            <select value={userId} onChange={(e) => setUserId(e.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              <option value="">— select —</option>
              {members.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
            </select>
          </div>
          <div><Label>Amount (KES)</Label><Input required type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
          <div>
            <Label>Method</Label>
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              <option value="cash">Cash</option><option value="mpesa">M-Pesa</option><option value="card">Card</option><option value="bank">Bank</option>
            </select>
          </div>
          <div className="md:col-span-4"><Button type="submit">Record</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}

function NewAssignmentForm({ trainers, members, onSaved }: { trainers: Profile[]; members: Profile[]; onSaved: () => void }) {
  const [trainerId, setTrainerId] = useState("");
  const [memberId, setMemberId] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainerId || !memberId) return toast.error("Pick trainer + member");
    const { error } = await supabase.from("trainer_assignments").insert({ trainer_id: trainerId, member_id: memberId });
    if (error) return toast.error(error.message);
    toast.success("Assigned");
    onSaved();
  };

  return (
    <Card>
      <CardHeader><CardTitle>Assign Trainer to Member</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid md:grid-cols-3 gap-3">
          <div>
            <Label>Trainer</Label>
            <select value={trainerId} onChange={(e) => setTrainerId(e.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              <option value="">— select —</option>
              {trainers.map((t) => <option key={t.id} value={t.id}>{t.full_name || t.email}</option>)}
            </select>
          </div>
          <div>
            <Label>Member</Label>
            <select value={memberId} onChange={(e) => setMemberId(e.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              <option value="">— select —</option>
              {members.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
            </select>
          </div>
          <div className="flex items-end"><Button type="submit">Assign</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}

function ReportsPanel({ profiles, memberships, payments, workoutCount }: {
  profiles: Profile[]; memberships: Membership[]; payments: Payment[]; workoutCount: number;
}) {
  const exportCsv = (filename: string, rows: (string | number)[][], headers: string[]) => {
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };
  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.full_name || profiles.find((p) => p.id === id)?.email || id;
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <ReportCard title="Membership Report" desc={`${memberships.length} total memberships`}
        onExport={() => exportCsv("memberships.csv",
          memberships.map((m) => [nameOf(m.user_id), m.plan, m.start_date, m.end_date, m.status]),
          ["Member", "Plan", "Start", "End", "Status"])} />
      <ReportCard title="Revenue Report" desc={`KES ${payments.reduce((s, p) => s + Number(p.amount), 0)} collected`}
        onExport={() => exportCsv("payments.csv",
          payments.map((p) => [new Date(p.paid_at).toISOString(), nameOf(p.user_id), p.amount, p.currency, p.method, p.status]),
          ["Date", "Member", "Amount", "Currency", "Method", "Status"])} />
      <ReportCard title="Fitness Activity" desc={`${workoutCount} workouts logged across all members`}
        onExport={async () => {
          const { data } = await supabase.from("workouts").select("workout_date, title, duration_minutes, calories_burned, user_id");
          exportCsv("workouts.csv",
            (data ?? []).map((w) => [w.workout_date, nameOf(w.user_id), w.title, w.duration_minutes ?? 0, w.calories_burned ?? 0]),
            ["Date", "Member", "Title", "Minutes", "Calories"]);
        }} />
    </div>
  );
}

function ReportCard({ title, desc, onExport }: { title: string; desc: string; onExport: () => void }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{desc}</p>
        <Button onClick={onExport} variant="outline">Export CSV</Button>
      </CardContent>
    </Card>
  );
}
