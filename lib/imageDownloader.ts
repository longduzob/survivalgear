/**
 * Image download and storage utilities
 * Downloads images from external URLs and saves them locally
 */

import fs from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

/**
 * Download an image from URL and save it locally
 * @param imageUrl - URL of the image to download
 * @param productSlug - Product slug for directory organization
 * @param index - Image index for naming
 * @returns Local path to the saved image
 */
export async function downloadAndSaveImage(
  imageUrl: string,
  productSlug: string,
  index: number
): Promise<string> {
  try {
    // Create directory for product images
    const productDir = path.join(process.cwd(), 'public', 'products', productSlug);
    await fs.mkdir(productDir, { recursive: true });

    // Determine file extension from URL or default to jpg
    const urlObj = new URL(imageUrl);
    const urlPath = urlObj.pathname;
    const extension = path.extname(urlPath) || '.jpg';
    const sanitizedExt = extension.split('?')[0]; // Remove query params
    
    // Generate filename
    const filename = `image-${index}${sanitizedExt}`;
    const filepath = path.join(productDir, filename);

    // Download image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    // Save image to file
    const fileStream = createWriteStream(filepath);
    await finished(Readable.fromWeb(response.body as any).pipe(fileStream));

    // Return public URL path
    return `/products/${productSlug}/${filename}`;
  } catch (error) {
    console.error(`Failed to download image ${imageUrl}:`, error);
    // Return original URL as fallback
    return imageUrl;
  }
}

/**
 * Download multiple images for a product
 * @param imageUrls - Array of image URLs
 * @param productSlug - Product slug for directory organization
 * @returns Array of local paths or original URLs on failure
 */
export async function downloadProductImages(
  imageUrls: string[],
  productSlug: string
): Promise<string[]> {
  const downloadPromises = imageUrls.map((url, index) => 
    downloadAndSaveImage(url, productSlug, index)
  );

  return Promise.all(downloadPromises);
}

/**
 * Clean up images for a product (e.g., when deleting a product)
 * @param productSlug - Product slug
 */
export async function cleanupProductImages(productSlug: string): Promise<void> {
  try {
    const productDir = path.join(process.cwd(), 'public', 'products', productSlug);
    await fs.rm(productDir, { recursive: true, force: true });
  } catch (error) {
    console.error(`Failed to cleanup images for ${productSlug}:`, error);
  }
}

/**
 * Validate if URL is a valid image URL
 * @param url - URL to validate
 * @returns true if URL appears to be an image
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    
    return imageExtensions.some(ext => pathname.includes(ext)) || 
           urlObj.hostname.includes('alicdn.com') || // AliExpress CDN
           urlObj.hostname.includes('aliexpress.com');
  } catch {
    return false;
  }
}
