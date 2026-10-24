"use client";

import { useState, useTransition } from "react";
import { createAdmin, deleteAdmin } from "@/app/actions/manageAdmin";

interface AdminUser {
  id: number;
  name: string;
  username: string;
  created_at: Date;
}

export function AdminManagement({
  admins,
  currentAdminId,
}: {
  admins: AdminUser[];
  currentAdminId: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  const isFull = admins.length >= 3;

  async function handleAddAdmin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await createAdmin(formData);
      if (res.success) {
        form.reset();
        setIsOpen(false);
        alert(res.message);
      } else {
        setMessage({ text: res.message, isError: true });
      }
    });
  }

  function handleDelete(id: number, username: string) {
    const confirmDelete = window.confirm(`Yakin ingin menghapus akun admin "${username}"?`);
    if (!confirmDelete) return;

    startTransition(async () => {
      const res = await deleteAdmin(id);
      alert(res.message);
    });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">Kelola Pengguna Admin</h2>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                isFull
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {admins.length} / 3 Akun
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Maksimal 3 pengelola yang memiliki akses ke dashboard ini.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setMessage(null);
            setIsOpen(true);
          }}
          disabled={isFull}
          className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#2D6A4F] rounded-lg shadow-sm transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        >
          + Tambah Admin Baru
        </button>
      </div>

      {/* Tabel Akun Admin */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase text-[11px] font-semibold border-y border-gray-100">
            <tr>
              <th className="py-3 px-4">Nama Lengkap</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Terdaftar</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {admins.map((adm) => {
              const isSelf = adm.id === currentAdminId;
              return (
                <tr key={adm.id} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
                    {adm.name}
                    {isSelf && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                        Anda
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs">{adm.username}</td>
                  <td className="py-3 px-4 text-xs text-gray-400">
                    {new Date(adm.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(adm.id, adm.username)}
                      disabled={isSelf || admins.length <= 1 || isPending}
                      title={
                        isSelf
                          ? "Tidak bisa menghapus akun yang sedang dipakai"
                          : admins.length <= 1
                          ? "Minimal harus tersisa 1 admin"
                          : "Hapus akun ini"
                      }
                      className="text-xs font-medium text-red-600 hover:text-red-800 disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Admin */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Tambah Akun Admin</h3>
            <p className="text-xs text-gray-500 mb-4">
              Akun baru akan mendapatkan hak akses penuh ke panel pengelola.
            </p>

            {message && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs font-medium">
                {message.text}
              </div>
            )}

            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Contoh: Pengelola Pokdarwis"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Contoh: admin_pokdarwis"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? "Tutup" : "Lihat"}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#2D6A4F] rounded-lg transition disabled:bg-gray-400 cursor-pointer"
                >
                  {isPending ? "Menyimpan..." : "Simpan Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}