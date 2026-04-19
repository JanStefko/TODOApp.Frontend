# TODO App Frontend

Frontend část jednoduché TODO aplikace vytvořená v Reactu a Tailwind CSS.  
Aplikace komunikuje s ASP.NET Core Web API backendem a umožňuje načítání, vytváření, úpravu a mazání úkolů.

## Funkce

- Zobrazení seznamu úkolů z API
- Přidání nového úkolu
- Označení úkolu jako dokončený
- Smazání úkolu
- Automatické řazení dokončených úkolů na konec seznamu
- Přehledový header s počty úkolů

## Použité technologie

- React
- Vite
- Tailwind CSS
- JavaScript
- Fetch API

## Spuštění projektu

1. Naklonuj repozitář:
   ```bash
   git clone https://github.com/JanStefko/TODOApp.Frontend.git
   ```

2. Přejdi do složky projektu:
   ```bash
   cd TODOApp.Frontend
   ```

3. Nainstaluj závislosti:
   ```bash
   npm install
   ```

4. Vytvoř `.env` soubor v kořeni projektu a nastav:
   ```env
   VITE_API_BASE_URL=https://localhost:7085/api
   ```

5. Spusť vývojový server:
   ```bash
   npm run dev
   ```

## Backend

Tento frontend vyžaduje spuštěný backend projekt ASP.NET Core Web API.  
Frontend očekává dostupné API endpointy pro TODO položky na adrese definované v `.env`.

## Struktura projektu

```text
src/
  components/
    Header.jsx
    TodoForm.jsx
    TodoItem.jsx
    TodoList.jsx
  App.jsx
  main.jsx
```

## Poznámky

- `.env` není součástí repozitáře.
- Před spuštěním frontend aplikace musí běžet backend API.
- Pokud změníš `.env`, restartuj `npm run dev`.

## Stav projektu

MVP je hotové a aplikace aktuálně podporuje základní CRUD operace nad TODO položkami.