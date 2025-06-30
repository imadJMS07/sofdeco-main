import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../layout/Layout";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Home from '@/pages/Home';

const Shop = lazy(() => import("../pages/shop/Index"));
const Blogs = lazy(() => import("../pages/blogs"));
const BlogDetail = lazy(() => import("../pages/blogs/BlogDetail"));
const Contact = lazy(() => import("../pages/contact/Index"));
const NotFound = lazy(() => import("../pages/NotFound/index"));
const ProductDetails = lazy(() => import("../pages/shop/components/ProductDetails"));
const Checkout = lazy(() => import("../pages/checkout/Index"));
const About = lazy(() => import("../pages/about"));
const FAQ = lazy(() => import("../pages/faq"));
const Privacy = lazy(() => import("../pages/privacy"));
const Terms = lazy(() => import("../pages/terms"));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children:[
            {
                index: true,
                element: <Home />,
            },
            {
                path: "products",
                element: <Shop />,
            },
            {
                path: "blogs",
                element: <Blogs />,
            },
            {
                path: "blogs/:blogId",
                element: (
                    <Suspense fallback={<Loading />}>
                        <BlogDetail />
                    </Suspense>
                ),
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "products/:productId",
                element: (
                    <Suspense fallback={<Loading />}>
                        <ProductDetails />
                    </Suspense>
                ),
            },
            {
                path: "checkout",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Checkout />
                    </Suspense>
                ),
            },
            {
                path: "about",
                element: (
                    <Suspense fallback={<Loading />}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "faq",
                element: (
                    <Suspense fallback={<Loading />}>
                        <FAQ />
                    </Suspense>
                ),
            },
            {
                path: "privacy",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Privacy />
                    </Suspense>
                ),
            },
            {
                path: "terms",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Terms />
                    </Suspense>
                ),
            }
        ],
    },
    {
        path:"*",
        element: <NotFound />,
    },
]);
export default router;