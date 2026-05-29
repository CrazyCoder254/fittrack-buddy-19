import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HistoryTable } from "./MemberDashboard";
import { toast } from "sonner";

interface Member { id: string; full_name: string; email: string | null; }
interface Workout { id: string; user_id: string; title: string; workout_date: string; duration_minutes: number; calories_burned: number; }

export function TrainerDashboard() {
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [memberWorkouts, setMemberWorkouts] = useState<Workout[]>([]);

  const loadMembers = async () => {
    if (!user) return;
    const { data: assigns } = await supabase
      .from("trainer_assignments").select("member_id").eq("trainer_id", user.id);
    const ids = (assigns ?? []).map((a) => a.member_id);
    if (ids.length === 0) { setMembers([]); return; }
    const { data: profs } = await supabase.from("profiles").select("id, full_name, email").in("id", ids);
    setMembers((profs as Member[]) ?? []);
    if (!selected && profs && profs.length > 0) setSelected(profs[0].id);
  };
  useEffect(() => { loadMembers(); }, [user]);

  const loadMemberData = async () => {
    if (!selected) return;
    const { data } = await supabase.from("workouts").select("*").eq("user_id", selected).order("workout_date", { ascending: false });
    setMemberWorkouts((data as Workout[]) ?? []);
  };
  useEffect(() => { loadMemberData(); }, [selected]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Trainer Dashboard</p>
        <h1 className="font-display text-5xl mt-2">Your Athletes</h1>
      </div>

      {members.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">
          No members assigned to you yet. Ask an admin to assign members.
        </CardContent></Card>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {members.map((m) => (
              <button key={m.id} onClick={() => setSelected(m.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider border ${selected === m.id ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
                {m.full_name || m.email}
              </button>
            ))}
          </div>

          <Tabs defaultValue="workouts">
            <TabsList>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="assign-workout">Assign Workout</TabsTrigger>
              <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="workouts">
              <HistoryTable
                title="Member Workout History"
                empty="No workouts logged by this member."
                headers={["Date", "Title", "Min", "kcal"]}
                rows={memberWorkouts.map((w) => [w.workout_date, w.title, w.duration_minutes, w.calories_burned])}
              />
            </TabsContent>

            <TabsContent value="assign-workout">
              <AssignWorkoutForm memberId={selected} onSaved={loadMemberData} />
            </TabsContent>

            <TabsContent value="meal-plan">
              <AssignMealPlanForm memberId={selected} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

function AssignWorkoutForm({ memberId, onSaved }: { memberId: string; onSaved: () => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !memberId) return;
    const { error } = await supabase.from("workouts").insert({
      user_id: memberId, assigned_by: user.id, title, notes,
      duration_minutes: Number(duration) || 0,
    });
    if (error) return toast.error(error.message);
    toast.success("Workout assigned");
    setTitle(""); setNotes(""); setDuration("");
    onSaved();
  };

  return (
    <Card>
      <CardHeader><CardTitle>Assign a Workout</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid md:grid-cols-3 gap-3">
          <div className="md:col-span-2"><Label>Title</Label><Input required value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div><Label>Target duration (min)</Label><Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} /></div>
          <div className="md:col-span-3"><Label>Instructions</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
          <div className="md:col-span-3"><Button type="submit">Assign</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}

function AssignMealPlanForm({ memberId }: { memberId: string }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("2000");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !memberId) return;
    const { error } = await supabase.from("meal_plans").insert({
      user_id: memberId, assigned_by: user.id, title, description,
      daily_calorie_target: Number(target) || 2000,
    });
    if (error) return toast.error(error.message);
    toast.success("Meal plan assigned");
    setTitle(""); setDescription(""); setTarget("2000");
  };

  return (
    <Card>
      <CardHeader><CardTitle>Assign a Nutrition Plan</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid md:grid-cols-3 gap-3">
          <div className="md:col-span-2"><Label>Plan title</Label><Input required value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div><Label>Daily kcal target</Label><Input type="number" value={target} onChange={(e) => setTarget(e.target.value)} /></div>
          <div className="md:col-span-3"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div className="md:col-span-3"><Button type="submit">Save plan</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
