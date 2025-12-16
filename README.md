# Upplevelse App — Experience Booking Platform

Vue 3-applikation för sökning, utforskning och bokning av upplevelser. Projektet demonstrerar modernt frontend-arkitektur med state management och responsiv design.

---

## 1. Projektöversikt

Applikationen låter användare:

- Söka och filtrera bland upplevelser
- Se detaljer och boka med datum, antal personer och tillval
- Hantera kundkorg och se orderbekräftelse

**Stack:** Vue 3 + TypeScript + Vite + Pinia + Vue Router + Tailwind CSS

---

## 2. Tekniska lösningar

### Ramverk och verktyg

| Teknologi    | Version | Syfte                 |
| ------------ | ------- | --------------------- |
| Vue          | 3.5.24  | Progressive framework |
| TypeScript   | 5.9.3   | Type safety           |
| Vite         | 7.2.4   | Build tool            |
| Pinia        | 3.0.4   | State management      |
| Vue Router   | 4.6.3   | Client-side routing   |
| Tailwind CSS | 4.1.17  | Styling               |

---

## 3. State Management (Pinia)

**`bookingStore`** hanterar bokningens tillstånd:

- `experience`, `date`, `people`, `ageCategory`, `addons`

**Getters** beräknar totalpris:

- `totalExperiencePrice` – Basenpris × antal personer
- `addonsTotal` – Summa av alla tillval
- `totalPrice` – Totalt med tillval

**Actions** uppdaterar state:

- `setExperience()`, `updatePeople()`, `setDate()` – enkla uppdateringar
- `addAddon()` – matchning av tillvalspriser från experience-data
- `resetBooking()` – återställer tillståndet

**`useCart()` composable** håller separata kundkorgsobjekt i en array.

---

## 4. Routing (Vue Router)

Sex huvudvägar:

| Route                   | Komponenter             | Syfte                            |
| ----------------------- | ----------------------- | -------------------------------- |
| `/`                     | LandingPage             | Hero, populära & nya upplevelser |
| `/experiences`          | ExperiencePage          | Sökbar galleriet med filter      |
| `/experience/:id`       | ExperienceIDpage        | Detaljer för en upplevelse       |
| `/booking/:id`          | BookingPage             | Bokningsformulär & tillval       |
| `/cart`                 | CartPage                | Kundkorg & checkout              |
| `/booking-confirmation` | BookingConfirmationPage | Orderbekräftelse                 |

**Query-parametrar** (`q`, `people`, `date`, `age`) sparas för att bevara filtrering.

---

## 5. Komponentstruktur

Komponenter organiseras efter **kontext**, inte bara återanvändbarhet:

- **`pages/`** – Vue Router-komponenter (en per väg)
- **`components/layout/`** – Globala element (Header, Hero, Footer)
- **`components/common/`** – Återanvändbar UI-primitiver (Modal, Card, Button)
- **`components/<domain>/`** – Domänspecifika komponenter (Cart, Addons, Experience)

**Fördelar:**

- Tydlig navigation för utvecklare
- Reducerad prop-drilling
- Enkel att hitta relaterad logik

**Motivering:** Denna struktur matchar mental model för hur sidan är uppdelad. En ny utvecklare vet direkt var koden för "kundkorg" eller "bokning" finns.

---

## 6. Installation & körning

```bash
npm install                      # Installera beroenden
npm run dev                      # Starta dev-server (http://localhost:5173)
npm run build                    # Bygg för produktion
npm run preview                  # Förhandsgranska build
```

**Krav:** Node.js 18+

---

## 7. Projektstruktur

```
src/
├── pages/                   # Vue Router-komponenter
│   ├── LandingPage.vue
│   ├── ExperiencePage.vue
│   ├── BookingPage.vue
│   ├── CartPage.vue
│   └── ...
├── components/              # UI-komponenter
│   ├── layout/             # Header, Hero, Footer
│   ├── common/             # Modal, Card, Button
│   ├── Cart/               # CartItem, ConfirmationModal
│   ├── addons/             # Addons, AddonsCard
│   └── ...
├── stores/                  # Pinia stores
│   └── bookingStore.ts
├── router/                  # Vue Router setup
│   └── index.ts
├── composables/             # Reusable logic
│   └── useCart.ts
├── types/                   # TypeScript interfaces
│   └── ExperienceType.ts
├── utils/                   # Data
│   ├── experiences.json
│   └── addons.json
└── main.ts
```

---

## 8. Vidare utveckling

Möjliga förbättringar:

- **Backend-integration** – REST API / GraphQL för data och bokningar
- **Autentisering** – JWT/OAuth för användaraccounts
- **Betalning** – Stripe/Klarna integration
- **Användarkonton** – Min bokningar, historik, recensioner
- **Avancerad sökning** – Prisfilter, kategorier, ratings
- **Performance** – Virtualiserat galleri, lazy loading, Service Worker
- **Testning** – Unit-tester (Vitest), E2E-tester (Playwright), Component-tester
- **Admin-panel** – CRUD för upplevelser, bokningsöversikt
