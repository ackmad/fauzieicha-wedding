import InvitationClient from "./InvitationClient";
import { formatGuestName } from "../lib/formatter";

/**
 * Root Page Implementation (Server Component)
 * Handles the base URL by providing a default guest name fallback.
 */
export default function RootPage() {
  const guestName = formatGuestName(undefined);
  
  return <InvitationClient guestName={guestName} />;
}
