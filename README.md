# myNetwork

myNetwork is a lightweight local network monitor with a web interface. It helps you see devices on your LAN, track online/offline history, mark known devices, and expose metrics for dashboards.

This product is based on the original MIT-licensed WatchYourLAN project by aceberg and has been adapted/rebranded by Vesa Raul Bogdan.

## Features

- Scan one or more network interfaces
- Detect and list devices on the local network
- Track online/offline history
- Mark known and unknown devices
- Send notifications through Shoutrrr-compatible providers
- Export data to InfluxDB2 or Prometheus
- Mobile-oriented web UI

## Development

Run both backend and frontend from the frontend package:

```powershell
cd D:\RD\WatchYourLAN-MobileUI\frontend
npm run dev:full
```

Open the development frontend:

```text
http://127.0.0.1:5173/
```

The Go backend is served on:

```text
http://127.0.0.1:8840/
```

## Backend

Run the backend directly:

```powershell
cd D:\RD\WatchYourLAN-MobileUI\backend
go run ./cmd/myNetwork -d .\data
```

Default web GUI:

```text
http://127.0.0.1:8840/
```

## Frontend

Run only the frontend:

```powershell
cd D:\RD\WatchYourLAN-MobileUI\frontend
npm install
npm run dev
```

Build the frontend:

```powershell
npm run build
```

## Docker

Build the image locally:

```sh
docker build -t mynetwork .
```

Example run:

```sh
docker run --name mynetwork \
  -e "IFACES=$YOURIFACE" \
  -e "TZ=$YOURTIMEZONE" \
  --network="host" \
  -v $DOCKERDATAPATH/mynetwork:/data/myNetwork \
  mynetwork
```

The web GUI is available at:

```text
http://localhost:8840
```

## Configuration

Configuration can be provided through `config_v2.yaml`, environment variables, or the web UI.

Common variables:

| Variable | Description | Default |
| --- | --- | --- |
| `TZ` | Timezone for correct timestamps | |
| `HOST` | Listen address | `0.0.0.0` |
| `PORT` | Web GUI port | `8840` |
| `THEME` | Bootswatch theme name | `sand` |
| `COLOR` | `light` or `dark` | `dark` |
| `IFACES` | Network interfaces to scan, separated by spaces | |
| `TIMEOUT` | Time between scans in seconds | `120` |
| `ARP_ARGS` | Extra arguments for `arp-scan` | |
| `TRIM_HIST` | Remove history after this many hours | `48` |
| `USE_DB` | `sqlite` or `postgres` | `sqlite` |
| `PG_CONNECT` | PostgreSQL connection string | |
| `INFLUX_ENABLE` | Enable InfluxDB2 export | `false` |
| `PROMETHEUS_ENABLE` | Enable `/metrics` endpoint | `false` |

Default config directory:

```text
/data/myNetwork
```

## License And Attribution

myNetwork is distributed under the MIT License.

Original project:

- WatchYourLAN by aceberg
- Copyright (c) 2022 aceberg
- Original source: https://github.com/aceberg/WatchYourLAN

Modified/rebranded product:

- myNetwork by Vesa Raul Bogdan
- Copyright (c) 2026 Vesa Raul Bogdan

The original MIT copyright notice and permission notice are preserved in `LICENSE` as required by the MIT License.
