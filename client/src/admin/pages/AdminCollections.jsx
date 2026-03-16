// ─── Categories ──────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { adminService } from "../services/adminApi";
import { TableToolbar, DataTable, Modal, ConfirmDelete, Field, ImageField, inputCls } from "../components/AdminUI";
import { toast } from "react-toastify";

const EMPTY_CAT = { category: "", title: "", subtitle: "", image: "" };

function CatForm({ data, onChange }) {
  const set = (k) => (e) => onChange({ ...data, [k]: e.target.value });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Slug (category)" required hint="e.g. honeymoon"><input value={data.category||""} onChange={set("category")} className={inputCls} placeholder="honeymoon" /></Field>
        <Field label="Display Title" required><input value={data.title||""} onChange={set("title")} className={inputCls} placeholder="Honeymoon" /></Field>
      </div>
      <Field label="Subtitle"><input value={data.subtitle||""} onChange={set("subtitle")} className={inputCls} placeholder="Romantic escapes crafted for two" /></Field>
      <ImageField label="Image URL" value={data.image} onChange={(v) => onChange({ ...data, image: v })} />
    </div>
  );
}

export function AdminCategories() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false); const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_CAT); const [delTarget, setDelTarget] = useState(null);
  const [saving, setSaving] = useState(false); const [deleting, setDeleting] = useState(false);

  const load = () => { setLoading(true); adminService.getCategories().then(r => setItems(r.items||[])).catch(() => toast.error("Failed")).finally(() => setLoading(false)); };
  useEffect(load, []);

  const COLS = [
    { key:"image", label:"Image", render:(v)=> v ? <img src={v} alt="" className="w-12 h-10 object-cover rounded-lg border border-[#EDE5D8]" onError={e=>e.target.style.display="none"}/> : <div className="w-12 h-10 rounded-lg bg-[#EDE5D8]"/> },
    { key:"title", label:"Title", render:(v) => <span className="font-semibold">{v}</span> },
    { key:"category", label:"Slug", render:(v) => <code className="text-xs bg-[#F4EFE6] px-2 py-1 rounded text-[#8B6834]">{v}</code> },
    { key:"subtitle", label:"Subtitle" },
  ];

  const save = async () => {
    if (!form.category || !form.title) return toast.error("Slug and title required");
    setSaving(true);
    try { editing ? await adminService.updateCategory(editing._id, form) : await adminService.createCategory(form); toast.success(editing ? "Updated!" : "Created!"); setModal(false); load(); }
    catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };
  const del = async () => {
    setDeleting(true);
    try { await adminService.deleteCategory(delTarget._id); toast.success("Deleted"); setDelTarget(null); load(); }
    catch (e) { toast.error(e.message); } finally { setDeleting(false); }
  };

  return (
    <div>
      <TableToolbar title="Categories" count={items.length} onAdd={() => { setEditing(null); setForm(EMPTY_CAT); setModal(true); }} />
      <DataTable columns={COLS} rows={items} loading={loading} onEdit={(r) => { setEditing(r); setForm({...EMPTY_CAT,...r}); setModal(true); }} onDelete={setDelTarget} page={1} totalPages={1} onPageChange={()=>{}} />
      <Modal title={editing?"Edit Category":"Add Category"} open={modal} onClose={() => setModal(false)}>
        <CatForm data={form} onChange={setForm} />
        <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#EDE5D8]">
          <button onClick={() => setModal(false)} className="px-5 py-2.5 border border-[#EDE5D8] rounded-xl text-sm font-semibold text-[#3D2E18] hover:bg-[#F4EFE6]">Cancel</button>
          <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-[#C09854] hover:bg-[#a8803e] text-white text-sm font-bold rounded-xl disabled:opacity-60">{editing?"Save Changes":"Create"}</button>
        </div>
      </Modal>
      <ConfirmDelete open={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={del} loading={deleting} itemName={delTarget?.title} />
    </div>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
const EMPTY_REV = { name: "", location: "", rating: 5, quote: "", photo: "" };

function RevForm({ data, onChange }) {
  const set = (k) => (e) => onChange({ ...data, [k]: e.target.value });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" required><input value={data.name||""} onChange={set("name")} className={inputCls} /></Field>
        <Field label="Location"><input value={data.location||""} onChange={set("location")} className={inputCls} placeholder="Mumbai, India" /></Field>
      </div>
      <Field label="Rating (1–5)" required>
        <select value={data.rating||5} onChange={set("rating")} className={inputCls}>
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
        </select>
      </Field>
      <Field label="Quote / Review Text" required>
        <textarea value={data.quote||""} onChange={set("quote")} className={inputCls+" resize-none"} rows={4} placeholder="Their experience…" />
      </Field>
      <Field label="Photo URL" hint="Optional profile photo">
        <input type="url" value={data.photo||""} onChange={set("photo")} className={inputCls} placeholder="https://…" />
      </Field>
    </div>
  );
}

export function AdminReviews() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null); const [form, setForm] = useState(EMPTY_REV);
  const [delTarget, setDelTarget] = useState(null); const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = () => { setLoading(true); adminService.getReviews().then(r => setItems(r.items||[])).catch(() => toast.error("Failed")).finally(() => setLoading(false)); };
  useEffect(load, []);

  const COLS = [
    { key:"name",     label:"Name",     render:(v) => <span className="font-semibold">{v}</span> },
    { key:"location", label:"Location" },
    { key:"rating",   label:"Rating",   render:(v) => <span className="text-amber-500 font-bold">{"★".repeat(v||5)}</span> },
    { key:"quote",    label:"Quote",    render:(v) => <span className="text-[#7A6A56] italic clamp-2">"{v}"</span> },
  ];

  const filtered = items.filter(i => i.name?.toLowerCase().includes(search.toLowerCase()) || i.location?.toLowerCase().includes(search.toLowerCase()));

  const save = async () => {
    if (!form.name || !form.quote) return toast.error("Name and quote required");
    setSaving(true);
    try { editing ? await adminService.updateReview(editing._id, form) : await adminService.createReview(form); toast.success(editing?"Updated!":"Created!"); setModal(false); load(); }
    catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };
  const del = async () => {
    setDeleting(true);
    try { await adminService.deleteReview(delTarget._id); toast.success("Deleted"); setDelTarget(null); load(); }
    catch (e) { toast.error(e.message); } finally { setDeleting(false); }
  };

  return (
    <div>
      <TableToolbar title="Reviews" count={items.length} searchValue={search} onSearch={setSearch} onAdd={() => { setEditing(null); setForm(EMPTY_REV); setModal(true); }} />
      <DataTable columns={COLS} rows={filtered} loading={loading} onEdit={(r) => { setEditing(r); setForm({...EMPTY_REV,...r}); setModal(true); }} onDelete={setDelTarget} page={1} totalPages={1} onPageChange={()=>{}} />
      <Modal title={editing?"Edit Review":"Add Review"} open={modal} onClose={() => setModal(false)}>
        <RevForm data={form} onChange={setForm} />
        <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#EDE5D8]">
          <button onClick={() => setModal(false)} className="px-5 py-2.5 border border-[#EDE5D8] rounded-xl text-sm font-semibold text-[#3D2E18] hover:bg-[#F4EFE6]">Cancel</button>
          <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-[#C09854] hover:bg-[#a8803e] text-white text-sm font-bold rounded-xl disabled:opacity-60">{editing?"Save Changes":"Create"}</button>
        </div>
      </Modal>
      <ConfirmDelete open={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={del} loading={deleting} itemName={delTarget?.name} />
    </div>
  );
}

// ─── Queries ──────────────────────────────────────────────────────────────────
export function AdminQueries() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [delTarget, setDelTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const load = () => { setLoading(true); adminService.getQueries().then(r => setItems(r.items||[])).catch(() => toast.error("Failed")).finally(() => setLoading(false)); };
  useEffect(load, []);

  const filtered = items.filter(i =>
    i.name?.toLowerCase().includes(search.toLowerCase()) ||
    i.email?.toLowerCase().includes(search.toLowerCase()) ||
    i.location?.toLowerCase().includes(search.toLowerCase())
  );

  const del = async () => {
    setDeleting(true);
    try { await adminService.deleteQuery(delTarget._id); toast.success("Deleted"); setDelTarget(null); load(); }
    catch (e) { toast.error(e.message); } finally { setDeleting(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-48 text-[#7A6A56]">Loading queries…</div>;

  return (
    <div>
      <TableToolbar title="Queries / Leads" count={items.length} searchValue={search} onSearch={setSearch} />

      <div className="bg-white rounded-2xl border border-[#EDE5D8] overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#B5A898]">No queries found.</div>
        ) : (
          <div className="divide-y divide-[#F4EFE6]">
            {filtered.map((q) => (
              <div key={q._id} className="px-6 py-5 hover:bg-[#FDFAF5] transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C09854] to-[#8B6834] flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {q.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <span className="font-bold text-[#1A1208]">{q.name}</span>
                        <span className="text-xs text-[#7A6A56]">{q.email}</span>
                        {q.contact && <span className="text-xs text-[#7A6A56]">{q.contact}</span>}
                      </div>
                      {q.location && <p className="text-sm text-[#7A6A56]">📍 {q.location}</p>}
                      {q.message && (
                        <p className={`text-sm text-[#3D2E18] mt-1 ${expanded === q._id ? "" : "line-clamp-2"}`}>{q.message}</p>
                      )}
                      {q.message?.length > 120 && (
                        <button onClick={() => setExpanded(expanded === q._id ? null : q._id)}
                          className="text-xs text-[#C09854] font-semibold mt-1 hover:underline"
                        >{expanded === q._id ? "Show less" : "Read more"}</button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-[#B5A898]">
                      {q.createdAt ? new Date(q.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "—"}
                    </span>
                    <button onClick={() => setDelTarget(q)}
                      className="p-2 rounded-lg hover:bg-red-50 text-[#B5A898] hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDelete open={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={del} loading={deleting} itemName={delTarget?.name} />
    </div>
  );
}
