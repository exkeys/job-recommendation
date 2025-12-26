import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import ErrorBoundary from "./components/ErrorBoundary";

function AppContent() {
  return <AppRoutes />;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={__BASE_PATH__}>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
