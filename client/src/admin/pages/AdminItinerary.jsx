import { useState, useEffect } from "react";
import { adminService } from "../services/adminApi";
import { TableToolbar, DataTable, Modal, ConfirmDelete, Field, ImageField, inputCls } from "../components/AdminUI";
import { toast } from "react-toastify";
import { Plus, Trash2 } from "lucide-react";

const EMPTY_ITN = {
  destinationId: "", title: "", mainHeading: "", displayTagline: "Welcome To",
  backgroundUrl: "", descriptionHeading: "", descriptionContent: "",
  services: { luxury: "", Duration: "", includes: "", experience: "" },
  days: [],
};

const EMPTY_DAY = { day: 1, subtitle: "", title: "", image: "", highlight: "", description: "", details: [] };
const EMPTY_DETAIL = { time: "", activity: "" };

function DayEditor({ day, index, onChange, onRemove }) {
  const set = (k) => (e) => onChange({ ...day, [k]: e.target.value });
  const setDetail = (i, k, v) => {
    const ds = [...(day.details || [])];
    ds[i] = { ...ds[i], [k]: v };
    onChange({ ...day, details: ds });
  };
  const addDetail    = () => onChange({ ...day, details: [...(day.details||[]), { ...EMPTY_DETAIL }] });
  const removeDetail = (i) => onChange({ ...day, details: day.details.filter((_, idx) => idx !== i) });

  return (
    <div className="border border-[#EDE5D8] rounded-xl p-5 space-y-4 bg-[#FDFAF5]">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-sm text-[#1A1208]">Day {index + 1}</h4>
        <button onClick={onRemove} className="p-1.5 hover:bg-red-50 text-[#B5A898] hover:text-red-500 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Day #"><input type="number" value={day.day} onChange={set("day")} className={inputCls} min="1" /></Field>
        <Field label="Subtitle"><input value={day.subtitle||""} onChange={set("subtitle")} className={inputCls} placeholder="e.g. The Arrival" /></Field>
        <div className="col-span-2"><Field label="Title"><input value={day.title||""} onChange={set("title")} className={inputCls} placeholder="e.g. Sunset Over the Caldera" /></Field></div>
        <div className="col-span-2"><Field label="Highlight"><input value={day.highlight||""} onChange={set("highlight")} className={inputCls} placeholder="e.g. Cliffside Welcome & Dinner" /></Field></div>
        <div className="col-span-2"><Field label="Image URL"><input type="url" value={day.image||""} onChange={set("image")} className={inputCls} placeholder="https://…" /></Field></div>
        <div className="col-span-2"><Field label="Description"><textarea value={day.description||""} onChange={set("description")} className={inputCls+" resize-none"} rows={2} /></Field></div>
      </div>

      {/* Details */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-[#7A6A56] uppercase tracking-[0.15em]">Timed Details</p>
          <button onClick={addDetail} className="flex items-center gap-1 text-xs text-[#C09854] font-semibold hover:underline">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {(day.details||[]).map((d, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={d.time} onChange={(e) => setDetail(i,"time",e.target.value)} className={inputCls+" w-24 shrink-0"} placeholder="14:00" />
              <input value={d.activity} onChange={(e) => setDetail(i,"activity",e.target.value)} className={inputCls+" flex-1"} placeholder="Activity description" />
              <button onClick={() => removeDetail(i)} className="text-[#B5A898] hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItnForm({ data, onChange }) {
  const set   = (k)    => (e) => onChange({ ...data, [k]: e.target.value });
  const setSvc = (k)   => (e) => onChange({ ...data, services: { ...data.services, [k]: e.target.value } });
  const addDay    = ()        => onChange({ ...data, days: [...(data.days||[]), { ...EMPTY_DAY, day: (data.days||[]).length + 1 }] });
  const updateDay = (i, day)  => { const ds = [...(data.days||[])]; ds[i] = day; onChange({ ...data, days: ds }); };
  const removeDay = (i)       => onChange({ ...data, days: data.days.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-6">
      {/* IDs */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Destination ID" required hint="The _id of the destination document">
          <input value={data.destinationId||""} onChange={set("destinationId")} className={inputCls} placeholder="691f3b85fa830f…" />
        </Field>
        <Field label="Title">
          <input value={data.title||""} onChange={set("title")} className={inputCls} placeholder="e.g. Santorini 3-Day Itinerary" />
        </Field>
      </div>

      {/* Hero */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Display Tagline"><input value={data.displayTagline||""} onChange={set("displayTagline")} className={inputCls} placeholder="Welcome To" /></Field>
        <Field label="Main Heading"><input value={data.mainHeading||""} onChange={set("mainHeading")} className={inputCls} placeholder="Santorini" /></Field>
      </div>
      <ImageField label="Background Image URL" value={data.backgroundUrl} onChange={(v) => onChange({ ...data, backgroundUrl: v })} />

      {/* Description */}
      <Field label="Description Heading"><input value={data.descriptionHeading||""} onChange={set("descriptionHeading")} className={inputCls} /></Field>
      <Field label="Description Content"><textarea value={data.descriptionContent||""} onChange={set("descriptionContent")} className={inputCls+" resize-none"} rows={3} /></Field>

      {/* Services */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#7A6A56] mb-3">Services Block</p>
        <div className="grid grid-cols-2 gap-3 p-4 bg-[#FDFAF5] rounded-xl border border-[#EDE5D8]">
          <Field label="Luxury Grade"><input value={data.services?.luxury||""} onChange={setSvc("luxury")} className={inputCls} placeholder="5 Star Premium" /></Field>
          <Field label="Duration"><input value={data.services?.Duration||""} onChange={setSvc("Duration")} className={inputCls} placeholder="4 Days/3 Nights" /></Field>
          <Field label="Includes"><input value={data.services?.includes||""} onChange={setSvc("includes")} className={inputCls} placeholder="Breakfast/Dinner" /></Field>
          <Field label="Experience"><input value={data.services?.experience||""} onChange={setSvc("experience")} className={inputCls} placeholder="Museums" /></Field>
        </div>
      </div>

      {/* Days */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#7A6A56]">Days ({(data.days||[]).length})</p>
          <button onClick={addDay} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C09854] text-white text-xs font-bold rounded-lg hover:bg-[#a8803e] transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Day
          </button>
        </div>
        <div className="space-y-4">
          {(data.days||[]).map((day, i) => (
            <DayEditor key={i} day={day} index={i} onChange={(d) => updateDay(i, d)} onRemove={() => removeDay(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

const COLUMNS = [
  { key: "title",         label: "Title",     render: (v, r) => <span className="font-semibold">{v || r.mainHeading || "—"}</span> },
  { key: "destinationId", label: "Dest ID",   render: (v) => <span className="font-mono text-xs text-[#7A6A56]">{String(v||"").slice(-8)}</span> },
  { key: "days",          label: "Days",      render: (v) => <span className="px-2 py-1 bg-[#F4EFE6] text-[#8B6834] text-xs font-bold rounded-full">{Array.isArray(v) ? v.length : 0} days</span> },
];

export default function AdminItinerary() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY_ITN);
  const [delTarget, setDelTarget] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    adminService.getItineraries()
      .then(r => setItems(r.items || []))
      .catch(() => toast.error("Failed to load itineraries"))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openCreate = () => { setEditing(null); setForm({ ...EMPTY_ITN, services: { luxury:"", Duration:"", includes:"", experience:"" }, days:[] }); setModal(true); };
  const openEdit   = (row) => { setEditing(row); setForm({ ...EMPTY_ITN, ...row, services: { ...(row.services || {}) } }); setModal(true); };

  const handleSave = async () => {
    if (!form.destinationId) return toast.error("Destination ID is required");
    setSaving(true);
    try {
      if (editing) await adminService.updateItinerary(editing._id, form);
      else         await adminService.createItinerary(form);
      toast.success(editing ? "Updated!" : "Created!");
      setModal(false); load();
    } catch (e) { toast.error(e.message || "Save failed"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await adminService.deleteItinerary(delTarget._id); toast.success("Deleted"); setDelTarget(null); load(); }
    catch (e) { toast.error(e.message || "Delete failed"); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <TableToolbar title="Itineraries" count={items.length} onAdd={openCreate} />
      <DataTable columns={COLUMNS} rows={items} loading={loading} onEdit={openEdit} onDelete={setDelTarget} page={1} totalPages={1} onPageChange={() => {}} />

      <Modal title={editing ? "Edit Itinerary" : "Add Itinerary"} open={modal} onClose={() => setModal(false)} size="xl">
        <ItnForm data={form} onChange={setForm} />
        <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#EDE5D8]">
          <button onClick={() => setModal(false)} className="px-5 py-2.5 border border-[#EDE5D8] rounded-xl text-sm font-semibold text-[#3D2E18] hover:bg-[#F4EFE6]">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-[#C09854] hover:bg-[#a8803e] text-white text-sm font-bold rounded-xl flex items-center gap-2 disabled:opacity-60">
            {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {editing ? "Save Changes" : "Create"}
          </button>
        </div>
      </Modal>

      <ConfirmDelete open={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={handleDelete}
        loading={deleting} itemName={delTarget?.title || delTarget?.mainHeading} />
    </div>
  );
}
