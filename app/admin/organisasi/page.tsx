"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import { createOrganization, deleteOrganization } from "@/app/actions/organization";
import { OrganisasiTable, OrgItem } from "./_components/OrganisasiTable";
import { StrukturalCards } from "./_components/StrukturalCards";
import { TambahKomunitasModal } from "./_components/TambahKomunitas";
import { HapusKomunitasModal } from "./_components/HapusKomunitas";

export default function AdminOrganisasiPage() {
  const [organizations, setOrganizations] = useState<OrgItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteOrg, setDeleteOrg] = useState<OrgItem | null>(null);

  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  function triggerAlert(type: "success" | "error", message: string) {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 4000);
  }

  async function loadData() {
    try {
      const res = await fetch("/api/organization", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setOrganizations(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await createOrganization(formData);
      if (res.success) {
        triggerAlert("success", res.message);
        setIsAddOpen(false);
        form.reset();
        await loadData();
      } else {
        triggerAlert("error", res.message);
      }
    });
  }

  async function handleDeleteSubmit() {
    if (!deleteOrg) return;

    startTransition(async () => {
      const res = await deleteOrganization(deleteOrg.id);
      if (res.success) {
        triggerAlert("success", res.message);
        setDeleteOrg(null);
        await loadData();
      } else {
        triggerAlert("error", res.message);
      }
    });
  }

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-10 relative">
      {/* Toast Alert Pop-up */}
      {alert.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-semibold text-white animate-in slide-in-from-top duration-300 ${
            alert.type === "success" ? "bg-emerald-700" : "bg-red-600"
          }`}
        >
          {alert.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Header Info & Tombol Aksi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Dashboard Utama
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Kelola Organisasi & Komunitas
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Kelola profil kelompok, agenda kegiatan, dan susunan kepengurusan Desa Banaran.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-xl shadow-sm transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tambah Komunitas Baru
        </button>
      </div>

      {/* 1. Komponen Tabel Organisasi */}
      <OrganisasiTable
        organizations={organizations}
        loading={loading}
        onDeleteClick={(org) => setDeleteOrg(org)}
      />

      {/* 2. Komponen Kartu Struktural */}
      <StrukturalCards organizations={organizations} />

      {/* 3. Pop-up Tambah Komunitas */}
      <TambahKomunitasModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddSubmit}
        isPending={isPending}
      />

      {/* 4. Pop-up Konfirmasi Hapus */}
      <HapusKomunitasModal
        org={deleteOrg}
        onClose={() => setDeleteOrg(null)}
        onConfirm={handleDeleteSubmit}
        isPending={isPending}
      />
    </div>
  );
}