# mamecoin-base-batch-2025
![MameCoin Logo](./mamecoin-frontend/public/images/logo2.png)
Our project entry for base batch na 2025
# TLDR: what is MameCoin?
MameCoin allows arcade owners retrofit crypto payments alongside their existing payment mechanisms for physical and digital arcade machines.
# High level user flow
```mermaid
graph LR
Onboard[Tap welcome sticker nfc]
Onramp[Onramp to USDC]
Subscribe[Approve spending permission]
Play[Tap play sticker]

Onboard --> Onramp --> Subscribe --> Play
```
