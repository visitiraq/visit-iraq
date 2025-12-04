import { execSync } from "child_process";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

async function generateContentTypes() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const envId = process.env.CONTENTFUL_ENVIRONMENT || "master";
  const token = process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN;

  if (!spaceId || !token) {
    console.error(
      "❌ Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN in .env"
    );
    process.exit(1);
  }

  const outputDir = path.resolve("src/__generated__");
  const outputFile = path.join(outputDir, "content-types.json");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("📡 Fetching content types from Contentful...");

  try {
    execSync(
      `npx contentful space export --space-id ${spaceId} --environment-id ${envId} --skip-content --content-file ${outputFile} --management-token ${token}`,
      { stdio: "inherit" }
    );

    console.log(`✅ Contentful content types exported to ${outputFile}`);
  } catch (error: unknown) {
    console.error(
      "❌ Failed to fetch Contentful content types:",
      (error as Error).message
    );
    process.exit(1);
  }

  console.log("⚙️ Generating TypeScript types from content types...");

  try {
    execSync(
      `npx cf-content-types-generator src/__generated__/content-types.json --typeguard --v10 --out src/__generated__/contentful`,
      { stdio: "inherit" }
    );

    console.log(
      "✅ TypeScript types successfully generated in src/__generated__/contentful"
    );
  } catch (error: unknown) {
    console.error(
      "❌ Failed to generate TypeScript types:",
      (error as Error).message
    );
    process.exit(1);
  }
}

generateContentTypes();
