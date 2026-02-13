import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase configuration. Please check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface UploadOptions {
  bucket: 'documents' | 'images';
  file: File;
  folder?: string;
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

/**
 * Upload a file to Supabase storage
 * @param options - Upload options including file, bucket, and folder
 * @returns Upload result with file URL
 */
export async function uploadToSupabase(options: UploadOptions): Promise<UploadResult> {
  try {
    const { bucket, file, folder = 'uploads' } = options;

    // Validate file
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop();
    const fileName = `${timestamp}-${random}.${extension}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicData.publicUrl,
      path: filePath,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Upload error:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Upload multiple files to Supabase
 * @param files - Array of files to upload
 * @param bucket - Bucket name
 * @param folder - Folder path in bucket
 * @returns Array of upload results
 */
export async function uploadMultipleFiles(
  files: File[],
  bucket: 'documents' | 'images',
  folder: string = 'uploads'
): Promise<UploadResult[]> {
  const results = await Promise.all(
    files.map(file => uploadToSupabase({ bucket, file, folder }))
  );
  return results;
}

/**
 * Delete a file from Supabase
 * @param bucket - Bucket name
 * @param path - File path in bucket
 */
export async function deleteFromSupabase(
  bucket: 'documents' | 'images',
  path: string
): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}

interface StorageFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata?: {
    size: number;
    mimetype: string;
  };
}

interface FileWithUrl extends StorageFile {
  url: string;
  isImage: boolean;
}

/**
 * List all files in a Supabase bucket
 * @param bucket - Bucket name
 * @param folder - Optional folder path to list files from
 * @returns Array of files with their public URLs
 */
export async function listFilesFromSupabase(
  bucket: 'documents' | 'images',
  folder: string = 'uploads'
): Promise<FileWithUrl[]> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) {
      console.error('Error listing files:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Filter out folders and get public URLs for files
    const files = data
      .filter((item) => !item.id.startsWith('0')) // Exclude folders
      .map((file) => {
        const filePath = `${folder}/${file.name}`;
        const { data: publicData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);

        return {
          ...file,
          url: publicData.publicUrl,
          isImage,
        };
      });

    return files;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
}

/**
 * Get public URL for a file
 * @param bucket - Bucket name
 * @param path - File path in bucket
 * @returns Public URL
 */
export function getPublicUrlForFile(
  bucket: 'documents' | 'images',
  path: string
): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export default supabase;
