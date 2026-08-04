# Dotyk Młodości — strona WWW

Statyczna strona gabinetu kosmetologicznego (HTML + skompilowany Tailwind CSS).

## Struktura
```
/                      strony główne (index, o-nas, oferta, galeria, kontakt, zapisy, 404, polityka-prywatnosci)
/oferta/               podstrony zabiegów
/images/               logo, favicony, obrazy WebP, og-image
/assets/site.css       skompilowany, zminifikowany CSS (Tailwind + style własne)
/assets/site.js        wspólny skrypt (menu, animacje, lightbox, liczniki, baner cookies)
/src/input.css         źródło CSS (do budowania)
tailwind.config.js     konfiguracja Tailwind
robots.txt, sitemap.xml, manifest.webmanifest
```

## Jak zmienić wygląd / dodać klasy Tailwind
CSS jest **skompilowany** (nie ma już CDN „not for production"). Po zmianach w plikach HTML lub `src/input.css` przebuduj CSS:

```bash
npm install            # tylko raz
npm run build          # generuje assets/site.css
```

`package.json` zawiera skrypt:
```json
"scripts": { "build": "tailwindcss -c tailwind.config.js -i src/input.css -o assets/site.css --minify" }
```

## Domena i hosting
Strona nie ma jeszcze domeny. Adresy kanoniczne (`canonical`, `og:url`, `sitemap.xml`) wskazują na `https://dotykmlodosci.pl` — **po zakupie domeny sprawdź, czy to właściwy adres** (jeśli inny, zamień w plikach `.html`, `sitemap.xml`, `robots.txt`).

Darmowy hosting statyczny (wgrywasz cały folder poza `node_modules/`):
- **Cloudflare Pages** lub **Netlify** — darmowe, HTTPS, własna domena.

Nie wgrywaj na hosting: `node_modules/`, `src/`, `tailwind.config.js`, `package*.json` (to pliki deweloperskie).

## Zdjęcia do podmiany
Część zdjęć zabiegowych (mezoterapia, Oxygeneo, RF, depilacja) korzysta tymczasowo ze zdjęć twarzy/„przy pracy". Warto podmienić je na dedykowane, realne zdjęcia (WebP, ~1000 px szer.). Zachowaj nazwy plików w `/images/`, aby nie zmieniać kodu.

## Do uzupełnienia przez właściciela
- **Godziny otwarcia** (obecnie „wizyty po wcześniejszej rezerwacji").
- **Cennik** (opcjonalnie — poprawia konwersję i SEO).
- Weryfikacja **polityki prywatności** pod kątem realnie używanych narzędzi.
