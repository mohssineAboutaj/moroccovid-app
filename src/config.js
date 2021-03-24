// site title, description, & general info
/**
 * @type {String} website title
 */
const title = "Morocco Covid Statistics";

/**
 * @type {String} website author
 */
const author = "Mohssine Aboutaj";

// links & routes
/**
 * @type {Array} all routes in the application
 *
 * @property {String} icon icon to show aside to the route title
 * @property {String} title title of the route
 * @property {String} to path of the route
 * @property {Function} component component name of the route
 * @property {Boolean} hidden hidden from navbar or any navigation bar
 */
let links = [
  {
    icon: "home",
    title: "Home",
    to: "/",
    component: "Home",
  },
  {
    icon: "comment-medical",
    title: "Preventive Advice",
    to: "/advice",
    component: () =>
      import(
        /* webpackChunkName: "Advice" */
        `@/views/Advice.vue`
      ),
  },
  {
    icon: "newspaper",
    title: "official news",
    to: "/news",
    component: () =>
      import(
        /* webpackChunkName: "News" */
        `@/views/News.vue`
      ),
  },
  {
    icon: "info-circle",
    title: "About",
    to: "/about",
    component: () =>
      import(
        /* webpackChunkName: "About" */
        `@/views/About.vue`
      ),
  },
];

// exporting
export { title, links, author };
