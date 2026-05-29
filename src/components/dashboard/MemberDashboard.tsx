import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Activity, Apple, CreditCard, Dumbbell } from "lucide-react";

interface Workout { id: string; title: string; notes: string | null; duration_minutes: number; calories_burned: number; workout_date: string; }
interface Meal { id: string; meal_name: string; calories: number; meal_type: string; logged_at: string; }
interface Membership { id: string; plan: string; start_date: string; end_date: string; status: string; }
interface Payment { id: string; amount: number; currency: string; method: string; status: string; paid_at: string; }
interface MealPlan { id: string; title: string; description: string | null; daily_calorie_target: number; }

export function MemberDashboard() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [plans, setPlans] = useState<MealPlan[]>([]);

  const load = async () => {
    if (!user) return;
    const [w, m, ms, p, mp] = await Promise.all([
      supabase.from("workouts").select("*").eq("user_id", user.id).order("workout_date", { ascending: false }).limit(50),
      supabase.from("meal_logs").select("*").eq("user_id", user.id).order("logged_at", { ascending: false }).limit(50),
      supabase.from("memberships").select("*").eq("user_id", user.id).order("end_date", { ascending: false }),
      supabase.from("payments").select("*").eq("user_id", user.id).order("paid_at", { ascending: false }),
      supabase.from("meal_plans").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    ]);
    setWorkouts((w.data as Workout[]) ?? []);
    setMeals((m.data as Meal[]) ?? []);
    setMemberships((ms.data as Membership[]) ?? []);
    setPayments((p.data as Payment[]) ?? []);
    setPlans((mp.data as MealPlan[]) ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const activeMembership = memberships.find((m) => m.status === "active" && new Date(m.end_date) >= new Date());
  const totalCaloriesBurned = workouts.reduce((s, w) => s + (w.calories_burned ?? 0), 0);
  const todayCalories = meals.filter((m) => m.logged_at.slice(0, 10) === new Date().toISOString().slice(0, 10)).reduce((s, m) => s + m.calories, 0);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Member Dashboard</p>
        <h1 className="font-display text-5xl mt-2">Train. Track. Transform.</h1>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Stat icon={<Dumbbell className="size-5" />} label="Workouts logged" value={workouts.length} />
        <Stat icon={<Activity className="size-5" />} label="Total kcal burned" value={totalCaloriesBurned} />
        <Stat icon={<Apple className="size-5" />} label="Today intake (kcal)" value={todayCalories} />
        <Stat icon={<CreditCard className="size-5" />} label="Membership"
          value={activeMembership ? activeMembership.plan.toUpperCase() : "INACTIVE"}
          sub={activeMembership ? `Expires ${activeMembership.end_date}` : "Contact admin"} />
      </div>

      <Tabs defaultValue="workouts">
        <TabsList>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="plans">Meal Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="space-y-4">
          <LogWorkoutCard onLogged={load} />
          <HistoryTable
            title="Workout History"
            empty="No workouts yet. Log your first session above."
            headers={["Date", "Title", "Min", "kcal", "Notes"]}
            rows={workouts.map((w) => [w.workout_date, w.title, w.duration_minutes, w.calories_burned, w.notes ?? ""])}
          />
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <LogMealCard onLogged={load} />
          <HistoryTable
            title="Meal Log"
            empty="No meals logged."
            headers={["Logged", "Meal", "Type", "kcal"]}
            rows={meals.map((m) => [new Date(m.logged_at).toLocaleString(), m.meal_name, m.meal_type, m.calories])}
          />
        </TabsContent>

        <TabsContent value="plans">
          {plans.length === 0 ? (
            <p className="text-muted-foreground">No nutrition plans assigned. Your trainer can assign one.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {plans.map((p) => (
                <Card key={p.id}>
                  <CardHeader><CardTitle>{p.title}</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-wider">Target: <span className="text-primary">{p.daily_calorie_target} kcal/day</span></p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="billing">
          <HistoryTable
            title="Payments"
            empty="No payments on record."
            headers={["Date", "Amount", "Method", "Status"]}
            rows={payments.map((p) => [new Date(p.paid_at).toLocaleDateString(), `${p.currency} ${p.amount}`, p.method, p.status])}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string | number; sub?: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">{icon}{label}</div>
        <div className="mt-3 font-display text-4xl">{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </CardContent>
    </Card>
  );
}

function LogWorkoutCard({ onLogged }: { onLogged: () => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("workouts").insert({
      user_id: user.id, title, duration_minutes: Number(duration) || 0,
      calories_burned: Number(calories) || 0, notes,
    });
    if (error) return toast.error(error.message);
    toast.success("Workout logged");
    setTitle(""); setDuration(""); setCalories(""); setNotes("");
    onLogged();
  };

  return (
    <Card>
      <CardHeader><CardTitle>Log a Workout</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2"><Label>Title</Label><Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Push day, leg day…" /></div>
          <div><Label>Duration (min)</Label><Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} /></div>
          <div><Label>Calories</Label><Input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} /></div>
          <div className="md:col-span-4"><Label>Notes</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
          <div className="md:col-span-4"><Button type="submit">Save workout</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}

function LogMealCard({ onLogged }: { onLogged: () => void }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [type, setType] = useState("breakfast");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("meal_logs").insert({
      user_id: user.id, meal_name: name, calories: Number(calories) || 0, meal_type: type,
    });
    if (error) return toast.error(error.message);
    toast.success("Meal logged");
    setName(""); setCalories("");
    onLogged();
  };

  return (
    <Card>
      <CardHeader><CardTitle>Log a Meal</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2"><Label>Meal</Label><Input required value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Calories</Label><Input required type="number" value={calories} onChange={(e) => setCalories(e.target.value)} /></div>
          <div>
            <Label>Type</Label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <div className="md:col-span-4"><Button type="submit">Save meal</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}

export function HistoryTable({ title, headers, rows, empty }: { title: string; headers: string[]; rows: (string | number)[][]; empty: string }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-muted-foreground text-sm">{empty}</p>
        ) : (
          <Table>
            <TableHeader><TableRow>{headers.map((h) => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>{row.map((c, j) => <TableCell key={j}>{String(c)}</TableCell>)}</TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
