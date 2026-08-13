# my-app

An [Olum.js](https://olumjs.top) playground app demonstrating core framework features — reactivity, composition, control flow, lifecycle hooks, state management with olum-store, transitions, and two-way binding — alongside a small UI component library and a blog example.

## Getting started

### Install dependencies
```
npm install
```

### Start the development server
```
npm run dev
```

### Build for production
```
npm run build
```
Output is written to `docs/` (served via GitHub Pages, see `CNAME`).

## Tech stack
- [Olum](https://olumjs.top) — component framework
- [olum-router](https://olumjs.top) — routing
- [olum-store](https://olumjs.top) — state management
- [olum-transition](https://olumjs.top) — page/element transitions
- [olum-icons](https://olumjs.top) — icon set
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Vite](https://vitejs.dev) — dev tooling

## Project structure
```
src/
  page.html              # home page
  reactivity/            # reactivity demo
  control-flow/          # control-flow demo
  composition/           # composition demo
  lifecycle/             # lifecycle hooks demo
  store/                 # olum-store demo
  transitions/           # olum-transition demo
  binding/                # two-way binding demo
  blog/                  # blog list + [slug] detail page
  ui/                    # UI component showcase (data-display, feedback, forms, layout, navigation, overlay)
  components/            # shared components
  utils/                 # helpers (cart, posts, theme, versions)
public/                  # static assets
```

## Documentation
See the full [Olum documentation](https://olumjs.top/docs).
