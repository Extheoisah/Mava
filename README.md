# Amavas

## Amavas backend

- Written in Typescript
- Open source 😉

Amavas is a platform that facilitates Bitcoin payments for business owners through POS devices at designated locations. Business owners can securely receive Bitcoin payments, and subsequently, they have the flexibility to withdraw the funds to a bank account of their choosing or transfer them to on-chain or off-chain wallets as per their preferences.

![License](https://img.shields.io/badge/license-MIT-232323.svg?style=flat-square)

## Features

- [ ] Receive Off-Chain Payment
- [ ] Receive On-Chain Payment
- [ ] Dedicated Point of Sale Device(POS)
- [ ] Withdraw Off-Chain
- [ ] Withdraw On-Chain
- [ ] Withdraw to Fiat Account

## Reproducible Build (**Don't trust, verify**)

Start by [forking the repo](https://github.com/Extheoisah/Mava) from GitHub, clone it locally and install dependencies.

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Mava
cd Mava
```

### Developing

Once you've cloned/forked the repo, installed dependencies, run the following command.

## How to run server

We use docker for running our app/servers

1. Copy the sample env file

```bash
cp .env.sample .env
```

2. Start docker locally and run

```bash
make start
```

3. To run migrations

```bash
make migrate
```

4. To run Seed

```bash
make seed
```

5. To stop the docker process

```bash
make stop
```

6. Start the server

```bash
make start
```

## License

Amavas backend is 100% open-source and available under the MIT license.
