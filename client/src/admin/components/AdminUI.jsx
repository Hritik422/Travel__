import { useState } from "react";
import { Search, Plus, Pencil, Trash2, X, ChevronLeft, ChevronRight, Loader2, AlertTriangle } from "lucide-react";

// ─── Search + Add bar ─────────────────────────────────────────────────────────
export function TableToolbar({ title, count, searchValue, onSearch, onAdd, addLabel = "Add New" }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-[#1A1208]">{title}</h1>
        {count !== undefined && <p className="text-sm text-[#7A6A56] mt-0.5">{count} total records</p>}
      </div>
      <div className="flex items-center gap-3">
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B5A898]" />
            <input value={searchValue} onChange={(e) => onSearch(e.target.value)}
              placeholder="Search…"
              className="pl-9 pr-4 py-2.5 border border-[#EDE5D8] rounded-xl text-sm text-[#1A1208] outline-none focus:border-[#C09854] transition-colors bg-white w-52"
            />
          </div>
        )}
        {onAdd && (
          <button onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C09854] hover:bg-[#a8803e] text-white text-sm font-bold rounded-xl transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Data table ───────────────────────────────────────────────────────────────
export function DataTable({ columns, rows, loading, onEdit, onDelete, page, totalPages, onPageChange }) {
  if (loading) return (
    <div className="flex items-center justify-center py-24 bg-white rounded-2xl border border-[#EDE5D8]">
      <Loader2 className="w-7 h-7 text-[#C09854] animate-spin" />
    </div>
  );

  if (!rows.length) return (
    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-[#EDE5D8]">
      <p className="text-4xl mb-3">📭</p>
      <p className="text-[#7A6A56] font-medium">No records found</p>
    </div>
  );

  return (
    <div>
      <div className="bg-white rounded-2xl border border-[#EDE5D8] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FDFAF5] border-b border-[#EDE5D8]">
                {columns.map((col) => (
                  <th key={col.key} className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#B5A898] whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                <th className="px-5 py-3.5 text-right text-[10px] font-bold uppercase tracking-[0.15em] text-[#B5A898]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4EFE6]">
              {rows.map((row, i) => (
                <tr key={row._id || i} className="hover:bg-[#FDFAF5] transition-colors group">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 text-[#3D2E18] max-w-[220px]">
                      {col.render ? col.render(row[col.key], row) : (
                        <span className="truncate block">{String(row[col.key] ?? "—")}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      {onEdit && (
                        <button onClick={() => onEdit(row)}
                          className="p-2 rounded-lg hover:bg-[#F4EFE6] text-[#7A6A56] hover:text-[#C09854] transition-colors"
                          title="Edit"
                        ><Pencil className="w-4 h-4" /></button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)}
                          className="p-2 rounded-lg hover:bg-red-50 text-[#7A6A56] hover:text-red-500 transition-colors"
                          title="Delete"
                        ><Trash2 className="w-4 h-4" /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-xs text-[#B5A898]">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => onPageChange(page - 1)}
              className="p-2 rounded-xl border border-[#EDE5D8] disabled:opacity-40 hover:border-[#C09854] transition-colors"
            ><ChevronLeft className="w-4 h-4" /></button>
            <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}
              className="p-2 rounded-xl border border-[#EDE5D8] disabled:opacity-40 hover:border-[#C09854] transition-colors"
            ><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ title, open, onClose, children, size = "md" }) {
  if (!open) return null;
  const sizeClass = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" }[size] || "max-w-xl";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClass} max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#EDE5D8] shrink-0">
          <h3 className="font-bold text-[#1A1208] text-lg">{title}</h3>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F4EFE6] text-[#7A6A56] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-7 py-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Confirm delete dialog ────────────────────────────────────────────────────
export function ConfirmDelete({ open, onClose, onConfirm, loading, itemName }) {
  return (
    <Modal title="Confirm Delete" open={open} onClose={onClose} size="sm">
      <div className="text-center py-4">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>
        <p className="text-[#1A1208] font-semibold mb-2">Delete this record?</p>
        {itemName && <p className="text-[#7A6A56] text-sm mb-6">"{itemName}" will be permanently removed.</p>}
        <div className="flex gap-3 justify-center">
          <button onClick={onClose}
            className="px-6 py-2.5 border border-[#EDE5D8] rounded-xl text-sm font-semibold text-[#3D2E18] hover:bg-[#F4EFE6] transition-colors"
          >Cancel</button>
          <button onClick={onConfirm} disabled={loading}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────
export function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#7A6A56] mb-2">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-[#B5A898] text-xs mt-1.5">{hint}</p>}
    </div>
  );
}

export const inputCls = "w-full px-4 py-2.5 border border-[#EDE5D8] rounded-xl text-sm text-[#1A1208] outline-none focus:border-[#C09854] transition-colors bg-white";
export const textareaCls = `${inputCls} resize-none`;

// ─── Image preview field ──────────────────────────────────────────────────────
export function ImageField({ label, value, onChange }) {
  return (
    <Field label={label}>
      <input type="url" value={value || ""} onChange={(e) => onChange(e.target.value)}
        placeholder="https://images.unsplash.com/…"
        className={inputCls}
      />
      {value && (
        <img src={value} alt="preview" className="mt-2.5 h-28 w-full object-cover rounded-xl border border-[#EDE5D8]" onError={(e) => e.target.style.display = "none"} />
      )}
    </Field>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
export function StatCard({ label, value, icon: Icon, color = "#C09854", sub }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EDE5D8] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <p className="text-3xl font-bold text-[#1A1208] mb-1">{value ?? "—"}</p>
      <p className="text-sm text-[#7A6A56] font-medium">{label}</p>
      {sub && <p className="text-xs text-[#B5A898] mt-1">{sub}</p>}
    </div>
  );
}
