import InvitationClient from "../InvitationClient";
import { formatGuestName } from "../../lib/formatter";

type Props = {
  params: Promise<{ guest: string }>;
};

/**
 * Guest Dynamic Route Implementation (Server Component)
 * Resolves the guest name from the dynamic URL segment and formats it.
 */
export default async function GuestPage({ params }: Props) {
  const resolvedParams = await params;
  const guestName = formatGuestName(resolvedParams.guest);
  
  return <InvitationClient guestName={guestName} />;
}
