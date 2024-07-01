create table electricity (
    id                          integer primary key autoincrement,
    name                        text not null,
    country                     text not null,
    market_share                real not null,
    renewable_energy_percentage real not null,
    yearly_revenue              int  not null
) strict;