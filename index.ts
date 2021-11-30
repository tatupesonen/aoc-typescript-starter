require("dotenv").config();
const { spawn } = require("child_process");
import { mkdirSync, existsSync, writeFileSync, readdirSync } from "fs";
import { downloadInputForYearAndDay, getPuzzleDescription } from "./utils/aoc-actions";
import { cp } from "shelljs";

const languageMappings = {
  rust: "rs",
  rs: "rs",
  typescript: "ts",
  ts: "ts",
} as const;

type Language = keyof typeof languageMappings;

const action = process.argv[2];
const year = process.argv[3];
const day = process.argv[4];
const lang = process.argv[5];

const createFromTemplate = async () => {
  let path = `./challenges/${year}/${day}`;
  if (!existsSync(path)) {
    console.log(`Creating challenge to ${path} from template...`);
    mkdirSync(`challenges/${year}/${day}`, { recursive: true });
    //Copy template
    cp("-rf", `template/${lang ? languageMappings[lang as keyof typeof languageMappings] : "ts"}/*`, path);
  }

  if (!existsSync(`${path}/input.txt`)) {
    console.log(`Downloading input...`);
    let input = await downloadInputForYearAndDay(day, year);
    writeFileSync(`${path}/input.txt`, input as string);
  }
  let readme = await getPuzzleDescription(year, day);
  writeFileSync(`${path}/README.md`, readme as string);
};

if (action === "create") {
  createFromTemplate();
}


if (action === "run") {
  const folder = `challenges/${year}/${day}/`;
  const filesInFolder = readdirSync(folder);
  const extension = filesInFolder.find((e) => e.includes("index"))?.split(".")[1] as Language;
  const file = `index.${extension}`;
  if (existsSync(folder + file)) {
    switch (extension) {
      case "rs":
      case "rust":
        spawn("cargo", ["run", folder + file], {
          stdio: "inherit",
          shell: true,
          cwd: folder,
        });
        break;
      default:
        spawn("nodemon", ["-x", "ts-node", `challenges/${year}/${day}/index.ts ${year} ${day}`], {
          stdio: "inherit",
          shell: true,
        });
    }
  }
}
