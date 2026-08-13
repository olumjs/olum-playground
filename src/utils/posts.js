export const posts = [
  {
    slug: "hello-olum",
    title: "Hello, Olum",
    date: "2026-01-12",
    excerpt: "Why components are just .html files, and what that buys you.",
    body: "Olum compiles a single .html file — script, scoped style, template — into a small JS module. No JSX, no virtual DOM sync to reason about beyond diff-patching, no build-your-own-router. The file tree *is* the route table.",
  },
  {
    slug: "reactivity-model",
    title: "The reactivity model, in one paragraph",
    date: "2026-02-03",
    excerpt: "Only `state` is tracked. Mutate it, deeply, and the DOM patches itself.",
    body: "Declare `const state = { ... }` as a literal object and every read inside the template subscribes to it. Deep mutations — nested objects, arrays, Map, Set — all trigger a microtask-batched re-render that diff-patches the DOM in place, so focus, scroll position, and playing media survive.",
  },
  {
    slug: "state-props-store",
    title: "Choosing between state, props, and the store",
    date: "2026-03-18",
    excerpt: "Local first, one level down is props, shared or long-lived is the store.",
    body: "state dies with the component. props flow one level down and re-render with the parent. The store is zustand-style shared state that survives route changes — components subscribe just by reading it. Prop-drilling through a component that doesn't use the prop is the signal to move it to a store.",
  },
  {
    slug: "compiler-internals",
    title: "What the compiler actually does",
    date: "2026-04-22",
    excerpt: "A real HTML AST, a real JS AST, and a browser runtime that diff-patches.",
    body: "Templates parse through parse5, component JS through acorn — interpolation and codegen still involve regex passes over serialized markup, so it's robust for common cases and fragile at some edges. The output is a plain JS module per component; the runtime builds and diff-patches the DOM from it.",
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);
