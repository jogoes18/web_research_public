// mport { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

// import { ERoutes } from './routes';
// import { useLoginStore } from '../store/loginStore.store';

// export function requireAuth(
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalized,
//   next: NavigationGuardNext
// ) {
//   // Marcamos variables no usadas para que yarn compile
//   void from;

//   const loginStore = useLoginStore();
//   const isAuth: string | null = loginStore.getToken;

//   // Si el usuario está autenticado o la ruta no requiere token, permite el acceso
//   if (isAuth?.length || !to.meta.needsToken) {
//     next();
//   } else {
//     // Evita redirigir si ya estamos en la ruta de login: evita bucles infinitos
//     if (to.path === ERoutes.LOGIN_VIEW) {
//       next();
//     } else {
//       console.log('No estamos loggeados, redirigiendo a LOGIN_VIEW');
//       next(ERoutes.LOGIN_VIEW);
//     }
//   }
// }

// export function isLogged(
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalized,
//   next: NavigationGuardNext
// ) {
//   // Marcamos variables no usadas para que yarn compile
//   void from;

//   const loginStore = useLoginStore();
//   const isAuth: string | null = loginStore.getToken;

//   if (isAuth?.length) {
//     // Si el usuario está logueado, redirige solo si no está ya en la ruta destino: evita bucles infinitos
//     if (to.path !== ERoutes.DUOX_PARAMETERS_VIEW) {
//       console.log('Estamos loggeados, redirigiendo a DUOX_PARAMETERS_VIEW');
//       next(ERoutes.DUOX_PARAMETERS_VIEW);
//     } else {
//       next();
//     }
//   } else {
//     // Permite el acceso a LoginView si no está logueado
//     if (to.path === ERoutes.LOGIN_VIEW) {
//       next();
//     } else {
//       console.log('No estamos loggeados, redirigiendo a LOGIN_VIEW');
//       next(ERoutes.LOGIN_VIEW);
//     }
//   }
// }
