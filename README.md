# ![favicon](./public/favicon.png) Les flamboyants

### Specifications

- **Language** : [Typescript](https://www.typescriptlang.org/)
- **Runtime** : [pnpm](https://pnpm.io/)
- **Framework** : [Astro](https://astro.build/) | [React](https://react.dev/)
- **Database** : [mongodb](https://www.mongodb.com/)

The application configuration is define in the `package.json` file. It's the ID
card of the project, where alias to the main folders, compiler options and
dependencies import are set.

## How does it works ?

First of all, you have to install a **_MongoDB_** tool on your machine.

- You can download
  [_MongoDB compass_](https://www.mongodb.com/try/download/compass), a **user
  friendly tool** to handle interaction with the database.
- If you prefer command line tools, you can download the
  [_MongoDB Shell_](https://www.mongodb.com/try/download/shell) or the
  [_Atlas CLI_](https://www.mongodb.com/try/download/atlascli).

After your DB configuration, you have to create a `.env` file, to set your
**environnement variables**. Check the `.env.example` file to identify the
necessary keys you have to set :

```
APP_ENV="local"
PORT=3000
HOST=127.0.0.1
APP_URL="http://127.0.0.1:3000"
APP_SESSION_NAME="your_session_name"
DATABASE_HOST="your/database/url"
DATABASE_USERNAME="your_database_username"
DATABASE_PASSWORD="your_database_password"
EMAIL_ADDRESS="your_email_address"
EMAIL_USERNAME="your_email_username"
EMAIL_PASSWORD="your_email_password"
```

Then, you can start working with the applicatiton by running this command :

```sh
pnpm dev
```

## What is the architecture ?
