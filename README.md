# Firebase Boilerplate
This is a basic boilerplate code for standing up a PWA with Firebase, Express, Preact & Mobx. It also utilizes service workers, manifest file, http/2, heavy caching & more to get you a 100/100 Lighthouse score out of the box.

### Install Dependencies
Because Firebase requires a separate `functions` directory with it's own dependencies, you will need to install the dependencies for client & server separately. Open the root in your terminal and then run the following:

```
$ npm install && cd functions && npm install && cd ../
```

---

### Configure Firebase
Firebase with will be setup and configured automatically in the Mobx store. However, for security reasons, the configuration keys are stored in a `.env` file, and kept out of the repo. Simply create a file name `.env` in the root of the project with info like this:

##### Required Keys
```
FB_API_KEY= 12345__67890
FB_PROJECT_ID= my-app
FB_MESSAGING_SENDER_ID= 125042732329
```

##### Required Keys
If omitted, these will be inferred based on the project id.
```
FB_STORAGE_BUCKET= my-app.appspot.com
FB_AUTH_DOMAIN= my-app.firebaseapp.com
FB_DB_URL= https://my-app.firebaseio.com
```

---

### Local Develoment
For most of your work you will want to simply run: `npm start` and then open [https://localhost:3000](https://localhost:3000)

This will start a webpack dev server serving the Preact files, as well as the express server with your API (proxied through webpack so you don't have to worry about different port numbers).

##### Enable SSL
Many PWA & modern web features require your site to run over https to work properly. Firebase will take care of that for us in production, but for local development, we're using [mkcert](https://github.com/FiloSottile/mkcert) to get ssl working locally.

You will need to install mkcert by following [these instructions](https://github.com/FiloSottile/mkcert#installation), then simply run this script:


```
$ npm run ssl:add
```

---

### Deploying

#### Prerequisites
In order to deploy to Firebase you'll need to add a `.firebaserc` file with the following content:

```
{
  "projects": {
    "default": "my-app-name"
  }
}
```

You'll obviously change `my-app-name` to whatever you firebase project id is. You only need to do this once.

Once you have a `.firebaserc` file, run the following from the project root:

```
$ npm run deploy
```
