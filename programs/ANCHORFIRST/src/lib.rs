use anchor_lang::prelude::*;

declare_id!("AtGABXydX8hgbBeeRE46kLDDnPTuZtTd7Yi7HjwMRNSg");

#[program]
pub mod anchor_first {
    use anchor_lang::solana_program::program::invoke;

    use super::*;

    pub fn initialize(ctx: Context<Initialize>,_bump:u8,amount:u64) -> Result<()> {
        msg!("PDA initialised successfully");

        let userpda= &mut(ctx.accounts.account_user);
        let sender=ctx.accounts.owner.key();
        let bump_sol_vector=_bump.to_le_bytes();
        let inner=vec![sender.as_ref(),bump_sol_vector.as_ref()];
        let outer_sol=vec![inner.as_slice()];
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.owner.key(),
            &userpda.key(),
            amount,
        );

        anchor_lang::solana_program::program::invoke_signed(
            &ix,
            &[ctx.accounts.owner.to_account_info(),userpda.to_account_info()],
            outer_sol.as_slice())?;

        
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(_bump : u8)]
pub struct Initialize<'info>{
    #[account(init,seeds=[owner.key.as_ref()],bump,payer=owner,space=100)]
    pub account_user:Account<'info,AccountUser>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info,System>
}

#[account]
pub struct AccountUser {
    pub user: String,
        }
