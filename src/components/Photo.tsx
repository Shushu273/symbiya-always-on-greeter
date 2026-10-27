import type { Photo as PhotoData } from '@/data/photos';

export function Photo({ photo, hero = false, className = '', sizes = '100vw' }: { photo: PhotoData; hero?: boolean; className?: string; sizes?: string }) {
  return <img className={className} src={photo.src} srcSet={photo.srcSet} sizes={sizes} width={1600} height={900} alt={photo.alt} loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : 'auto'} decoding="async" />;
}