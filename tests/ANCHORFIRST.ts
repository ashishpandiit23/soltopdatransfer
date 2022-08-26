import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL,PublicKey, Transaction,SYSVAR_RENT_PUBKEY, MAX_SEED_LENGTH } from '@solana/web3.js';
import { use } from "chai";
import { AnchorFirst } from "../target/types/anchor_first";
import { sendAndConfirmTransaction } from "@solana/web3.js";
anchor.setProvider(anchor.AnchorProvider.local());
const idl = JSON.parse(
  require("fs").readFileSync("./target/idl/anchor_first.json", "utf8")
);
//const con = new Connection("https://api.devnet.solana.com");
const con = new Connection("http://127.0.0.1:8899");
const programId = new anchor.web3.PublicKey("AtGABXydX8hgbBeeRE46kLDDnPTuZtTd7Yi7HjwMRNSg");
const program = new anchor.Program(idl, programId);
let accountPrivKey=[10,253,54,31,72,166,218,19,232,230,34,160,61,168,131,124,210,200,176,27,106,10,193,194,185,33,2,177,22,104,131,211,115,37,129,62,106,8,148,244,136,49,12,128,247,75,199,128,229,66,147,206,80,68,111,148,147,59,168,48,7,232,195,2].slice(0,32);
let User_Wallet = anchor.web3.Keypair.fromSeed(Uint8Array.from(accountPrivKey));

describe("anchorFirst", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorFirst as Program<AnchorFirst>;

  it("Is initialized!", async () => {
    // Add your test here.
    let transaction = new anchor.web3.Transaction();
    let token_airdrop= await con.requestAirdrop(User_Wallet.publicKey, 10000000000);
    await con.confirmTransaction(token_airdrop);

    const [user_pda_ac, user_bump] = await anchor.web3.PublicKey.findProgramAddress(
      [User_Wallet.publicKey.toBuffer()],
      programId
    );

  console.log("print");
  let no_of_sol=1;
  transaction.add(await program.methods.initialize(user_bump,new anchor.BN(no_of_sol*LAMPORTS_PER_SOL))
  .accounts({
    accountUser : user_pda_ac,
    owner : User_Wallet.publicKey,
    systemProgram : anchor.web3.SystemProgram.programId,
  }).signers([User_Wallet])
  .instruction())

 await sendAndConfirmTransaction(con,transaction,[User_Wallet]);
    if(await con.getAccountInfo(user_pda_ac))
    {
      console.log("fine");
    }
    console.log("pda account pub key",user_pda_ac.toString())
    
  });
});


