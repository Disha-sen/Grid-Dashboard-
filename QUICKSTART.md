# Quick Start Guide

Get the FactWise Dashboard running in under 2 minutes!

## 1. Install Dependencies

```bash
npm install
```

Wait for all packages to download and install (approximately 1-2 minutes).

## 2. Start Development Server

```bash
npm run dev
```

The application will automatically open in your default browser at `http://localhost:3000`

## 3. Explore the Dashboard

### Try These Features:

1. **Search**: Type in the search box to filter across all columns
2. **Sort**: Click any column header to sort
3. **Filter**: Use the filter row below headers for advanced filtering
4. **Resize**: Drag column borders to resize
5. **Reorder**: Drag column headers to reorder
6. **Hide/Show**: Click "Columns" button to toggle column visibility
7. **Select**: Click checkboxes to select rows
8. **Export**: Click "Export CSV" to download data
9. **Pagination**: Change page size or navigate pages
10. **Performance Test**: Toggle switch to load 100,000 rows!

## 4. Performance Demo

Toggle the switch in the toolbar from "Sample Data (20 Rows)" to "100K Rows (Performance Demo)".

Watch as 100,000 rows load instantly with no lag!

## Common Commands

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## Troubleshooting

**Port 3000 already in use?**
Vite will automatically try port 3001, 3002, etc.

**Dependencies won't install?**
Delete `node_modules` and `package-lock.json`, then run `npm install` again.

**Grid not showing?**
Clear browser cache and localStorage, then refresh.

**Tests failing?**
Make sure you've run `npm install` first.

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [SCREENSHOTS.md](SCREENSHOTS.md) for UI/UX descriptions
- Explore the code in `src/components/`
- Customize column definitions in `src/config/columnDefs.ts`

Enjoy exploring the FactWise Dashboard! 🚀
