import { useState, useEffect } from "react";
import { adminService } from "../services/adminApi";
import { TableToolbar, DataTable, Modal, ConfirmDelete, Field, ImageField, inputCls } from "../components/AdminUI";
import { toast } from "react-toastify";

const EMPTY = { name: "", location: "", category: "", description: "", image: "", priority: "1" };
const CATEGORIES = ["Honeymoon", "Family", "Adventure", "Luxury", "Budget", "Cultural"];

function DestForm({ data, onChange }) {
  const set = (k) => (e) => onChange({ ...data, [k]: e.target.value });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Name" required>
        <input value={data.name} onChange={set("name")} className={inputCls} placeholder="e.g. Bali" />
      </Field>
      <Field label="Location" required>
        <input value={data.location} onChange={set("location")} className={inputCls} placeholder="e.g. Indonesia" />
      </Field>
      <Field label="Category">
        <select value={data.category} onChange={set("category")} className={inputCls}>
          <option value="">Select category</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Priority" hint="Lower = shown first">
        <input type="number" value={data.priority} onChange={set("priority")} className={inputCls} min="1" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Description">
          <textarea value={data.description} onChange={set("description")} className={inputCls + " resize-none"} rows={3} placeholder="Short description…" />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <ImageField label="Image URL" value={data.image} onChange={(v) => onChange({ ...data, image: v })} />
      </div>
    </div>
  );
}

const COLUMNS = [
  { key: "image", label: "Image", render: (v) => v ? <img src={v} alt="" className="w-12 h-12 object-cover rounded-lg border border-[#EDE5D8]" onError={e=>e.target.style.display="none"} /> : <div className="w-12 h-12 rounded-lg bg-[#EDE5D8]" /> },
  { key: "name",     label: "Name",     render: (v) => <span className="font-semibold text-[#1A1208]">{v}</span> },
  { key: "location", label: "Location" },
  { key: "category", label: "Category", render: (v) => v ? <span className="px-2.5 py-1 bg-[#F4EFE6] text-[#8B6834] text-xs font-semibold rounded-full">{v}</span> : "—" },
  { key: "priority", label: "Priority" },
];

const PER = 10;

export default function AdminDestinations() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [page, setPage]         = useState(1);
  const [modal, setModal]       = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [delTarget, setDelTarget] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    adminService.getDestinations()
      .then(r => setItems(r.items || []))
      .catch(() => toast.error("Failed to load destinations"))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const filtered = items.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.location?.toLowerCase().includes(search.toLowerCase()) ||
    d.category?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PER);
  const rows = filtered.slice((page - 1) * PER, page * PER);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit   = (row) => { setEditing(row); setForm({ ...EMPTY, ...row }); setModal(true); };

  const handleSave = async () => {
    if (!form.name || !form.location) return toast.error("Name and location are required");
    setSaving(true);
    try {
      if (editing) await adminService.updateDestination(editing._id, form);
      else         await adminService.createDestination(form);
      toast.success(editing ? "Updated!" : "Created!");
      setModal(false); load();
    } catch (e) {
      toast.error(e.message || "Save failed");
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await adminService.deleteDestination(delTarget._id);
      toast.success("Deleted"); setDelTarget(null); load();
    } catch (e) {
      toast.error(e.message || "Delete failed");
    } finally { setDeleting(false); }
  };

  return (
    <div>
      <TableToolbar title="Destinations" count={items.length} searchValue={search} onSearch={setSearch} onAdd={openCreate} />
      <DataTable columns={COLUMNS} rows={rows} loading={loading} onEdit={openEdit} onDelete={setDelTarget}
        page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal title={editing ? "Edit Destination" : "Add Destination"} open={modal} onClose={() => setModal(false)} size="lg">
        <DestForm data={form} onChange={setForm} />
        <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#EDE5D8]">
          <button onClick={() => setModal(false)} className="px-5 py-2.5 border border-[#EDE5D8] rounded-xl text-sm font-semibold text-[#3D2E18] hover:bg-[#F4EFE6]">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-[#C09854] hover:bg-[#a8803e] text-white text-sm font-bold rounded-xl flex items-center gap-2 disabled:opacity-60">
            {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {editing ? "Save Changes" : "Create"}
          </button>
        </div>
      </Modal>

      <ConfirmDelete open={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={handleDelete}
        loading={deleting} itemName={delTarget?.name} />
    </div>
  );
}
