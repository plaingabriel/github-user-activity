# GitHub User Activity

A simple Node.js script to fetch and display recent activity for a given GitHub user.

## Key Features & Benefits

- Fetches recent GitHub events for a specified user.
- Uses `chalk` to visually highlight specific characters in the output (potentially useful for identifying specific event types or data).
- Provides a basic framework for further analysis or customization of GitHub user activity monitoring.

## Prerequisites & Dependencies

Before running this project, ensure you have the following installed:

- **Node.js:** A JavaScript runtime environment. Version 24 or higher is recommended.
- **pnpm:** A package manager. You can install it globally using npm: `npm install -g pnpm`. (Although npm or yarn can be used, pnpm is the preferred package manager for this project.)

## Installation & Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd github-user-activity
    ```

    Replace `<repository_url>` with the actual URL of your forked repository.

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

    This command installs the project's dependencies, including `chalk`. If you prefer npm or yarn, you can use `npm install` or `yarn install` accordingly.

## Usage Examples

To run the script and fetch activity for a specific GitHub user, execute the following command:

```bash
pnpm start <github_username>
```

Replace `<github_username>` with the actual GitHub username you want to inspect. For example:

```bash
pnpm start plaingabriel
```

This will fetch the user's activity from the GitHub API and display it in the console, potentially with colored highlighting.

You can also use the development script to automatically restart on code changes:

```bash
pnpm dev <github_username>
```

[Go to the project idea from roadmap.sh](https://roadmap.sh/projects/github-user-activity)
