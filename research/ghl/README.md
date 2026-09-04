# HighLevel workflow build scripts

These drive GHL's internal automation API through the client in
`Stronger-Web-1/ghl-internal-mcp` (that repo holds the credentials and the
auth chain; nothing secret lives here).

    build-workflows.mjs   create "Website Enquiry — <Studio>" in all three
                          sub-accounts, as DRAFT, with the external_tracking
                          trigger and the four action steps. --dry to preview.
    email-template.mjs    the on-brand HTML confirmation email
    update-email.mjs      re-install that template into the three drafts
    verify-workflows.mjs  read the three back: status, trigger, form id, steps

Every step shape was copied from a real node in these same accounts rather
than guessed — the server validates step structure and rejects what it does
not recognise. The trigger shape came from a workflow the client built by hand,
after the API accepted four different wrong `type` strings without complaint.

Created (all DRAFT — drafts do not run):

    South Woodford  8a7994f4-ad5a-4584-bee8-93c33f861d88
    Leytonstone     ecbfd43b-e712-4f59-8629-42e2fc335677
    Hackney         5377f08d-c78b-4075-82cf-78a19b021888

    create-location-field.mjs  create the Location custom field where missing
    check-location-field.mjs   confirm a test submission populates it

## The Location field

The main-site form submits `location`, and HighLevel stores it on the contact
in a TEXT custom field with fieldKey `contact.location`. That field existed
only in South Woodford — Leytonstone and Hackney were **silently dropping the
value**, so nothing there could have branched on it. Created in both
(`POST /locations/{loc}/customFields`, which returns 201 and derives the key
from the name), then proved with a live submission: all three sub-accounts now
record Location = the studio the visitor picked.

    South Woodford  1A4CBg54lf2boNj4GNko   (pre-existing)
    Leytonstone     Rxqtps2bqPTLBpfP3xWp
    Hackney         pjUy3JEvtGrYO2GoL3J5

Still to do: a second trigger on each for `website-enquiry-all-sites`, plus an
If/Else on Location so a main-site enquiry only continues in the studio the
visitor picked. The If/Else condition shape for a custom field is not yet
known — the one captured example branches on tags, not a custom field.
