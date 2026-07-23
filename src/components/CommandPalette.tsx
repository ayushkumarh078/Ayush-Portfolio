"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { Search, Moon, Sun, Palette, Monitor, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full max-w-xl mx-4 rounded-xl overflow-hidden border border-border bg-background shadow-2xl"
          >
            <Command
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            >
              <div className="flex items-center border-b border-border px-3">
                <Search className="w-5 h-5 text-primary-muted shrink-0" />
                <Command.Input 
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex h-12 w-full rounded-md bg-transparent py-3 px-3 text-sm outline-none placeholder:text-primary-muted text-foreground" 
                />
              </div>
              
              <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-smooth">
                <Command.Empty className="py-6 text-center text-sm text-primary-muted">
                  No results found.
                </Command.Empty>
                
                <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-primary-muted">
                  <Command.Item onSelect={() => { window.location.href = "#projects"; setOpen(false); }} className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-foreground">
                    Projects
                  </Command.Item>
                  <Command.Item onSelect={() => { window.location.href = "#skills"; setOpen(false); }} className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-foreground">
                    Skills
                  </Command.Item>
                  <Command.Item onSelect={() => { window.location.href = "#contact"; setOpen(false); }} className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-foreground">
                    Contact
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="h-px bg-border my-1" />

                <Command.Group heading="Theme" className="px-2 py-1.5 text-xs font-medium text-primary-muted">
                  <Command.Item onSelect={() => { setTheme("light"); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-foreground">
                    <Sun className="w-4 h-4" /> Light
                  </Command.Item>
                  <Command.Item onSelect={() => { setTheme("dark"); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-foreground">
                    <Moon className="w-4 h-4" /> Dark
                  </Command.Item>
                  <Command.Item onSelect={() => { setTheme("midnight"); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-foreground">
                    <Palette className="w-4 h-4" /> Midnight Blue
                  </Command.Item>
                  <Command.Item onSelect={() => { setTheme("graphite"); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-foreground">
                    <Palette className="w-4 h-4" /> Graphite
                  </Command.Item>
                  <Command.Item onSelect={() => { setTheme("system"); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-foreground">
                    <Monitor className="w-4 h-4" /> System
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="h-px bg-border my-1" />

                <Command.Group heading="System" className="px-2 py-1.5 text-xs font-medium text-primary-muted">
                  <Command.Item onSelect={() => { alert("Terminal Mode Triggered"); setOpen(false); }} className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary text-foreground">
                    <Terminal className="w-4 h-4" /> Open Terminal
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
