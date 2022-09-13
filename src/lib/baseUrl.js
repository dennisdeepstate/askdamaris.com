import { PUBLIC_DEV_URL, PUBLIC_NODE_ENV, PUBLIC_PROD_URL} from '$env/static/public';

const baseUrl = PUBLIC_NODE_ENV === "production" ? PUBLIC_PROD_URL : PUBLIC_DEV_URL;

export default baseUrl;