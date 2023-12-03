import { Router } from "./router.js";
import { FavoritesView } from "./favorites.js"

const router = new Router()

router.add("/", "/pages/home.html")
router.add("/git-fav", "/pages/git-fav.html")
router.add(404, "/pages/404.html")

router.handle()
window.onpopstate = () => router.handle()
window.route = () => router.route()

new FavoritesView("#app")