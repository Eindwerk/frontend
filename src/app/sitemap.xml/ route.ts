import { getAllUsers } from "@/lib/actions/getAllUsers";
import { getAllTeams } from "@/lib/actions/getAllTeams";
import { getAllStadiums } from "@/lib/actions/getAllStadiums";
import { slugify } from "@/lib/utils/slugify";

export async function GET() {
  const teams = await getAllTeams();
  const stadiums = await getAllStadiums();
  const users = await getAllUsers();

  let urls = `
    <url>
    <loc>https://groundpass.be/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://groundpass.be/profile/my-profile</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://groundpass.be/teams</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://groundpass.be/stadiums</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://groundpass.be/notifications</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://groundpass.be/new-post</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
  `;

  teams.forEach((team) => {
    urls += `
      <url>
        <loc>https://groundpass.be/profile/team/${team.id}/${slugify(
      team.name
    )}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
      </url>
    `;
  });

  stadiums.forEach((stadium) => {
    urls += `
        <url>
            <loc>https://groundpass.be/profile/stadium/${stadium.id}/${slugify(
      stadium.name
    )}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        </url>
        `;
  });

  users.forEach((user) => {
    urls += `
        <url>
            <loc>https://groundpass.be/profile/user/${user.id}/${slugify(
      user.name
    )}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        </url>
        `;
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
