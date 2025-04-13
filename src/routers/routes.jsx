// routes/router.jsx
import { lazy } from 'react';
import { publicRoutes } from './PublicRoutes';



// Lazy components
const Home = lazy(() => import(/* webpackChunkName: "LazyLayout" */'../pages/Dummy_Views/Dummy_View'));
const Form = lazy(() => import(/* webpackChunkName: "LazyLayout" */'../pages/Dummy_Formularios/views/Dummy_Simple_Form'));



export const routes = [
    publicRoutes,
]

