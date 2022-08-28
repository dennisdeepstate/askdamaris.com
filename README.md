# Set up

install mongodb and redis

```bash
# npm install
npm install

# create directories
mkdir errologs
mkdir uploads

npm run dev
```

## .env

```bash
MONGODB_URI = " "
DB_NAME = " "
NODE_ENV = "development" // "production", "testing"
DEV_URL = "http://localhost:3000"
PROD_URL = "https://askdamaris.com"

BUNNY_LIB_ID = " "
BUNNY_KEY = " "
```
## Building

To create a production version of your app:

```bash
npm run build
```