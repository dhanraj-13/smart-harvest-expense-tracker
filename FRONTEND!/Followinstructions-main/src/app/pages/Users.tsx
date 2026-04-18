import { useState } from "react";
import { Plus, Edit2, Trash2, X, Phone, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const SH = {
  green: "#2F6B3B",
  paddy: "#7BAE58",
  turmeric: "#D9A441",
  terracotta: "#B85C38",
  soil: "#6B4F3A",
  bg: "#F7F3EA",
  surface: "#FFFDF8",
  text: "#1F2933",
  muted: "#667085",
  border: "#D9D2C3",
};

type AppUser = { id: number; name: string; role: string; phone: string; district: string; active: boolean; joined: string };

const roles = ["Admin", "Farm Manager", "Farmer", "Advisor", "Viewer"];

const initUsers: AppUser[] = [
  { id: 1, name: "Rajkumar M.", role: "Admin", phone: "+91 98401 23456", district: "Thanjavur", active: true, joined: "Jan 2024" },
  { id: 2, name: "Kavitha Devi", role: "Farm Manager", phone: "+91 87654 32109", district: "Thanjavur", active: true, joined: "Feb 2024" },
  { id: 3, name: "Arumugam S.", role: "Advisor", phone: "+91 94459 87654", district: "Madurai", active: true, joined: "Mar 2024" },
  { id: 4, name: "Selvan R.", role: "Farmer", phone: "+91 73893 21098", district: "Thanjavur", active: true, joined: "Apr 2024" },
  { id: 5, name: "Meena T.", role: "Viewer", phone: "+91 81234 56789", district: "Coimbatore", active: false, joined: "Jun 2024" },
];

const roleColors: Record<string, string> = { Admin: "#B85C38", "Farm Manager": "#6B4F3A", Farmer: "#7BAE58", Advisor: "#D9A441", Viewer: "#667085" };

function UserModal({ onClose, onSave, initial }: { onClose: () => void; onSave: (u: Omit<AppUser, "id">) => void; initial?: AppUser }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: initial?.name ?? "", role: initial?.role ?? "Farmer", phone: initial?.phone ?? "",
    district: initial?.district ?? "", active: initial?.active ?? true,
    joined: initial?.joined ?? new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: SH.text }}>
            {initial ? t("pages.users.editUser") : t("pages.users.addUser")}
          </h3>
          <button onClick={onClose}><X size={18} color={SH.muted} /></button>
        </div>
        <div className="flex flex-col gap-3.5">
          {[
            { label: t("pages.users.fullName"), key: "name", placeholder: "e.g. Rajkumar M." },
            { label: t("pages.users.phoneNumber"), key: "phone", placeholder: "+91 98401 23456" },
            { label: t("pages.users.district"), key: "district", placeholder: "e.g. Thanjavur" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block mb-1.5" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>{f.label}</label>
              <input value={(form as any)[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full px-3.5 py-2.5 rounded-lg outline-none" style={{ border: `1.5px solid ${SH.border}`, fontSize: "13px", color: SH.text, backgroundColor: "white" }} />
            </div>
          ))}
          <div>
            <label className="block mb-1.5" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>{t("pages.users.role")}</label>
            <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-lg outline-none appearance-none" style={{ border: `1.5px solid ${SH.border}`, fontSize: "13px", color: SH.text, backgroundColor: "white" }}>
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setForm((p) => ({ ...p, active: !p.active }))} className="w-11 h-6 rounded-full transition-all relative" style={{ backgroundColor: form.active ? SH.paddy : SH.border }}>
              <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" style={{ left: form.active ? "calc(100% - 20px)" : "4px" }} />
            </button>
            <span style={{ fontSize: "13px", color: SH.text }}>{form.active ? t("common.active") : t("common.inactive")}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl" style={{ border: `1.5px solid ${SH.border}`, color: SH.muted, fontSize: "13px" }}>{t("common.cancel")}</button>
          <button onClick={() => { if (!form.name) return; onSave(form); onClose(); }} className="flex-1 py-2.5 rounded-xl text-white" style={{ backgroundColor: SH.green, fontSize: "13px", fontWeight: 600 }}>
            {initial ? t("common.save") : t("pages.users.addUser")}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState(initUsers);
  const [modal, setModal] = useState<null | "add" | AppUser>(null);

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      {modal && (
        <UserModal
          onClose={() => setModal(null)}
          onSave={(data) => { if (modal === "add") { setUsers((p) => [...p, { ...data, id: Date.now() }]); } else { setUsers((p) => p.map((u) => u.id === (modal as AppUser).id ? { ...data, id: u.id } : u)); } }}
          initial={modal !== "add" ? (modal as AppUser) : undefined}
        />
      )}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: SH.text }}>{t("pages.users.title")}</h1>
            <p style={{ color: SH.muted, fontSize: "14px", marginTop: "4px" }}>{t("pages.users.subtitle")}</p>
          </div>
          <button onClick={() => setModal("add")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white" style={{ backgroundColor: SH.green, fontSize: "13px" }}>
            <Plus size={15} />
            {t("pages.users.addUser")}
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: t("pages.users.totalUsers"), value: users.length },
            { label: t("pages.users.active"), value: users.filter((u) => u.active).length },
            { label: t("pages.users.roles"), value: new Set(users.map((u) => u.role)).size },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-2xl text-center" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: SH.text }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: SH.muted }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
          <div className="hidden md:grid px-5 py-3" style={{ gridTemplateColumns: "1fr 140px 160px 120px 80px 80px", borderBottom: `1px solid ${SH.border}`, backgroundColor: SH.bg }}>
            {[t("pages.users.name"), t("pages.users.role"), t("pages.users.phone"), t("pages.users.district"), t("pages.users.status"), ""].map((h) => (
              <div key={h} style={{ fontSize: "11px", fontWeight: 600, color: SH.muted, letterSpacing: "0.04em" }}>{h}</div>
            ))}
          </div>
          {users.map((user, i) => (
            <div key={user.id} className="flex flex-col md:grid items-center px-5 py-4 gap-3 transition-all hover:bg-amber-50/30" style={{ gridTemplateColumns: "1fr 140px 160px 120px 80px 80px", borderBottom: i < users.length - 1 ? `1px solid ${SH.border}` : "none" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: SH.green, fontSize: "14px", fontWeight: 600 }}>{user.name[0]}</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: SH.text }}>{user.name}</div>
                  <div style={{ fontSize: "11px", color: SH.muted }}>{t("pages.users.joined")} {user.joined}</div>
                </div>
              </div>
              <div><span className="px-2 py-1 rounded-full" style={{ backgroundColor: `${roleColors[user.role] ?? SH.muted}18`, color: roleColors[user.role] ?? SH.muted, fontSize: "11px", fontWeight: 600 }}>{user.role}</span></div>
              <div className="flex items-center gap-1.5" style={{ fontSize: "13px", color: SH.muted }}><Phone size={13} />{user.phone}</div>
              <div style={{ fontSize: "13px", color: SH.muted }}>{user.district}</div>
              <div><span className="px-2.5 py-1 rounded-full" style={{ backgroundColor: user.active ? `${SH.paddy}20` : `${SH.muted}18`, color: user.active ? SH.green : SH.muted, fontSize: "11px", fontWeight: 600 }}>{user.active ? t("common.active") : t("common.inactive")}</span></div>
              <div className="flex gap-2">
                <button onClick={() => setModal(user)} className="p-1.5 rounded-lg hover:bg-gray-100"><Edit2 size={14} color={SH.muted} /></button>
                <button onClick={() => setUsers((p) => p.filter((u) => u.id !== user.id))} className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 size={14} color={SH.terracotta} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
