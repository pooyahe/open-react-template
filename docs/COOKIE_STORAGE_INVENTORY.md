# Cookie and Browser-Storage Inventory

Evidence date: 2026-08-07. Inventory captured at 1440×900 and 390×844 while
loading the homepage, visiting both legal routes, and interacting with desktop
or mobile navigation.

No browser storage entries were observed.

| Mechanism | Name/key | Origin | Lifetime | Purpose | Current classification | Technical necessity | Status |
|---|---|---|---|---|---|---|---|
| Cookie | None observed | None | None | None | None | None | CURRENTLY ABSENT |
| localStorage | None observed | None | None | None | None | None | CURRENTLY ABSENT |
| sessionStorage | None observed | None | None | None | None | None | CURRENTLY ABSENT |
| IndexedDB | No databases observed | None | None | None | None | None | CURRENTLY ABSENT |
| Service worker | No registrations observed | None | None | None | None | None | CURRENTLY ABSENT |
| Cache Storage | No application cache usage found in source; no service worker observed | None | None | None | Inherited/unused capability not active | None | NOT ACTIVE |

The mobile menu state is held in React component memory only and is not
persistent browser storage.

This is a technical inventory, not a legal conclusion about whether consent or
a cookie notice may be required in a future implementation.
