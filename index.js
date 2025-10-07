import chalk from "chalk";

const username = process.argv[2];

if (!username) {
  console.log("Please provide a GitHub username as an argument.");
  process.exit(1);
}

const url = `https://api.github.com/users/${username}/events`;

function makeRed(string) {
  return chalk.red(string);
}

function makeCharsRed(string, chars) {
  let newString = "";

  for (const char of string) {
    if (chars.includes(char)) {
      newString += makeRed(char);
      continue;
    }

    newString += char;
  }

  return newString;
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
          action = `Pushed ${chalk.cyan(commitCount)} ${
            commitCount === 1 ? "commit" : "commits"
          } to ${event.repo.name}`;
          break;

        case "IssuesEvent":
          action = `${
            event.payload.action.charAt(0).toUpperCase() +
            event.payload.action.slice(1)
          } a ${makeRed("new")} issue ${makeRed("in")} ${event.repo.name}`;
          break;

        case "CreateEvent":
          action = `Created a ${makeRed("new")} ${
            event.payload.ref_type
          } ${makeRed("in")} ${event.repo.name}`;
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

      const formatedAction = makeCharsRed(action, ["/", "-"]);

      console.log("- ", formatedAction);
    })
  );
} catch (error) {
  console.error(error);
}
