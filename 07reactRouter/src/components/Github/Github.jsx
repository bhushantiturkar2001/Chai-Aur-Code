// OLD CODE (useState/useEffect approach) — kept for reference
// import React, { useEffect, useState } from "react";
//
// function Github() {
//   const [data, setData] = useState(null);
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     const user = "bhushantiturkar2001";
//     Promise.all([
//       fetch(`https://api.github.com/users/${user}`).then((r) => r.json()),
//       fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=8`).then((r) => r.json()),
//     ]).then(([userData, repoData]) => {
//       setData(userData);
//       setRepos(repoData);
//       setLoading(false);
//     });
//   }, []);
//
//   if (loading)
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-700"></div>
//       </div>
//     );
// }

// NEW CODE — React Router loader approach (data fetched before render)
import { useLoaderData } from "react-router-dom";

// Loader: exported and attached to the route in main.jsx
export const githubLoader = async () => {
  const user = "bhushantiturkar2001";
  const [userData, repoData] = await Promise.all([
    fetch(`https://api.github.com/users/${user}`).then((r) => r.json()),
    fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=8`).then((r) => r.json()),
  ]);
  return { userData, repoData };
};

function Github() {
  // useLoaderData gives us the resolved loader data — no loading state needed
  const { userData: data, repoData: repos } = useLoaderData();

  return (
    <div className="flex justify-center px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl">

        {/* Left — Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center text-center lg:w-72 shrink-0">
          <img
            src={data.avatar_url}
            alt={data.login}
            className="w-24 h-24 rounded-full ring-4 ring-orange-100 mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">{data.name || data.login}</h2>
          <p className="text-sm text-gray-400 mt-1">@{data.login}</p>
          {data.bio && <p className="text-sm text-gray-500 mt-3">{data.bio}</p>}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-8 w-full">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-lg font-bold text-orange-700">{data.followers}</p>
              <p className="text-xs text-gray-400 mt-1">Followers</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-lg font-bold text-orange-700">{data.following}</p>
              <p className="text-xs text-gray-400 mt-1">Following</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-lg font-bold text-orange-700">{data.public_repos}</p>
              <p className="text-xs text-gray-400 mt-1">Repos</p>
            </div>
          </div>

          {/* GitHub link */}
          <a
            href={data.html_url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Right — Repo List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex-1">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Recent Repositories
          </h3>
          <ul className="space-y-2">
            {repos.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-gray-400 shrink-0" viewBox="0 0 16 16">
                      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700 truncate group-hover:text-orange-700">
                      {repo.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    {/* Language badge */}
                    {repo.language && (
                      <span className="text-xs text-gray-400">{repo.language}</span>
                    )}
                    {/* Star count */}
                    <div className="flex items-center gap-1 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
                      </svg>
                      <span className="text-xs">{repo.stargazers_count}</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Github;
