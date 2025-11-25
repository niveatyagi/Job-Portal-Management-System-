// src/Pages/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import { getProfile, updateProfile } from "../Services/ProfileService";
import { getItem } from "../Services/LocalStorageService";

export default function ProfilePage() {
  const user = getItem("user") || {};
  const userId = user?.id ?? 1;

  const [loading, setLoading] = useState(true);
  const [backendProfile, setBackendProfile] = useState<any | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProfile(userId);
      setBackendProfile(data || null);
    } catch (e) {
      console.error("getProfile error", e);
      setBackendProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Map backend -> frontend
  const mapBackendToFrontend = (b: any) => {
    if (!b) {
      return {
        id: userId,
        name: user?.name || "",
        email: user?.email || "",
        jobTitle: b?.jobTitle ?? "",
        company: b?.company ?? "",
        location: b?.location ?? "",
        about: b?.about ?? "",
        skills: b?.skills ?? [],
        experiences: (b?.experiences ?? []).map((e: any) => ({
          id: e?.id,
          title: e?.title ?? "",
          company: e?.company ?? "",
          location: e?.location ?? "",
          startDate: e?.startDate ? e.startDate.split("T")[0] : "",
          endDate: e?.endDate ? e.endDate.split("T")[0] : "",
          working: !!e?.working,
          description: e?.description ?? "",
        })),
        certifications: (b?.certifications ?? []).map((c: any) => ({
          id: c?.id,
          title: c?.name ?? "",
          organization: c?.issuer ?? "",
          issueDate: c?.issueDate ? c.issueDate.split("T")[0] : "",
          certificateId: c?.certificateId ?? "",
        })),
        avatarUrl: b?.avatarUrl ?? undefined,
        bannerUrl: b?.bannerUrl ?? undefined,
      };
    } else {
      return {
        id: b.id ?? userId,
        name: user?.name || "",
        email: b.email ?? user?.email ?? "",
        jobTitle: b.jobTitle ?? "",
        company: b.company ?? "",
        location: b.location ?? "",
        about: b.about ?? "",
        skills: b.skills ?? [],
        experiences: (b.experiences ?? []).map((e: any) => ({
          id: e?.id,
          title: e?.title ?? "",
          company: e?.company ?? "",
          location: e?.location ?? "",
          startDate: e?.startDate ? e.startDate.split("T")[0] : "",
          endDate: e?.endDate ? e.endDate.split("T")[0] : "",
          working: !!e?.working,
          description: e?.description ?? "",
        })),
        certifications: (b.certifications ?? []).map((c: any) => ({
          id: c?.id,
          title: c?.name ?? "",
          organization: c?.issuer ?? "",
          issueDate: c?.issueDate ? c.issueDate.split("T")[0] : "",
          certificateId: c?.certificateId ?? "",
        })),
        avatarUrl: b.avatarUrl ?? undefined,
        bannerUrl: b.bannerUrl ?? undefined,
      };
    }
  };

  // Map frontend -> backend (for update API)
  const mapFrontendToBackend = (front: any, originalBackend?: any) => {
    // Keep other fields from originalBackend if present
    const base = originalBackend ? { ...originalBackend } : {};
    return {
      ...base,
      id: front.id,
      email: front.email,
      jobTitle: front.jobTitle,
      company: front.company,
      location: front.location,
      about: front.about,
      skills: front.skills,
      experiences: (front.experiences || []).map((e: any) => ({
        id: e.id,
        title: e.title,
        company: e.company,
        location: e.location,
        startDate: e.startDate ? `${e.startDate}T00:00:00` : null,
        endDate: e.endDate ? `${e.endDate}T00:00:00` : null,
        working: !!e.working,
        description: e.description,
      })),
      certifications: (front.certifications || []).map((c: any) => ({
        id: c.id,
        name: c.title,
        issuer: c.organization,
        issueDate: c.issueDate ? `${c.issueDate}T00:00:00` : null,
        certificateId: c.certificateId ?? null,
      })),
      avatarUrl: front.avatarUrl,
      bannerUrl: front.bannerUrl,
    };
  };

  const handleSaveSection = async (updatedSectionObj: any) => {
    // This receives the *full frontend profile* from child
    const frontend = updatedSectionObj;
    const payload = mapFrontendToBackend(frontend, backendProfile);
    await updateProfile(payload);
    await load();
  };

  const handleDelete = async (type: string, id: number) => {
    // You said earlier you have delete endpoints; if not, we fallback to sending updated array without the item.
    // Here we will produce a backend object without that item and PUT update.
    if (!backendProfile) return;
    const front = mapBackendToFrontend(backendProfile);
    if (type === "experience") {
      front.experiences = (front.experiences || []).filter((e: any) => e.id !== id);
    } else {
      front.certifications = (front.certifications || []).filter((c: any) => c.id !== id);
    }
    const payload = mapFrontendToBackend(front, backendProfile);
    await updateProfile(payload);
    await load();
  };

  if (loading) return <div className="min-h-[100vh] bg-mine-shaft-950 p-10">Loading...</div>;

  const frontendProfile = mapBackendToFrontend(backendProfile);

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['Poppins'] p-10">
      <Profile
        profile={frontendProfile}
        onSectionSave={handleSaveSection}
        onDeleteItem={handleDelete}
      />
    </div>
  );
}
