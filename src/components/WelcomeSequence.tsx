"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function WelcomeSequence() {
  const [mounted, setMounted] = useState(false);

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      popoverClass: 'theme-driver-popover', // We can style this in globals.css if needed
      steps: [
        {
          popover: {
            title: 'Welcome to my Portfolio! 🚀',
            description: 'This is an interactive experience designed to showcase my engineering work. Let me show you around quickly.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#tour-theme-studio',
          popover: {
            title: '🎨 Color Switcher',
            description: 'You can completely personalize the website using this Color Switcher! Mix and match backgrounds and Matrix colors to create your own custom theme.',
            side: 'top',
            align: 'start'
          }
        },
        {
          element: '#tour-visitor-counter',
          popover: {
            title: '👀 Live Visitor Count',
            description: 'See how many people have visited my portfolio in real-time.',
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '#tour-contact-links',
          popover: {
            title: '📬 Connect With Me',
            description: 'If you would like to connect, simply click the LinkedIn, GitHub, or Email icons here. Let\'s get in touch!',
            side: 'top',
            align: 'center'
          }
        },
        {
          popover: {
            title: '🎉 You\'re all set!',
            description: 'Feel free to explore the projects, skills, and achievements. Enjoy!',
            side: 'bottom',
            align: 'center'
          }
        }
      ]
    });

    driverObj.drive();
  };

  useEffect(() => {
    setMounted(true);
    const hasSeen = localStorage.getItem("has_seen_tour");
    
    // Slight delay to ensure all components and fonts are rendered before tour starts
    if (!hasSeen) {
      setTimeout(() => {
        startTour();
        localStorage.setItem("has_seen_tour", "true");
      }, 2000);
    }
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={startTour}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-border/50 backdrop-blur-md border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:bg-border transition-all hover:scale-110 shadow-lg"
      title="Replay Introduction Tour"
    >
      <Info size={20} />
    </button>
  );
}
