import { defineConfig } from "astro/config";

const [owner = "", repository = ""] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const isUserSite = repository === `${owner}.github.io`;
const base = isGithubPagesBuild && repository && !isUserSite ? `/${repository}` : "/";

export default defineConfig({
  site: "https://henriqueoelze.github.io",
  base,
  output: "static"
});
