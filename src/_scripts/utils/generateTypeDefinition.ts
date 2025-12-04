import fs from "fs/promises";
import path from "path";
import { formatWithPrettier } from "./formatWithPrettier";

type GenerateTypeDefinitionOptions<T> = {
  items: T[];
  key: keyof T | ((item: T) => string | undefined);
  typeName: string;
  outputFile: string;
};

export async function generateTypeDefinition<T>({
  items,
  key,
  typeName,
  outputFile,
}: GenerateTypeDefinitionOptions<T>) {
  const allValues = new Set<string>();

  items.forEach((item) => {
    const value =
      typeof key === "function" ? key(item) : (item[key] as unknown as string);
    if (value) {
      allValues.add(value);
    }
  });

  if (allValues.size === 0) {
    console.warn(`⚠ No values found to generate type for ${typeName}`);
    return;
  }

  const typeStrings = Array.from(allValues)
    .map((v) => JSON.stringify(v))
    .join(" | ");

  const typeDefinition = `export type ${typeName} = ${typeStrings};\n`;

  const outputPath = path.resolve(outputFile);
  await fs.writeFile(outputPath, typeDefinition, "utf-8");
  console.log(
    `✔ TypeScript type definition successfully written to ${outputFile}`
  );

  await formatWithPrettier(outputPath);
}
