"use client";
import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/RootContext";
import ImageUpload from "@/components/forms/ImageUpload";
import { supabase } from "@/lib/supabase";

const defaultProfile = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  phone: "",
  address: "",
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=U"
};

export default function MyProfilePage() {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Initialize profile from user
  const initialProfile = user
    ? {
      firstName: user.email ? user.email.split("@")[0] : "",
      lastName: "",
      email: user.email || "",
      countryCode: "+91",
      phone: "",
      address: "",
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email ? user.email[0]?.toUpperCase() : "U"}`
    }
    : defaultProfile;

  const [profile, setProfile] = useState(initialProfile);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(initialProfile);
  const [phoneError, setPhoneError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [countryCodes, setCountryCodes] = useState<any[]>([]);
  const [dbLoading, setDbLoading] = useState(false);
  const [dbError, setDbError] = useState("");

  useEffect(() => {
    fetch("/country-codes.json")
      .then((res) => res.json())
      .then((data) => setCountryCodes(data));
  }, []);

  // Fetch profile from Supabase on load
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setDbLoading(true);
      setDbError("");
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        if (error && error.code !== "PGRST116") throw error;
        if (data) {
          setProfile({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: data.email || user.email || "",
            countryCode: data.country_code || "+91",
            phone: data.phone || "",
            address: data.address || "",
            avatar: data.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email ? user.email[0]?.toUpperCase() : "U"}`
          });
          setForm({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: data.email || user.email || "",
            countryCode: data.country_code || "+91",
            phone: data.phone || "",
            address: data.address || "",
            avatar: data.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email ? user.email[0]?.toUpperCase() : "U"}`
          });
        } else {
          // Create default profile row if not found
          const { error: insertError } = await supabase.from("users").insert({
            id: user.id,
            email: user.email,
            first_name: user.email ? user.email.split("@")[0] : "",
            last_name: "",
            country_code: "+91",
            phone: "",
            address: "",
            avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email ? user.email[0]?.toUpperCase() : "U"}`
          });
          if (insertError) throw insertError;
          // Refetch
          await fetchProfile();
        }
      } catch (err: any) {
        setDbError(err.message || "Failed to load profile");
      } finally {
        setDbLoading(false);
      }
    };
    if (user) fetchProfile();
    // eslint-disable-next-line
  }, [user]);

  // Update profile/form if user changes
  useEffect(() => {
    if (user) {
      const newProfile = {
        firstName: user.email ? user.email.split("@")[0] : "",
        lastName: "",
        email: user.email || "",
        countryCode: "+91",
        phone: "",
        address: "",
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email ? user.email[0]?.toUpperCase() : "U"}`
      };
      setProfile(newProfile);
      setForm(newProfile);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePhone = () => {
    // Basic validation: country code required, phone must be digits and 6-15 chars
    let valid = true;
    setCountryCodeError("");
    setPhoneError("");
    if (!form.countryCode) {
      setCountryCodeError("Country code is required");
      valid = false;
    }
    if (!form.phone || !/^\d{6,15}$/.test(form.phone)) {
      setPhoneError("Enter a valid phone number (6-15 digits)");
      valid = false;
    }
    return valid;
  };

  const handleSave = async () => {
    if (!validatePhone() || !user) return;
    setDbLoading(true);
    setDbError("");
    try {
      const { error } = await supabase.from("users").upsert({
        id: user.id,
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        country_code: form.countryCode,
        phone: form.phone,
        address: form.address,
        avatar: form.avatar
      });
      if (error) throw error;
      setProfile(form);
      setEdit(false);
    } catch (err: any) {
      setDbError(err.message || "Failed to save profile");
    } finally {
      setDbLoading(false);
    }
  };

  // Avatar upload handler using ImageUpload
  const handleAvatarUpload = async (url: string) => {
    setForm((prev) => ({ ...prev, avatar: url }));
    // Save avatar immediately to DB if editing
    if (edit && user) {
      setDbLoading(true);
      setDbError("");
      try {
        const { error: updateError } = await supabase.from("users").update({ avatar: url }).eq("id", user.id);
        if (updateError) throw updateError;
        setProfile((prev) => ({ ...prev, avatar: url }));
      } catch (err: any) {
        setDbError(err.message || "Failed to update avatar");
      } finally {
        setDbLoading(false);
      }
    }
  };

  if (loading || !user || dbLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006D92] mb-4" />
        <p className="text-lg text-gray-700">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow border border-gray-100 p-8">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          {edit ? (
            <ImageUpload
              value={form.avatar}
              onUpload={handleAvatarUpload}
              bucket="profiles"
              altString='profile image'
              prevUrl={profile.avatar !== defaultProfile.avatar ? profile.avatar : undefined}
              width={80}
              height={80}
            />
          ) : (
            <img src={profile.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {edit ? form.firstName : profile.firstName} {edit ? form.lastName : profile.lastName}
          </h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              name="firstName"
              value={edit ? form.firstName : profile.firstName}
              onChange={handleChange}
              disabled={!edit}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              name="lastName"
              value={edit ? form.lastName : profile.lastName}
              onChange={handleChange}
              disabled={!edit}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            value={profile.email}
            disabled
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country Code</label>
            <select
              name="countryCode"
              value={edit ? form.countryCode : profile.countryCode}
              onChange={handleChange}
              disabled={!edit}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
            >
              {countryCodes.map((c: any) => (
                <option key={c.code} value={c.dial_code}>{c.name} ({c.dial_code})</option>
              ))}
            </select>
            {countryCodeError && <div className="text-red-600 text-sm mt-1">{countryCodeError}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              name="phone"
              value={edit ? form.phone : profile.phone}
              onChange={handleChange}
              disabled={!edit}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
              type="tel"
              pattern="\d{6,15}"
              maxLength={15}
            />
            {phoneError && <div className="text-red-600 text-sm mt-1">{phoneError}</div>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            name="address"
            value={edit ? form.address : profile.address}
            onChange={handleChange}
            disabled={!edit}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
          />
        </div>
        <div className="flex gap-3 justify-end pt-4">
          {edit ? (
            <>
              <Button type="button" variant="outline" onClick={() => { setEdit(false); setForm(profile); setPhoneError(""); setCountryCodeError(""); }}>Cancel</Button>
              <Button type="button" className="bg-[#006D92] hover:bg-[#e28618]" onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button type="button" onClick={() => setEdit(true)} className="bg-[#006D92] hover:bg-[#e28618]">Edit</Button>
          )}
        </div>
      </form>
      {dbError && <div className="text-red-600 text-sm mb-2">{dbError}</div>}
    </div>
  );
} 