# Firestore rules audit — subscription flow

## Client access observed

- `subscriptions/{uid}`: the dashboard reads its own document; the admin subscriptions panel lists all documents.
- `audit_reports`: users query only reports whose `userId` is their own; admins list recent reports.
- `audit_users`: the signed-in user profile is read by its owner; admins list and manage profiles.

## Subscription data model

`subscriptions/{uid}` is server-managed and contains the immutable entitlement fields `uid`, `plan`, `status`, `razorpaySubscriptionId`, `lastPaymentId`, and `currentPeriodEnd`. `siteSlots` is changed only through the authenticated `/api/subscription/sites` API, which validates the URL, ownership, active status, and plan limit using the Admin SDK.

## Rules decision

Clients may read their own subscription and administrators may list all subscriptions. All subscription writes are denied at the Firestore client boundary; trusted server routes and Razorpay webhooks use the Admin SDK.

## Threat checks

- Unauthenticated and cross-user subscription reads: denied.
- A user changing `plan`, `status`, or Razorpay IDs: denied because all client writes are denied.
- A user exceeding site limits or adding malformed URLs: denied by server validation.
- An ordinary user listing subscriptions: denied; the admin panel query requires an admin role document.
- Schema-pollution and ownership-hijack writes against `subscriptions`: denied because no browser write is permitted.
- Firestore rules compilation: passed using the Firebase CLI dry run on the target project.
