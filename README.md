
# Akhar: Punjabi Games

An educational app designed to help users learn Punjabi alphabets and numbers in a fun and interactive way. The app offers a variety of games that are not age-specific, making it a great tool for both children and adults.

With its user-friendly interface and engaging gameplay, Akhar: Punjabi Games makes learning an enjoyable experience. 

Download now and start exploring the world of Punjabi language!


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

The following variables are required to connect Firebase analytics :

`API_KEY`, 
`AUTH_DOMAIN`, 
`APP_ID`, 
`PROJECT_ID`, 
`STORAGE_BUCKET`, 
`MESSAGING_SENDER_ID`, 
`MEASUREMENT_ID`


## Installation & Setup

Make sure you've [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) & [`nodejs`](https://nodejs.org/en/) installed in your system. We advise using Node version 8 or above, and npm version 5.7 or above.

Open terminal and follow these steps;

- Step 1: Clone the repo.

```bash
git clone https://github.com/KhalisFoundation/akhar-punjabi-games/
```

You should now see a `Akhar-Punjabi-Games` folder in your present working directory. Let's change directory to it.

```bash
cd akhar-punjabi-games/
```

- Step 2: Install dependencies.

```bash
# `ci` doesn't update package.json, and uses package-lock.json to install intended deps.
# This makes it pretty speedy and doesn't cause unintended updates.
npm ci
```

This will use `npm` that is included with `nodejs` to install project dependencies.

- Step 3: Start the project.

If you are running this project for the first time or did some change, run the following command,

```bash
expo start
```

If you come accross the following error:
```bash
 ERROR  Invariant Violation: AsyncStorage has been removed from react-native core. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage
```

It is a well-known issue in react-native which can be resolved by commenting the code shown below in the file at destination 'node_modules/react-native/index.js'. Save and redo step 3 (if the issue persists, feel free to post it)

![rnasyncfix](https://user-images.githubusercontent.com/51584037/236684558-5d64b274-304d-402a-9eb1-b9c0f9ec4a0c.gif)

- Step 4: Access your local dev environment of the Akhar Punjabi Games app

The App can be run in a simulator by using the Expo Go menu.

OR

You can run the app on your device by scanning QR code using Expo Go app. For more info, you can refer to the [`docs`](https://docs.expo.dev/workflow/run-on-device/#running-a-project-in-expo-go)
## Contributing

Contributions are always welcome!

Join our [Slack](https://khalis.slack.com/) channel to stay tuned and explore other awesome projects by Khalis.

Before raising a pull request, please go through [CONTRIBUTING.md](CONTRIBUTING.md). We use `dev` branch as the development branch, while `master` is the production branch. You should branch out from `dev` branch and raise a PR against `dev` branch.



## License

[OSL](/LICENSE)

All images and assets not covered under other licenses are covered under full Copyright © 2023 Khalis Foundation.
