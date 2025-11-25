import { Outlet, Link } from "react-router-dom";

export function ConsoleLayout() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 border-b flex items-center px-4">
        <h1 className="font-semibold text-lg">Twilio Console (dev)</h1>
      </header>

      <div className="flex flex-1">
        <nav className="w-64 border-r p-4 space-y-2">
          <Link to="/movies" className="block py-2">Movies</Link>
        </nav>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
