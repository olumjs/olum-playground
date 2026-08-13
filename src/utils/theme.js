import { store } from "olum";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const theme = store({
  dark: prefersDark,
  toggle() {
    this.dark = !this.dark;
    document.documentElement.classList.toggle("dark", this.dark);
  },
});

document.documentElement.classList.toggle("dark", theme.dark);
