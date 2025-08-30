import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/auth/auth-layout.tsx", [
        index("routes/root/Home.tsx"),
        route("sign-in", "routes/auth/sign-in.tsx"),
        route("sign-up", "routes/auth/sign-up.tsx"),
    ]),
] satisfies RouteConfig;
