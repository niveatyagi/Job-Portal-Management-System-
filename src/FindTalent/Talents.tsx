import { useEffect, useState } from "react";
import { getAllProfiles, searchProfiles } from "../Services/ProfileService";
import TalentCard from "./TalentCard";
import DOMPurify from "dompurify";

const Talents = ({ filters }: any) => {
  const [talents, setTalents] = useState<any[]>([]);

  // Sanitize helper
  const cleanObject = (obj: any) => {
    if (!obj) return {};

    const clean: any = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (typeof value === "string") {
        clean[key] = DOMPurify.sanitize(value);
      } else {
        clean[key] = value;
      }
    });

    return clean;
  };

  // Format profiles for UI
  const formatProfiles = (res: any[]) =>
    res.map((p: any) => ({
      id: p.id || p._id,
      name: p.name || "Unknown",
      role: p.jobTitle || "Not Provided",
      company: p.company || "Not Provided",
      topSkills: p.skills || [],
      about: p.about || "No description",
      expectedCtc: p.expectedCtc || "N/A",
      location: p.location || "Unknown",
      image: p.image || "avatar1.jpg",
    }));

  // Load all profiles
  const loadProfiles = async () => {
    try {
      const res = await getAllProfiles();
      setTalents(formatProfiles(res));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  useEffect(() => {
    const clean = cleanObject(filters);

    if (Object.keys(clean).length === 0) {
      loadProfiles();
    } else {
      handleSearch(clean);
    }
  }, [filters]);

 const prepareFiltersForBackend = (f: any) => {
  const formatted: any = {};

  if (!f || typeof f !== "object") return formatted;

  Object.keys(f).forEach((key) => {
    const val = f[key];

    // skip falsy / empty
    if (val === "" || val === null || val === undefined) return;
    if (Array.isArray(val) && val.length === 0) return;

    // sanitize strings
    const sanitizeString = (s: string) => s.trim();

    // Multi-capable keys (send as arrays)
    const multiKeys = ["skills", "locations", "jobTitles", "companies", "experience", "jobType"];

    // UI used 'location' key sometimes — normalize to 'locations'
    if (key === "location") {
      const data = Array.isArray(val) ? val : [val];
      formatted["locations"] = data.map((x: any) => String(x).trim());
      return;
    }

    if (key === "jobTitle") {
      const data = Array.isArray(val) ? val : [val];
      formatted["jobTitles"] = data.map((x: any) => String(x).trim());
      return;
    }

    if (key === "company") {
      const data = Array.isArray(val) ? val : [val];
      formatted["companies"] = data.map((x: any) => String(x).trim());
      return;
    }

    if (multiKeys.includes(key)) {
      if (Array.isArray(val)) {
        formatted[key] = val.map((x) => String(x).trim());
      } else {
        formatted[key] = [String(val).trim()];
      }
      return;
    }

    // Salary keys — keep numbers (frontend RangeSlider values are LPA)
    if (key === "minSalary" || key === "maxSalary") {
      const num = Number(val);
      if (!Number.isNaN(num)) {
        formatted[key] = num;
      }
      return;
    }

    // Default: copy sanitized value
    formatted[key] = typeof val === "string" ? sanitizeString(val) : val;
  });

  return formatted;
};



const handleSearch = async (filters: any) => {
  try {
    const backendFilters = prepareFiltersForBackend(filters);
    console.log("Backend Filters:", backendFilters);
    const res = await searchProfiles(backendFilters);
    setTalents(formatProfiles(res));
  } catch (err) {
    console.error("Search Error:", err);
  }
};

  // Fix typing (f: any)
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {talents.map((p, index) => (
        <TalentCard key={index} {...p} posted={false} invited={false} />
      ))}
    </div>
  );
};

export default Talents;
