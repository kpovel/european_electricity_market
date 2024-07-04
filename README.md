# European Electricity Market

## How to run

### Requirements

Node.js 22 or later.

### Back-end

1. Enter Back-end directory

```bash
cd back
```

2. Install dependencies

```bash
npm install
```

3. Enter environment variables and edit it

```bash
cp .env.example .env
vim .env
```

> [!NOTE]
> Enter `DATABASE_URL` in a format:
> `DATABASE_URL=file:path/to/database`

4. Run Back-end server

```bash
npm run dev
```

### Front-end

1. Enter Front-end directory

```bash
cd front
```

2. Install dependencies

```bash
npm install
```

3. Run Front-end application

```bash
npm run dev
```
