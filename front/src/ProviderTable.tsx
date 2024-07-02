import { useEffect, useState } from "react";
import { Edit } from "./icons/Edit";
import { Trash } from "./icons/Trash";
import { env } from "./env";
import { Link } from "react-router-dom";

export type Provider = {
  id: number;
  name: string;
  country: string;
  market_share: number;
  renewable_energy_percentage: number;
  yearly_revenue: number;
};

export function ProviderTable() {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(env.SERVER_URL + "/provider");

      const json = (await res.json()) as Provider[];
      setProviders(json);
    })();
  }, []);

  async function deleteProvider(id: number) {
    await fetch(env.SERVER_URL + `/provider/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  }

  return (
    <table className="w-full caption-bottom text-sm">
      <thead className="[&amp;_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            ID
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Name
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Country
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Market Share
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Renewable Energy %
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Yearly Revenue
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="[&amp;_tr:last-child]:border-0">
        {providers.map((p) => {
          return (
            <tr
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              key={p.id}
            >
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {p.id}
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {p.name}
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {p.country}
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {p.market_share}%
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {p.renewable_energy_percentage}%
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {p.yearly_revenue}
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="flex items-center gap-2">
                  <Link to={`/update/${p.id}`}>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                      <Edit />
                    </button>
                  </Link>
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    onClick={() => deleteProvider(p.id)}
                  >
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
