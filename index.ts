import { PathLike } from "fs";

require('dotenv').config();
const { spawn, execSync } = require("child_process")
const { readdirSync, mkdirSync, existsSync, writeFileSync } = require("fs");
import { downloadInputForYearAndDay, getPuzzleDescription } from './utils/aoc-actions';
import path from 'path';
import { cp } from 'shelljs';

const action = process.argv[2]
const year = process.argv[3]
const day = process.argv[4]


const createFromTemplate = async () => {
  let path = `./challenges/${year}/${day}`;
  if (!existsSync(path)) {
    console.log(`Creating challenge to ${path} from template...`);
    mkdirSync(`challenges/${year}/${day}`, { recursive: true});
    //Copy template
    cp('-rf', "template/*", path);
  }

  if (!existsSync(`${path}/input.txt`)) {
    console.log(`Downloading input...`);
    let input = await downloadInputForYearAndDay(day, year);
    writeFileSync(`${path}/input.txt`, input)
  }
  let readme = await getPuzzleDescription(year, day);
  writeFileSync(`${path}/README.md`, readme)
}

if (action === 'create') {
  createFromTemplate();
}

if (action === 'run') {
  const path = `challenges/${year}/${day}/index.ts`;
  if (existsSync(path)) {
    spawn("nodemon", ["-x", "ts-node", `challenges/${year}/${day}/index.ts ${year} ${day}`], {
      stdio: "inherit",
      shell: true,
    })
  }
}