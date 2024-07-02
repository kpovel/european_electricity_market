import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Provider } from "../ProviderTable";
import { env } from "../env";
import { Button } from "../components/Button";

export function UpdateProvider() {
  const { id } = useParams();
  const [provider, setProvider] = useState<null | {
    name: string;
    country: string;
    marketShare: string;
    renewableEnergy: string;
    yearlyRevenue: string;
  }>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(env.SERVER_URL + `/provider/${id}`);
      if (res.status === 200) {
        const json = (await res.json()) as Provider;

        setProvider({
          ...json,
          marketShare: String(json.market_share),
          renewableEnergy: String(json.renewable_energy_percentage),
          yearlyRevenue: String(json.yearly_revenue),
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!provider) {
    return <></>;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!provider) {
      return;
    }

    const res = await fetch(env.SERVER_URL + `/provider/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: provider.name,
        country: provider.country,
        market_share: Number(provider.marketShare),
        renewable_energy_percentage: Number(provider.renewableEnergy),
        yearly_revenue: Number(provider.yearlyRevenue),
      }),
    });
    if (res.status !== 200) {
      const text = await res.text();
      setError(text);
      return;
    }
    navigate("/");
  }
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create Electricity Provider</h1>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter name"
            type="text"
            value={provider.name}
            onChange={(e) => setProvider({ ...provider, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="country"
          >
            Country
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter country"
            value={provider.country}
            onChange={(e) => setProvider({ ...provider, country: e.target.value })}
            type="text"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="market-share"
          >
            Market Share
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={provider.marketShare}
            onChange={(e) =>
              setProvider({ ...provider, marketShare: e.target.value })
            }
            placeholder="Enter market share"
            type="number"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="renewable-energy"
          >
            Renewable Energy %
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="renewable-energy"
            value={provider.renewableEnergy}
            onChange={(e) =>
              setProvider({ ...provider, renewableEnergy: e.target.value })
            }
            placeholder="Enter renewable energy percentage"
            type="number"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="yearly-revenue"
          >
            Yearly Revenue
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={provider.yearlyRevenue}
            onChange={(e) =>
              setProvider({ ...provider, yearlyRevenue: e.target.value })
            }
            placeholder="Enter yearly revenue"
            type="number"
            required
          />
        </div>
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </form>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
