import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Landing } from "./pages/Landing";
import { PredictionWorkspace } from "./pages/PredictionWorkspace";
import { PredictionResults } from "./pages/PredictionResults";
import { History } from "./pages/History";
import { Dashboard } from "./pages/Dashboard";
import { Expenses } from "./pages/Expenses";
import { Budgets } from "./pages/Budgets";
import { Fields } from "./pages/Fields";
import { Users } from "./pages/Users";
import { Alerts } from "./pages/Alerts";
import { Reports } from "./pages/Reports";
import { About } from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "predict", Component: PredictionWorkspace },
      { path: "results", Component: PredictionResults },
      { path: "history", Component: History },
      { path: "dashboard", Component: Dashboard },
      { path: "expenses", Component: Expenses },
      { path: "budgets", Component: Budgets },
      { path: "fields", Component: Fields },
      { path: "users", Component: Users },
      { path: "alerts", Component: Alerts },
      { path: "reports", Component: Reports },
      { path: "about", Component: About },
    ],
  },
]);
