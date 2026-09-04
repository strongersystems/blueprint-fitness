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

Still to do: a second trigger on each for `website-enquiry-all-sites`, which
needs a condition on the submitted `location` so a main-site enquiry only runs
in the studio the visitor picked. The filter field for that is not yet known.
