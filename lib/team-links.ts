/**
 * LinkedIn profiles for footer credits.
 * Override with .env: NEXT_PUBLIC_LINKEDIN_MANSOOR, NEXT_PUBLIC_LINKEDIN_ABDULLAH (Abdallah Mohamed)
 */
export const TEAM_LINKEDIN = {
  mansoorGabali:
    process.env.NEXT_PUBLIC_LINKEDIN_MANSOOR ??
    "https://www.linkedin.com/in/mg-mns-coding",
  abdullahMohamed:
    process.env.NEXT_PUBLIC_LINKEDIN_ABDULLAH ??
    "https://www.linkedin.com/in/abdallah-mohamed-2a81b02ba",
} as const;
