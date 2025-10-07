const username = "Juanperias";
const url = `https://api.github.com/users/${username}/events`;

try {
  const response = await fetch(url);
  const events = await response.json();

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

        default:
          action = `${event.type.replace(/Event$/, "")} on ${event.repo.name}`;
          break;
      }

      console.log("- ", action);
    })
  );
} catch (error) {
  console.error(error);
}
