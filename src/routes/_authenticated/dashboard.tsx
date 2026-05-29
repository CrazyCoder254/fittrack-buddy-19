import { createFileRoute } from "@tanstack/react-router";
import { useAuth, highestRole } from "@/lib/auth";
import { MemberDashboard } from "@/components/dashboard/MemberDashboard";
import { TrainerDashboard } from "@/components/dashboard/TrainerDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — FORGE/FIT" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { roles, loading } = useAuth();
  if (loading) return <div className="p-12 text-muted-foreground">Loading…</div>;
  const role = highestRole(roles);
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {role === "admin" && <AdminDashboard />}
      {role === "trainer" && <TrainerDashboard />}
      {role === "member" && <MemberDashboard />}
    </div>
  );
}
