use std::fs;

fn part1(input: &String) -> Option<String> {
	let data = input.clone();	
	None
}

fn part2(input: &String) -> Option<String> {
	let data = input.clone();	
	None
}

// This code is here just to run your parts and to read input.
fn main() {
	let input = read_input();
	let output1 = part1(&input);
	let output2 = part2(&input);
	match output1 {
		Some(output) => println!("Solution 1: {}", output),
		None => println!("Part 1 doesn't return anything.")
	}
	match output2 {
		Some(output) => println!("Solution 2: {}", output),
		None => println!("Part 2 doesn't return anything.")
	}
}

fn read_input() -> String {
	let filename = "input.txt";
	fs::read_to_string(filename).expect("Couldn't read the input file.")
}