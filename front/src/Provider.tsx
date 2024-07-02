import { Link } from "react-router-dom";
import { Button } from "./components/Button";
import { ProviderTable } from "./ProviderTable";

export function Provider() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Electricity Providers</h1>
        <Link to="/provider/create">
          <Button>Create</Button>
        </Link>
      </div>
      <div className="relative w-full overflow-auto">
        <ProviderTable />
      </div>
    </div>
  );
}
