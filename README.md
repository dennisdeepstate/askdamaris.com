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
BUNNY_LIB_ID = " "
BUNNY_KEY = " "
DB_NAME = " "
MONGODB_URI = " "
PUBLIC_NODE_ENV = "development" // "production", "testing"
PUBLIC_DEV_URL = "http://localhost:5173"
PUBLIC_PROD_URL = "https://askdamaris.com"
```
## Building

To create a production version of your app:

```bash
npm run build
```