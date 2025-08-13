import { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowUpOnSquareStackIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";

interface ResumeUploaderProps {
  resume?: string;
  onUpload: (formData: FormData) => void | Promise<void>;
  uploading: boolean;
}

export default function ResumeUploader({
  resume,
  onUpload,
  uploading,
}: ResumeUploaderProps) {
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;
    if (file.type !== "application/pdf")
      return toast.error("فقط فایل PDF مجاز است");
    if (file.size > 2 * 1024 * 1024)
      return toast.error("حجم فایل باید کمتر از 2 مگابایت باشد");
    const formData = new FormData();
    formData.append("resume", file);
    onUpload(formData);
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  };

  return resume ? (
    <div className="flex max-tablet:flex-col justify-between items-center gap-4 bg-foreground !p-4 border border-border rounded-lg h-full text-text text-center">
      <PaperClipIcon className="size-8" />
      <h1 className="font-bold text-xl">رزومه شما آپلود شده است</h1>
      <button onClick={() => resumeInputRef.current?.click()}>
        آپلود مجدد
      </button>
      <input
        ref={resumeInputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
        disabled={uploading}
      />
    </div>
  ) : (
    <div
      className={`flex flex-col justify-center items-center gap-4 bg-foreground/25 !p-4 border-3 border-border border-dashed rounded-lg text-text text-center cursor-pointer ${
        isDragging && "!bg-muted !border-text"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
      }}
      onClick={() => resumeInputRef.current?.click()}
    >
      <ArrowUpOnSquareStackIcon className="size-8" />
      <h1 className="font-bold text-xl">
        فایل رزومه را اینجا بکشید و رها کنید
      </h1>
      <span className="font-medium">یا برای انتخاب کلیک کنید (PDF)</span>
      <input
        ref={resumeInputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
}
