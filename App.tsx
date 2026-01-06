import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { AILab } from './components/AILab';
import { AIChat } from './components/AIChat';
import { Materials } from './components/Materials';
import { Opportunities } from './components/Opportunities';
import { Freelancing } from './components/Freelancing';
import { Webinars } from './components/Webinars';
import { ResumeBuilder } from './components/ResumeBuilder';
import { Navbar } from './components/Navbar';
import { AppSection } from './types';
import { Sidebar, SidebarBody, SidebarLink } from './components/ui/sidebar';
import {
  LayoutDashboard,
  BookOpen,
  Library,
  Briefcase,
  Banknote,
  Video,
  FileText,
  Bot,
  LogOut,
  Settings,
  LogIn
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from './lib/utils';
import { ClerkProvider, SignIn, SignedIn, SignedOut, useClerk } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_Y2xlcmsuZXhhbXBsZS5jb20k"; // Fallback placeholder if env not set

function InnerApp() {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();

  const renderSection = () => {
    switch (currentSection) {
      case AppSection.COURSES:
        return <Courses />;
      case AppSection.MATERIALS:
        return <Materials />;
      case AppSection.JOBS:
        return <Opportunities />;
      case AppSection.FREELANCE:
        return <Freelancing />;
      case AppSection.WEBINARS:
        return <Webinars />;
      case AppSection.RESUME:
        return <ResumeBuilder />;
      case AppSection.AI_LAB:
        return <AILab />;
      case AppSection.LOGIN:
        return (
          <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 dark:bg-neutral-900">
            <div className="p-4">
              <SignIn
                afterSignInUrl="/"
                signUpUrl="#"
                appearance={{
                  elements: {
                    card: "shadow-xl border border-slate-200"
                  }
                }}
              />
              <button
                onClick={() => setCurrentSection(AppSection.HOME)}
                className="mt-4 text-slate-500 hover:text-slate-800 text-sm underline w-full text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        );
      case AppSection.HOME:
      default:
        return (
          <>
            <Hero setSection={setCurrentSection} />
            <section className="py-20 px-6 bg-white dark:bg-neutral-900 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">One Platform. Endless Possibilities.</h2>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div onClick={() => setCurrentSection(AppSection.COURSES)} className="p-8 rounded-2xl bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 hover:shadow-xl transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2 dark:text-white">Learn Skills</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Join live classes or watch recorded sessions at your own pace.</p>
                </div>
                <div onClick={() => setCurrentSection(AppSection.JOBS)} className="p-8 rounded-2xl bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 hover:shadow-xl transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2 dark:text-white">Get Hired</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Apply for top internships and full-time roles directly.</p>
                </div>
                <div onClick={() => setCurrentSection(AppSection.FREELANCE)} className="p-8 rounded-2xl bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 hover:shadow-xl transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2 dark:text-white">Start Earning</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Take up freelance projects and earn while you study.</p>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  const links = [
    {
      label: "Home",
      href: "#",
      icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentSection(AppSection.HOME)
    },
    {
      label: "Courses",
      href: "#",
      icon: <BookOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentSection(AppSection.COURSES)
    },
    {
      label: "Materials",
      href: "#",
      icon: <Library className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentSection(AppSection.MATERIALS)
    },
    {
      label: "Jobs",
      href: "#",
      icon: <Briefcase className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentSection(AppSection.JOBS)
    },
    {
      label: "Freelance",
      href: "#",
      icon: <Banknote className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentSection(AppSection.FREELANCE)
    },
    {
      label: "Webinars",
      href: "#",
      icon: <Video className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentSection(AppSection.WEBINARS)
    },
    {
      label: "Resume AI",
      href: "#",
      icon: <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentSection(AppSection.RESUME)
    },
    {
      label: "AI Lab",
      href: "#",
      icon: <Bot className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setCurrentSection(AppSection.AI_LAB)
    },
  ];

  return (
    <div className={cn(
      "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-screen",
    )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo open={open} />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <SignedIn>
              <SidebarLink
                link={{
                  label: "Logout",
                  href: "#",
                  icon: <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                  onClick: () => signOut()
                }}
              />
            </SignedIn>
            <SignedOut>
              <SidebarLink
                link={{
                  label: "Login",
                  href: "#",
                  icon: <LogIn className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                  onClick: () => setCurrentSection(AppSection.LOGIN)
                }}
              />
            </SignedOut>
            <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <SidebarLink
                link={{
                  label: "Profile",
                  href: "#",
                  icon: (
                    <SignedIn>
                      <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">U</div>
                    </SignedIn>
                  ),
                }}
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-auto bg-white dark:bg-neutral-900 relative">
        <Navbar currentSection={currentSection} setSection={setCurrentSection} />

        <div className="flex-1 overflow-y-auto pt-20 lg:pt-24">
          {renderSection()}

          <footer className="bg-primary text-slate-300 py-16 px-6 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center space-x-2 mb-6">
                  {/* Footer Logo */}
                  <img
                    src="/logo.jpeg"
                    alt="TYC Edutech Logo"
                    className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Where Passion Meets Innovation. Your gateway to excellence in tech education and career growth.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Contact Us</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center"><span className="text-slate-500 mr-2">Email:</span> hello@tycedu.com</li>
                  <li className="flex items-center"><span className="text-slate-500 mr-2">Phone:</span> +91 98765 43210</li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <AIChat />
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <InnerApp />
    </ClerkProvider>
  );
}

export const Logo = ({ open }: { open: boolean }) => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20 cursor-pointer">
      <img
        src="/logo.jpeg"
        className="h-8 w-8 flex-shrink-0 rounded-lg object-cover bg-white"
        alt="TYC Logo"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        TYC Edutech
      </motion.span>
    </div>
  );
};

export default App;