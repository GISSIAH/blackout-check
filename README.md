## Getting Started

Add **.env** file, just rename the **.example.env** to **.env**
## Setup Database

Add the Postges DB URL to the environment variables 

To create the Database schema run the following

```bash
yarn db:push
```

To seed data

```bash
yarn db:seed
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
