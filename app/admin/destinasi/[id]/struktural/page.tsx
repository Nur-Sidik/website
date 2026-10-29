"use client";

import { useState, useTransition, useEffect, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { updateOrganizationStructure } from "@/app/actions/organization";

import { PejabatIntiSection } from "./_components/PejabatIntiSection";
import { AnggotaSection } from "./_components/AnggotaSection";
import { ModalAnggota, MemberItem } from "./_components/ModalAnggota";
import { ModalViewFoto } from "./_components/ModalViewFoto";

export default function AdminEditStrukturalPage() {
  const params = useParams();
  const orgId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [orgSlug, setOrgSlug] = useState("");
  const [orgName, setOrgName] = useState("");
  const [isPending, startTransition] = useTransition();

  const [ketua, setKetua] = useState("");
  const [fotoKetua, setFotoKetua] = useState<string | null>(null);
  const [sekretaris, setSekretaris] = useState("");
  const [fotoSekretaris, setFotoSekretaris] = useState<string | null>(null);
  const [bendahara, setBendahara] = useState("");
  const [fotoBendahara, setFotoBendahara] = useState<string | null>(null);

  const [members, setMembers] = useState<MemberItem[]>([]);

  // State Modal Anggota
  const [modalAnggota, setModalAnggota] = useState<{
    open: boolean;
    item: MemberItem | null;
  }>({ open: false, item: null });

  // State Modal View Foto
  const [viewFoto, setViewFoto] = useState<{
    open: boolean;
    url: string | null;
    title: string;
  }>({ open: false, url: null, title: "" });

  // State Toast Alert
  const [alertInfo, setAlertInfo] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  function triggerAlert(type: "success" | "error", message: string) {
    setAlertInfo({ show: true, type, message });
    setTimeout(() => setAlertInfo((prev) => ({ ...prev, show: false })), 4000);
  }

  // Validasi ukuran foto sebelum upload (< 5 MB)
  function handleFileValidate(
    e: ChangeEvent<HTMLInputElement>,
    setPreview: (url: string | null) => void
  ) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
        window.alert(
          `Ukuran file "${file.name}" terlalu besar (${sizeMB} MB)!\nMaksimal ukuran foto adalah 5 MB.`
        );
        e.target.value = "";
        return;
      }
      setPreview(URL.createObjectURL(file));
    }
  }

  async function loadData() {
    try {
      const res = await fetch(`/api/organization/${orgId}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setOrgSlug(data.slug);
        setOrgName(data.name);

        let parsed: any = {};
        try {
          if (data.structureInfo) parsed = JSON.parse(data.structureInfo);
        } catch (e) {}

        setKetua(parsed.ketua || "");
        setFotoKetua(parsed.fotoKetua || null);
        setSekretaris(parsed.sekretaris || "");
        setFotoSekretaris(parsed.fotoSekretaris || null);
        setBendahara(parsed.bendahara || "");
        setFotoBendahara(parsed.fotoBendahara || null);
        setMembers(parsed.members || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [orgId]);

  // Handle Simpan / Update Anggota ke State
  function handleSaveMember(itemData: {
    id?: string;
    name: string;
    role: string;
    file: File | null;
    currentFoto: string | null;
  }) {
    let fotoUrl = itemData.currentFoto;
    if (itemData.file) {
      fotoUrl = URL.createObjectURL(itemData.file);
    }

    if (itemData.id) {
      // Update
      setMembers((prev) =>
        prev.map((m) =>
          m.id === itemData.id
            ? { ...m, name: itemData.name, role: itemData.role, foto: fotoUrl }
            : m
        )
      );
      triggerAlert("success", `Data "${itemData.name}" berhasil diubah (tekan Simpan Keseluruhan untuk permanen).`);
    } else {
      // Tambah Baru
      const newMember: MemberItem = {
        id: "mem_" + Date.now(),
        name: itemData.name,
        role: itemData.role,
        foto: fotoUrl,
      };
      setMembers((prev) => [...prev, newMember]);
      triggerAlert("success", `Anggota "${itemData.name}" berhasil ditambahkan.`);
    }
    setModalAnggota({ open: false, item: null });
  }

  // Handle Hapus Anggota
  function handleDeleteMember(id: string, name: string) {
    if (window.confirm(`Yakin ingin menghapus personel "${name}" dari susunan kepengurusan?`)) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
      triggerAlert("success", `Personel "${name}" dihapus.`);
    }
  }

  // Submit Simpan Keseluruhan Form ke Server Actions
  async function handleFinalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("membersJson", JSON.stringify(members));

    startTransition(async () => {
      const res = await updateOrganizationStructure(orgId, formData);
      if (res.success) {
        triggerAlert("success", res.message);
        await loadData();
      } else {
        triggerAlert("error", res.message);
      }
    });
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xs text-gray-500">
        Memuat data struktural...
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8 relative">
      {/* Pop-up Alert Notification */}
      {alertInfo.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-semibold text-white animate-in slide-in-from-top duration-300 ${
            alertInfo.type === "success" ? "bg-emerald-700" : "bg-red-600"
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
      <div className="flex items-center gap-3 border-b pb-5">
        <Link
          href="/admin/organisasi"
          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Personel Struktural: {orgName}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Kelola nama pejabat inti, koordinator seksi, dan anggota beserta foto profilnya.
          </p>
        </div>
      </div>

      <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-center gap-3 text-xs text-emerald-800">
        <Users className="w-5 h-5 shrink-0 text-emerald-700" />
        <span>
          Data yang disimpan akan langsung otomatis tampil pada bagan alur di halaman publik{" "}
          <b>/struktural/{orgSlug}</b>.
        </span>
      </div>

      <form onSubmit={handleFinalSubmit} className="space-y-8">
        {/* Seksi 1: Pejabat Inti */}
        <PejabatIntiSection
          ketua={ketua}
          fotoKetua={fotoKetua}
          sekretaris={sekretaris}
          fotoSekretaris={fotoSekretaris}
          bendahara={bendahara}
          fotoBendahara={fotoBendahara}
          onFileValidate={handleFileValidate}
          setPreviewKetua={setFotoKetua}
          setPreviewSekretaris={setFotoSekretaris}
          setPreviewBendahara={setFotoBendahara}
          onViewFoto={(url, title) => setViewFoto({ open: true, url, title })}
        />

        {/* Seksi 2: Seksi & Anggota */}
        <AnggotaSection
          members={members}
          onAddClick={() => setModalAnggota({ open: true, item: null })}
          onEditClick={(item) => setModalAnggota({ open: true, item })}
          onDeleteClick={handleDeleteMember}
          onViewFoto={(url, title) => setViewFoto({ open: true, url, title })}
        />

        {/* Tombol Simpan Permanen */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold rounded-xl shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Menyimpan Bagan..." : "Simpan Bagan & Seluruh Personel"}
          </button>
        </div>
      </form>

      {/* Modal Dialog Tambah / Edit Anggota */}
      <ModalAnggota
        isOpen={modalAnggota.open}
        member={modalAnggota.item}
        onClose={() => setModalAnggota({ open: false, item: null })}
        onSave={handleSaveMember}
        onViewFoto={(url, title) => setViewFoto({ open: true, url, title })}
      />

      {/* Modal View Foto Ukuran Penuh */}
      <ModalViewFoto
        isOpen={viewFoto.open}
        imageUrl={viewFoto.url}
        title={viewFoto.title}
        onClose={() => setViewFoto({ open: false, url: null, title: "" })}
      />
    </div>
  );
}