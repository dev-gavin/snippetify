import React from "react";
import ReactDOM from "react-dom/client";
import SnippetWork from "./pages/SnippetWork/index.tsx";
import JiraTicket from "./routes/JiraTicket.tsx";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SnippetWork />,
        errorElement: <h1>Error</h1>,
    },
    {
        path: "jira/",
        element: <JiraTicket />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
// ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
