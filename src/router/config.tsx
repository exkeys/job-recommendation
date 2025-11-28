
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import JobSelect from "../pages/JobSelect";
import ProblemSelect from "../pages/ProblemSelect";
import SolutionSelect from "../pages/SolutionSelect";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <JobSelect />,
  },
  {
    path: "/problem-select",
    element: <ProblemSelect />,
  },
  {
    path: "/solution-select",
    element: <SolutionSelect />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
