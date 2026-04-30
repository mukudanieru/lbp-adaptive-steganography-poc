import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-full max-w-5xl border">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
