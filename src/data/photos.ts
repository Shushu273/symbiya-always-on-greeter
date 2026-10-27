import saraLarge from '@/assets/sara-hero-1600.webp.asset.json';
import saraSmall from '@/assets/sara-hero-800.webp.asset.json';
import barberLarge from '@/assets/barbershop-1600.webp.asset.json';
import barberSmall from '@/assets/barbershop-800.webp.asset.json';
import clinicLarge from '@/assets/kliniky-1600.webp.asset.json';
import clinicSmall from '@/assets/kliniky-800.webp.asset.json';
import salonLarge from '@/assets/kosmeticke-salony-1600.webp.asset.json';
import salonSmall from '@/assets/kosmeticke-salony-800.webp.asset.json';
import constructionLarge from '@/assets/stavebnictvi-1600.webp.asset.json';
import constructionSmall from '@/assets/stavebnictvi-800.webp.asset.json';
import transportLarge from '@/assets/doprava-1600.webp.asset.json';
import transportSmall from '@/assets/doprava-800.webp.asset.json';
import gastroLarge from '@/assets/gastro-1600.webp.asset.json';
import gastroSmall from '@/assets/gastro-800.webp.asset.json';

export type Photo = { src: string; srcSet: string; alt: string };
function photo(large: { url: string }, small: { url: string }, alt: string): Photo {
  return { src: large.url, srcSet: `${small.url} 800w, ${large.url} 1600w`, alt };
}
export const saraPhoto = photo(saraLarge, saraSmall, 'Sára, vizuální podoba AI recepční, u pracovního stolu ve zlatém světle');
export const industryPhotos: Record<string, Photo> = {
  barbershopy: photo(barberLarge, barberSmall, 'Barber při úpravě vlasů klienta ve zlatavě osvětleném barbershopu'),
  kliniky: photo(clinicLarge, clinicSmall, 'Lékař v ordinaci při práci se zdravotní dokumentací'),
  'kosmeticke-salony': photo(salonLarge, salonSmall, 'Kosmetička při ošetření pleti klientky v salonu'),
  stavebnictvi: photo(constructionLarge, constructionSmall, 'Stavebník v ochranné přilbě kontroluje plány na stavbě'),
  doprava: photo(transportLarge, transportSmall, 'Řidič za volantem při večerní jízdě'),
  gastro: photo(gastroLarge, gastroSmall, 'Kuchař dokončuje pokrm v kuchyni restaurace'),
};