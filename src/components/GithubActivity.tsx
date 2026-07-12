"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GitBranch, Star, GitFork, GitCommit, Users, BookOpen } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface UserData {
  followers: number;
  public_repos: number;
}

export default function GithubActivity() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Fetch user data
    fetch("https://api.github.com/users/ayushkumarh078")
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error fetching GitHub user:", err));

    // Fetch latest repos
    fetch("https://api.github.com/users/ayushkumarh078/repos?sort=updated&per_page=4")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
      })
      .catch((err) => console.error("Error fetching GitHub repos:", err));
  }, []);

  return (
    <section id="github" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase block mb-3">
            07 — Open Source
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-4">
            <GitBranch size={40} /> GitHub Activity
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Calendar & Stats */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-black/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-hidden"
            >
              <h3 className="text-xl font-bold text-white mb-6">Contributions</h3>
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <GitHubCalendar 
                  username="ayushkumarh078" 
                  colorScheme="dark"
                  theme={{
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-white/[0.04] transition-colors"
              >
                <Users size={24} className="text-indigo-400 mb-3" />
                <span className="text-3xl font-black text-white">{userData?.followers || "-"}</span>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest mt-1">Followers</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 }}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-white/[0.04] transition-colors"
              >
                <BookOpen size={24} className="text-indigo-400 mb-3" />
                <span className="text-3xl font-black text-white">{userData?.public_repos || "-"}</span>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest mt-1">Repositories</span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Recent Repos */}
          <div className="flex-1 lg:max-w-md">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <GitCommit size={20} className="text-indigo-400" /> Recent Activity
            </h3>
            <div className="space-y-4">
              {repos.length === 0 ? (
                <div className="h-[400px] flex items-center justify-center border border-white/5 rounded-2xl bg-white/[0.01]">
                  <span className="text-white/30 font-mono text-sm animate-pulse">Loading repositories...</span>
                </div>
              ) : (
                repos.map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="block bg-black/40 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-5 hover:bg-white/[0.02] transition-all group"
                  >
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {repo.name}
                    </h4>
                    <p className="text-sm text-white/50 mb-4 line-clamp-2 leading-relaxed">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" /> {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1"><Star size={14} /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork size={14} /> {repo.forks_count}</span>
                    </div>
                  </motion.a>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
