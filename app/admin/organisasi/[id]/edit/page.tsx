"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  updateOrganization,
  createOrganizationNews,
  updateOrganizationNews,
  deleteOrganizationNews,
} from "@/app/actions/organization";
import { Trash2, Edit2, X, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string | null;
  eventDate: string | Date;
  createdAt: string | Date;
}

interface OrgData {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  structureInfo: string | null;
  news: NewsItem[];
}

export default function EditOrganisasiClientPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = Number(params.id);

  const [org, setOrg] = useState<OrgData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Pop-up Notification State
  const [alertInfo, setAlertInfo] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  // Modal Edit Berita State
  const [editModal, setEditModal] = useState<{
    open: boolean;
    item: NewsItem | null;
  }>({ open: false, item: null });

  // Modal Konfirmasi Delete Berita State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    newsId: number | null;
  }>({ open: false, newsId: null });

  const currentYear = new Date().getFullYear();
  const minDateLimit = `${currentYear - 1}-01-01`;
  const maxDateLimit = `${currentYear + 1}-12-31`;

  // Helper menampilkan alert
  function triggerAlert(type: "success" | "error", message: string) {
    setAlertInfo({ show: true, type, message });
    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, show: false }));
    }, 4500);
  }

  // Load data awal dari API / Database
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/organization/${orgId}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setOrg(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [orgId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xs text-gray-500">
        Memuat data kelompok dan berita...
      </div>
    );
  }

  if (!org) {
    return (
      <div className="p-10 text-center text-sm text-gray-600">
        Data organisasi tidak ditemukan.
      </div>
    );
  }

  // Parse struktur bagan organisasi
  let parsedStructure = {
    namaStruktural: org.name,
    subjudul: org.name,
    ketua: "",
    sekretaris: "",
    bendahara: "",
  };
  try {
    if (org.structureInfo) {
      parsedStructure = { ...parsedStructure, ...JSON.parse(org.structureInfo) };
    }
  } catch (e) {
    // default
  }

  // 1. Simpan Profil & Struktural
  async function handleSaveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // susun JSON struktur
    const updatedStructure = {
      namaStruktural: formData.get("struct_nama") || org?.name,
      subjudul: formData.get("struct_subjudul") || org?.name,
      ketua: formData.get("struct_ketua") || "-",
      sekretaris: formData.get("struct_sekretaris") || "-",
      bendahara: formData.get("struct_bendahara") || "-",
    };
    formData.set("structureInfo", JSON.stringify(updatedStructure));

    startTransition(async () => {
      const res = await updateOrganization(orgId, formData);
      if (res.success) {
        triggerAlert("success", res.message);
        router.refresh();
      } else {
        triggerAlert("error", res.message);
      }
    });
  }

  // 2. Terbitkan Berita Baru
  async function handleCreateNews(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await createOrganizationNews(orgId, formData);
      if (res.success) {
        triggerAlert("success", res.message);
        form.reset();
        // Refresh state
        const ref = await fetch(`/api/organization/${orgId}`);
        const updated = await ref.json();
        setOrg(updated);
      } else {
        triggerAlert("error", res.message);
      }
    });
  }

  // 3. Update Berita yang Diedit
  async function handleUpdateNews(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editModal.item) return;

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateOrganizationNews(editModal.item!.id, orgId, formData);
      if (res.success) {
        triggerAlert("success", res.message);
        setEditModal({ open: false, item: null });
        const ref = await fetch(`/api/organization/${orgId}`);
        const updated = await ref.json();
        setOrg(updated);
      } else {
        triggerAlert("error", res.message);
      }
    });
  }

  // 4. Eksekusi Hapus Berita
  async function handleConfirmDelete() {
    if (!deleteConfirm.newsId) return;

    startTransition(async () => {
      const res = await deleteOrganizationNews(deleteConfirm.newsId!, orgId);
      if (res.success) {
        triggerAlert("success", res.message);
        setDeleteConfirm({ open: false, newsId: null });
        const ref = await fetch(`/api/organization/${orgId}`);
        const updated = await ref.json();
        setOrg(updated);
      } else {
        triggerAlert("error", res.message);
      }
    });
  }

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8 relative">
      {/* Pop-up Alert Notification */}
      {alertInfo.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-semibold text-white animate-in slide-in-from-top duration-300 ${alertInfo.type === "success" ? "bg-emerald-700" : "bg-red-600"
            }`}
        >
          {alertInfo.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{alertInfo.message}</span>
        </div>
      )}

      {/* Header Halaman */}
      <div className="flex items-center justify-between border-b pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/organisasi"
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Kelola Kelompok: {org.name}
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1 pl-8">
            Edit foto, profil, struktur pengurus, dan kelola berita kegiatan.
          </p>
        </div>
      </div>

      {/* FORM 1: Profil & Struktural */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-sm font-bold text-gray-900 border-b pb-3">
            1. Profil Kelompok & Foto Utama
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Nama Organisasi
              </label>
              <input
                type="text"
                name="name"
                defaultValue={org.name}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Foto Utama Kelompok (&lt; 5 MB)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Deskripsi Singkat
            </label>
            <textarea
              name="description"
              defaultValue={org.description}
              rows={3}
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-xl shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Menyimpan..." : "Simpan Profil Kelompok"}
          </button>
        </section>
      </form>

      {/* FORM 2: Tambah Berita Baru */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-gray-900 border-b pb-3">
          2. Tambah Berita / Kegiatan Baru
        </h2>

        <form onSubmit={handleCreateNews} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Judul Kegiatan / Berita
              </label>
              <input
                type="text"
                name="title"
                placeholder="Contoh: Monitoring Konservasi Sabuk Hijau"
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Tanggal Pelaksanaan Kegiatan
              </label>
              <input
                type="date"
                name="eventDate"
                defaultValue={new Date().toISOString().split("T")[0]}
                min={minDateLimit}
                max={maxDateLimit}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Batas rentang: {currentYear - 1} – {currentYear + 1}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Isi Lengkap Berita
            </label>
            <textarea
              name="content"
              rows={4}
              placeholder="Tuliskan laporan dan kegiatan lengkap..."
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Foto Kegiatan (&lt; 5 MB)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-semibold rounded-xl shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Menerbitkan..." : "Terbitkan Berita"}
          </button>
        </form>
      </section>

      {/* DAFTAR BERITA DENGAN EDIT & DELETE POP-UP */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 border-b pb-3 mb-4">
          3. Berita Kegiatan Terdaftar ({org.news.length})
        </h2>

        {org.news.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center italic">
            Belum ada berita yang diterbitkan.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {org.news.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <div className="relative h-14 w-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-14 w-20 rounded-xl bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400 shrink-0">
                      Tanpa Foto
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">
                      {new Date(item.eventDate || item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.content}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Tombol Buka Pop-up Edit */}
                  <button
                    type="button"
                    onClick={() => setEditModal({ open: true, item })}
                    title="Edit Berita"
                    className="p-2 text-gray-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg border border-gray-200 transition cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Tombol Buka Pop-up Hapus */}
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm({ open: true, newsId: item.id })}
                    title="Hapus Berita"
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-gray-200 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* POP-UP MODAL: EDIT BERITA */}
      {editModal.open && editModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setEditModal({ open: false, item: null })}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-gray-900">Edit Berita Kegiatan</h3>

            <form onSubmit={handleUpdateNews} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Judul Berita
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editModal.item.title}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tanggal Pelaksanaan Kegiatan
                </label>
                <input
                  type="date"
                  name="eventDate"
                  defaultValue={
                    editModal.item.eventDate
                      ? new Date(editModal.item.eventDate).toISOString().split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  min={minDateLimit}
                  max={maxDateLimit}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Rentang diizinkan: {currentYear - 1} – {currentYear + 1}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Isi Kegiatan
                </label>
                <textarea
                  name="content"
                  rows={4}
                  defaultValue={editModal.item.content}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Ganti Foto (Kosongkan bila tidak diganti)
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditModal({ open: false, item: null })}
                  className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-xl hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-xl disabled:opacity-50"
                >
                  {isPending ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POP-UP MODAL: KONFIRMASI HAPUS BERITA */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-gray-100">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900">Hapus Berita Kegiatan?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Tindakan ini permanen. File foto di cloud dan data berita ini tidak dapat dikembalikan.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm({ open: false, newsId: null })}
                className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isPending}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl disabled:opacity-50 cursor-pointer"
              >
                {isPending ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}