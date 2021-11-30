# Requirements
Node, tested on Node 16
npm

## Setup
```
npm install
```
You also need to create a `.env` file at project root with the contents of:
`SESSION_COOKIE=your advent-of-code session cookie`

## Usage
Let's say you want to create the project structure for 2020's day 1 challenge. To scaffold the project, get input & README, you would run:
```bash
npm start create 2020 1
# for languages, add "ts", "typescript", "rs" or "rust" at the end of the file. Same goes for running.
npm start create 2020 1 rust
```

To run the challenge, you would run:
```
npm start run 2020 1
```
