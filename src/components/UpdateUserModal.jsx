"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { FiEdit } from "react-icons/fi";

export function UpdateUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({
      name: e.target.name.value,
      image: e.target.image.value,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Update failed");
    } else {
      toast.success("Profile updated!");
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 transition font-medium text-sm"
      >
        <FiEdit /> Update Profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input name="name" type="text" required
                  className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium">Photo URL</label>
                <input name="image" type="url"
                  className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:border-amber-500"
                  placeholder="https://example.com/photo.jpg" />
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button type="button" onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition text-sm font-medium">
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}