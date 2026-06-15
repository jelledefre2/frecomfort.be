import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { RefreshCw, Trash2, ArrowLeft, Loader2, Mail, Phone, MapPin } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_pro-services-202/artifacts/yjp8gm24_LOGO_FRE_BV_web%20PNG%20GOOGLE%20LOGO.png";
import { api } from "@/lib/api";

const STATUSES = ["new", "contacted", "scheduled", "won", "lost"];
const SERVICE_LABEL = {
  rolluiken: "Somfy Solar Rolluiken",
  zonwering: "Somfy Solar Screens",
  airco: "Airco (Daikin)",
  automatisering: "Automatisering / TaHoma",
  other: "Iets anders",
};

export default function Admin() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, won: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        api.get("/leads"),
        api.get("/stats"),
      ]);
      setLeads(leadsRes.data);
      setStats(statsRes.data);
    } catch {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/leads/${id}`, { status });
      setLeads((prev) => prev.map((l) => (l.id === id ? data : l)));
      toast.success(`Marked ${status}`);
      const s = await api.get("/stats");
      setStats(s.data);
    } catch {
      toast.error("Could not update status");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this lead permanently?")) return;
    try {
      await api.delete(`/leads/${id}`);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Lead deleted");
      const s = await api.get("/stats");
      setStats(s.data);
    } catch {
      toast.error("Delete failed");
    }
  };

  const visible = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  return (
    <main data-testid="admin-page" className="min-h-screen bg-[#0A0B0E] text-white">
      <header className="border-b border-white/5 bg-black/40 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" data-testid="admin-back" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-mono-tech text-xs tracking-[0.18em] uppercase">Back</span>
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <img src={LOGO_URL} alt="FRE BV" className="h-7 w-7 object-contain" />
              <span className="font-display font-bold tracking-tight">FRE BV · Control Room</span>
            </div>
          </div>
          <button
            onClick={load}
            data-testid="admin-refresh"
            className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-[0.18em] uppercase text-zinc-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </header>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
          Leads <span className="text-[#FFD60A]">·</span> {stats.total}
        </h1>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {[
            { k: "total", label: "Total" },
            { k: "new", label: "New" },
            { k: "contacted", label: "Contacted" },
            { k: "won", label: "Won" },
          ].map((s) => (
            <div key={s.k} data-testid={`stat-${s.k}`} className="bg-[#0A0B0E] p-6">
              <div className="text-overline">{s.label}</div>
              <div className="mt-2 font-display text-3xl font-extrabold">{stats[s.k] ?? 0}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              data-testid={`admin-filter-${s}`}
              className={`font-mono-tech text-xs tracking-[0.18em] uppercase px-4 py-2.5 border transition-colors ${
                filter === s
                  ? "bg-[#FFD60A] text-black border-[#FFD60A]"
                  : "border-white/15 text-zinc-400 hover:border-white/50 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-zinc-500">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : visible.length === 0 ? (
            <div data-testid="admin-empty" className="border border-white/5 p-12 text-center">
              <div className="text-overline">No leads</div>
              <p className="mt-3 text-zinc-400">
                Nothing here yet. Submitted requests will appear automatically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5">
              {visible.map((l) => (
                <article
                  key={l.id}
                  data-testid={`lead-${l.id}`}
                  className="bg-[#0A0B0E] p-6 lg:p-8 flex flex-col gap-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-overline text-[#FFD60A]">
                        {SERVICE_LABEL[l.service_type] || l.service_type}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{l.name}</h3>
                      <div className="text-xs font-mono-tech tracking-wider text-zinc-500 mt-1">
                        {new Date(l.created_at).toLocaleString()}
                      </div>
                    </div>
                    <StatusBadge status={l.status} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <a href={`mailto:${l.email}`} className="flex items-center gap-2 text-zinc-300 hover:text-[#FFD60A]">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" /> {l.email}
                    </a>
                    <a href={`tel:${l.phone}`} className="flex items-center gap-2 text-zinc-300 hover:text-[#FFD60A]">
                      <Phone className="w-3.5 h-3.5 text-zinc-500" /> {l.phone}
                    </a>
                    {l.address && (
                      <div className="flex items-center gap-2 text-zinc-300">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" /> {l.address}
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed border-l-2 border-[#FFD60A]/40 pl-4">
                    {l.message}
                  </p>

                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2 justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(l.id, s)}
                          data-testid={`lead-status-${s}-${l.id}`}
                          disabled={l.status === s}
                          className={`font-mono-tech text-[10px] tracking-[0.18em] uppercase px-2.5 py-1.5 border transition-colors ${
                            l.status === s
                              ? "bg-white text-black border-white"
                              : "border-white/10 text-zinc-500 hover:border-white/40 hover:text-white"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => remove(l.id)}
                      data-testid={`lead-delete-${l.id}`}
                      className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-red-400 transition-colors p-1.5"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatusBadge({ status }) {
  const map = {
    new: "border-[#FFD60A]/50 text-[#FFD60A] bg-[#FFD60A]/5",
    contacted: "border-blue-400/40 text-blue-300 bg-blue-500/5",
    scheduled: "border-purple-400/40 text-purple-300 bg-purple-500/5",
    won: "border-green-400/40 text-green-300 bg-green-500/5",
    lost: "border-white/15 text-zinc-500 bg-white/5",
  };
  return (
    <span className={`font-mono-tech text-[10px] tracking-[0.2em] uppercase px-2 py-1 border ${map[status] || ""}`}>
      {status}
    </span>
  );
}
