import React, { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
interface ImageUploadProps {
  value?: string;
  onUpload: (url: string) => void;
  bucket?: string;
  folder?: string;
}

const DEFAULT_BUCKET = 'event-images';

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onUpload, bucket = DEFAULT_BUCKET, folder = '' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}${Date.now()}-${Math.random().toString(36).substr(2, 8)}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;
      // Get public URL
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
      if (urlData?.publicUrl) {
        setPreview(urlData.publicUrl);
        onUpload(urlData.publicUrl);
      } else {
        setError('Failed to get image URL');
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      fileInputRef.current!.files = e.dataTransfer.files;
      handleFileChange({ target: { files: e.dataTransfer.files } } as any);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#006D92] transition-colors relative bg-gray-50"
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    >
      {preview ? (
        <Image src={preview} alt="Event" width={1000} height={1000} className="mx-auto mb-2 rounded-lg max-h-48 object-contain" />
      ) : (
        <>
          <div className="text-gray-400 mb-2">Drag & drop or click to upload</div>
          <div className="text-sm text-gray-500">PNG, JPG up to 5MB</div>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <div className="text-blue-600 mt-2">Uploading...</div>}
      {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
    </div>
  );
};

export default ImageUpload; 