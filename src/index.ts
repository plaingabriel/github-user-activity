const username = "plaingabriel";
const url = `https://api.github.com/users/${username}/events`;

try {
  const response = await fetch(url);
  const data = await response.json();

  // Test

  console.log(data);
} catch (error) {
  console.error(error);
}
