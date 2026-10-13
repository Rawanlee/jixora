# Lead intake function (AWS Lambda + Amazon SES)

Receives the website's **early-access** and **contact** form submissions as JSON,
validates them and emails them to the team with Amazon SES. It stores nothing.

```
Browser ──POST JSON──▶ Lambda Function URL ──▶ validate ──▶ Amazon SES ──▶ rasheed@jixora.space
```

## What it checks

- `formType` is `early-access` or `contact`; required fields present; valid email
- Request origin is in `ALLOWED_ORIGINS` (CORS) — other origins get 403
- Honeypot field `company_website` is empty; body ≤ 10 KB; each field ≤ 2,000 chars
- SES failures return **502** so the website shows an error instead of a false success

## Deploy with AWS SAM

Prerequisites: AWS account, [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html), a verified SES identity for `jixora.space` (or the sender address).

```bash
cd aws/lead-intake
npm install
sam build
sam deploy --guided \
  --parameter-overrides FromEmail=no-reply@jixora.space ToEmail=rasheed@jixora.space \
    AllowedOrigins=https://www.jixora.space,https://jixora.space
```

Copy the `FormsEndpoint` output into the website's `VITE_FORMS_ENDPOINT` and rebuild the site.

> New SES accounts start in the sandbox and can only send to verified addresses.
> Verify `rasheed@jixora.space` as well, or request production access.

## Environment variables

| Name | Purpose |
| --- | --- |
| `FROM_EMAIL` | SES-verified sender, e.g. `no-reply@jixora.space` |
| `TO_EMAIL` | Inbox that receives submissions |
| `ALLOWED_ORIGINS` | Comma-separated origins allowed to POST |

No AWS credentials live in the website; the function uses its IAM execution role.

## Test

```bash
npm test
```

Unit tests stub SES and cover success, validation failures, honeypot, CORS and SES failure.
