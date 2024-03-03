const app = require("./app");
const dbConnect = require("./db/connect");

async function bootstrap() {
  try {
    console.log("Please wait db is connecting ...");
    await dbConnect();

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(
        `DB is connected and App is listening on the PORT ${PORT} ...`
      );
    });
  } catch (err) {
    console.log("App Bootstrap Error", err);
  }
}

bootstrap();
