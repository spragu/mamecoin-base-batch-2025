# mamecoin-base-batch-2025
![MameCoin Logo](./mamecoin-frontend/public/images/logo2.png)
Our project entry for base batch na 2025
# TLDR: what is MameCoin?
MameCoin is a plug-and-play stablecoin payment system for arcades, enabling onchain seamless tap-to-play experiences through retrofitted NFC hardware and powered by Base.

# High level user flow
```mermaid
graph LR
Onboard[Tap welcome sticker nfc]
Onramp[Onramp to USDC]
Subscribe[Approve spending permission]
Play[Tap play sticker]

Onboard --> Onramp --> Subscribe --> Play
```

# Physical Arcade tech
**Microprocessor** (pi pico w) - Sets inside the machine & listens for incoming transactions to the arcade games wallet/contract and sends a coin insert pulse to the arcade machine when it detects a payment. Microprocessors are very cheap in bulk.

**"Tap Pay Play sticker"**  - Has nfc sticker(s) with pre programmed payment url for each arcade machine. Can use any design you want and nfc stickers work underneath! This is passive tech that doesnt require any additional power/wiring from the arcade machine. Cheap and easy to replace. 

# Frontend App
This is where the user onboards and onramps. Created following (mostly) the tutorial from https://docs.base.org/identity/smart-wallet/guides/spend-permissions
     
     cd mamecoin-frontend
     npm i
     npm run dev
 
# Wallet Monitor script
This would typically be running on the microprocessor inside the arcade machine. It listens for incoming transactions to the arcade machines wallet/contract address and will pulse the coin insert signal when it detects a blockchain payment.

For this hackathon demo we just run a nodejs script on the windows machine running the arcade game. The script simulates a keystroke for inserting a coin but that method would be replaced with a method to send a pulse to the wire for the coin insert signal.

    cd wallet-mon
    npm i
    node app.js
