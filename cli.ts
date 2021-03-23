import { Select } from "https://deno.land/x/cliffy/prompt/select.ts";

const { readDirSync, cwd } = Deno
const baseDir = cwd()
const algorithmsList = Array.from(readDirSync("./data-structures"))

const selectedScript: string = await Select.prompt({
  message: "Pick a selectedScript",
  options: algorithmsList.map(({ name }) => ({
    name: name,
    value: `${baseDir}/data-structures/${name}`,
  })),
});

async function main() {
  const { run } = await import(selectedScript)
  run()
}

if (import.meta.main) {
  main()
}
