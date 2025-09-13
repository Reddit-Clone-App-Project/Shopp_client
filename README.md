# Shopp E-commerce Platform

An open-source e-commerce platform built with Vite, React, Redux, and Tailwind CSS, focused on performance and a modern user experience.

## 🚧 Project Status

This project is currently **in active development**. We are building it from the ground up and the structure or code may change frequently. We are excited about where it's heading and welcome collaboration!

## 🤝 Open to Contributions

This is an open-source project, and we welcome developers to contribute! If you are looking to learn, collaborate, or build your portfolio, feel free to join in.

The contribution model is simple:
1.  **Fork** the repository to your own account.
2.  Create your feature branch and make your changes.
3.  Submit a **Pull Request** back to our main branch.

We will review all pull requests and work with you to get them merged.

## 🛠️ Tech Stack

This project is built using a modern and powerful set of technologies:

* **[Vite](https://vitejs.dev/):** Next-generation frontend tooling for a lightning-fast development experience.
* **[React](https://reactjs.org/):** A JavaScript library for building dynamic and responsive user interfaces.
* **[TypeScript](https://www.typescriptlang.org/):** For robust, scalable, and maintainable code with static type checking.
* **[Redux](https://redux-toolkit.js.org/) (with Redux Toolkit):** For predictable and centralized state management.
* **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher is recommended) and `npm` or `yarn` installed on your machine.

### Installation & Setup

1.  **Fork the repository** to your own GitHub account.

2.  **Clone your fork** to your local machine (remember to replace `YOUR-USERNAME` and `shopp-e-commerce-platform` with your actual repository details):
    ```sh
    git clone [https://github.com/YOUR-USERNAME/shopp-e-commerce-platform.git](https://github.com/YOUR-USERNAME/shopp-e-commerce-platform.git)
    ```

3.  Navigate to the project directory:
    ```sh
    cd shopp-e-commerce-platform
    ```

4.  Install the required dependencies:
    ```sh
    npm install
    ```
    *(or `yarn install` or `pnpm install`)*

5.  Run the development server:
    ```sh
    npm run dev
    ```

6.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal) to see the application live.

### Docker Deployment

1.  Make sure `docker` is installed in your system with the compose plugin.

2.  Create a directory for the project and download the `compose.yaml` file from the repository:
    ```sh
    mkdir shopp_server
    cd shopp_server
    wget https://github.com/Reddit-Clone-App-Project/Shopp_client/raw/refs/heads/main/compose.yaml
    ```

3.  Download the example .env file and edit it to include your necessary server credentials.\
    **Note:** Make sure the .env file on the host has AT LEAST read access for all users for the user inside the container to be able to read the file. You can do this with `chmod a+r .env` after editing the file.
    ```sh
    wget https://github.com/Reddit-Clone-App-Project/Shopp_client/raw/refs/heads/main/env.example
    mv env.example .env
    nano .env # edit the file then save with Ctrl+S
    ```

4.  Let Docker Compose pull the image and run the server for you:
    ```sh
    docker compose up

    # run docker compose up -d for it to be detached
    # use docker compose down to stop and remove the container
    ```

## How to Contribute

We'd love to see your contributions!

1.  Create a new branch for your feature or bug fix:
    ```sh
    git checkout -b feature/your-amazing-feature
    ```
2.  Make your changes and commit them with a clear and descriptive message.
    ```sh
    git commit -m "feat: Implement the new user dashboard"
    ```
3.  Push your changes to your forked repository:
    ```sh
    git push origin feature/your-amazing-feature
    ```
4.  Open a **Pull Request** from your branch to our `main` branch and describe the changes you've made.

Thank you for your interest in contributing!
