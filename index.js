import chalk from "chalk";

const username = process.argv[2];

if (!username) {
  console.log("Please provide a GitHub username as an argument.");
  process.exit(1);
}

const url = `https://api.github.com/users/${username}/events`;

function colorizeSelectedChars(string, charsToColorize, callback) {
  let newString = "";

  for (const char of string) {
    if (charsToColorize.includes(char)) {
      newString += callback(char);
      continue;
    }

    newString += char;
  }

  return newString;
}

function colorizeSelectedStrings(string, stringsToColorize, callback) {
  const stringArray = string.split(" ");

  stringArray.forEach((word, index) => {
    if (stringsToColorize.includes(word)) {
      stringArray[index] = callback(word);
    }
  });

  return stringArray.join(" ");
}

function makeNumbersToColor(string, callback) {
  const stringArray = string.split(" ");

  stringArray.forEach((word, index) => {
    if (!isNaN(word)) {
      stringArray[index] = callback(word);
    }
  });

  return stringArray.join(" ");
}

try {
  const response = await fetch(url);
  const events = await response.json();

  if (events.status === "404") {
    console.log("User not found");
    process.exit(1);
  }

  await Promise.all(
    events.map(async (event) => {
      let action;

      switch (event.type) {
        case "PushEvent":
          const commitCount = event.payload.commits.length;
          action = `Pushed ${commitCount} ${
            commitCount === 1 ? "commit" : "commits"
          } to ${event.repo.name}`;
          break;

        case "IssuesEvent":
          action = `${
            event.payload.action.charAt(0).toUpperCase() +
            event.payload.action.slice(1)
          } a new issue in ${event.repo.name}`;
          break;

        case "CreateEvent":
          action = `Created a new ${event.payload.ref_type} in ${event.repo.name}`;
          break;

        case "WatchEvent":
          action = `Starred ${event.repo.name}`;
          break;

        case "ForkEvent":
          action = `Forked ${event.repo.name}`;
          break;

        case "PublicEvent":
          action = `Published ${event.repo.name}`;
          break;

        case "IssueCommentEvent":
          action = `Commented on an issue in ${event.repo.name}`;
          break;

        default:
          action = `${event.type.replace(/Event$/, "")} on ${event.repo.name}`;
          break;
      }

      action = colorizeSelectedChars(action, ["/", "-"], chalk.red);
      action = colorizeSelectedStrings(action, ["new", "in", "on"], chalk.red);
      action = colorizeSelectedStrings(action, ["to"], chalk.green);
      action = makeNumbersToColor(action, chalk.cyan);

      console.log("- ", action);
    })
  );
} catch (error) {
  console.error(error);
}
