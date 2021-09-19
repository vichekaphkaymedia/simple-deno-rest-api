# Create a RESTful API with Deno using MongoDB

> In this article we are going to create a RESTful API with CRUD functionalities. We're going to talk about Deno in detail and build a server using Oak, which is a minimalistic middleware framework (similar to Express).

#### Prerequisites

At least some basic knowledge of these technologies / concepts is required.

- ES6 Features
- TypeScript
- RESTful APIs
- MongoDB

#### What is Deno? 🦕

> Similar to Node.js, Deno is a JavaScript / TypeScript runtime based on the V8 JavaScript Engine. It was created by Ryan Dahl (also the creator of Node.js).

#### Why should we use Deno?

- Built-in support for TypeScript
- Runs in a sandbox and is secure by default
- De-centralized packages
- ES Modules
- Top Level Await

#### Installation ⚙️

Using Shell (macOS and Linux):
`curl -fsSL https://deno.land/x/install/install.sh | sh`

Using PowerShell (Windows):
`iwr https://deno.land/x/install/install.ps1 -useb | iex`

For more installation options checkout the [documentation](https://deno.land/manual/getting_started/installation)

To test your installation, run `deno --version`. If this prints the Deno version to the console the installation was successful.

To run the server, go to your project directory and execute this command
`deno run --allow-all server.ts`