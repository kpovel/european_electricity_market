import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { env } from "../env";
import { useNavigate } from "react-router-dom";

export function CreateProvider() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    country: "",
    marketShare: "",
    renewableEnergy: "",
    yearlyRevenue: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(env.SERVER_URL + "/provider", {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        country: values.country,
        market_share: Number(values.marketShare),
        renewable_energy_percentage: Number(values.renewableEnergy),
        yearly_revenue: Number(values.yearlyRevenue),
      }),
    });
    if (res.status !== 201) {
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
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
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
            value={values.country}
            onChange={(e) => setValues({ ...values, country: e.target.value })}
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
            value={values.marketShare}
            onChange={(e) =>
              setValues({ ...values, marketShare: e.target.value })
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
            value={values.renewableEnergy}
            onChange={(e) =>
              setValues({ ...values, renewableEnergy: e.target.value })
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
            value={values.yearlyRevenue}
            onChange={(e) =>
              setValues({ ...values, yearlyRevenue: e.target.value })
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
