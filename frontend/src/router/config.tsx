import type { RouteObject } from "react-router-dom";
// 모든 페이지는 즉시 로드 (사용자 경험 우선)
import JobSelect from "../pages/JobSelect";
import JobExperience from "../pages/JobExperience";
import ProblemSelect from "../pages/ProblemSelect";
import SolutionSelect from "../pages/SolutionSelect";
import Report from "../pages/Report";
import NotFound from "../pages/NotFound";

const routes: RouteObject[] = [
  {
    path: "/",
    // 첫 페이지는 Suspense 없이 즉시 렌더링
    element: <JobSelect />,
  },
  {
    path: "/problem-select",
    // 문제 선택 페이지도 Suspense 없이 즉시 렌더링 (직군 선택 직후 바로 보여주는 것이 중요)
    element: <ProblemSelect />,
  },
  {
    path: "/job-experience",
    // 경험 페이지도 Suspense 없이 즉시 렌더링 (직군 선택 화면이므로 빠르게)
    element: <JobExperience />,
  },
  {
    path: "/solution-select",
    // 솔루션 선택 페이지도 Suspense 없이 즉시 렌더링 (문제 선택 직후 바로 보여주는 것이 중요)
    element: <SolutionSelect />,
  },
  {
    path: "/report",
    // 리포트 페이지도 Suspense 없이 즉시 렌더링 (솔루션 선택 직후 바로 보여주는 것이 중요)
    element: <Report />,
  },
  {
    path: "*",
    // 404 페이지도 즉시 렌더링
    element: <NotFound />,
  },
];

export default routes;
