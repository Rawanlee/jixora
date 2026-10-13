import { LegalLayout } from './LegalLayout.jsx'
import { company } from '../data/site.js'

const mail = <a href={`mailto:${company.email}`}>{company.email}</a>

const sections = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          {company.name} (“JiXora”, “we”, “us”) provides software that helps coaches, gyms and wellness programs deliver
          personalised 90-day training programs and automated member check-ins. This policy explains how we handle personal
          information collected through {company.domain} and through the JiXora platform.
        </p>
        <p>For any privacy question or request, contact us at {mail}.</p>
      </>
    ),
  },
  {
    id: 'website',
    title: 'Information we collect on this website',
    body: (
      <>
        <p>We collect only what you choose to send us through the early-access and contact forms:</p>
        <ul>
          <li>Your name, business email address and company name</li>
          <li>Company size, primary use case, plan of interest and enquiry topic</li>
          <li>The content of any message you write</li>
        </ul>
        <p>
          When you load the website, our hosting provider automatically processes technical data such as your IP address,
          browser type and the pages requested, in order to deliver the site and protect it from abuse. This website does
          not use advertising cookies, tracking pixels or third-party analytics.
        </p>
      </>
    ),
  },
  {
    id: 'platform',
    title: 'Information processed in the JiXora platform',
    body: (
      <>
        <p>When a business uses JiXora, its coaches and members may provide:</p>
        <ul>
          <li>Account details such as name, email address and, where enabled, phone number</li>
          <li>Intake answers: fitness goals, experience, training location, availability and body measurements the member chooses to share</li>
          <li>Readiness questionnaire answers, which can include health-related information such as injuries or conditions</li>
          <li>Check-in replies, session completion, habit responses and messages between coaches and members</li>
        </ul>
        <p>
          The business that invites a member (for example a gym or coach) decides why and how that member’s information is
          used. In that relationship JiXora processes the information on the business’s behalf and according to its
          instructions. Members should contact their coach or gym first, and may also contact us at {mail}.
        </p>
        <p>
          JiXora provides general fitness programming. It is not a medical service and does not diagnose or treat any
          condition. Readiness answers are used to recommend that a member consult a healthcare professional where
          appropriate, and to prevent automatic progression when pain is reported.
        </p>
      </>
    ),
  },
  {
    id: 'use',
    title: 'How we use information',
    body: (
      <ul>
        <li>To respond to enquiries and early-access requests and to arrange demonstrations</li>
        <li>To provide the platform: generating plans, sending check-ins, interpreting replies and showing coaches member progress</li>
        <li>To secure, monitor, maintain and improve the service</li>
        <li>To meet legal obligations and enforce our Terms of Service</li>
      </ul>
    ),
  },
  {
    id: 'ai',
    title: 'Use of AI models',
    body: (
      <p>
        JiXora uses foundation models accessed through Amazon Bedrock to generate plans, interpret free-text check-in
        replies and draft suggested plan changes. Suggested changes are shown to a coach for approval before they reach a
        member. We do not sell personal information, and we do not use customer or member data to train third-party
        foundation models.
      </p>
    ),
  },
  {
    id: 'sharing',
    title: 'Service providers and sharing',
    body: (
      <>
        <p>We share personal information only with providers that help us run JiXora, under contractual obligations to protect it:</p>
        <ul>
          <li><strong>Amazon Web Services</strong> — cloud hosting, storage, email delivery (Amazon SES) and AI model access (Amazon Bedrock)</li>
          <li><strong>Website hosting provider</strong> — serving this website and processing request logs</li>
        </ul>
        <p>
          We may also disclose information where required by law, to protect the rights and safety of our users or the
          public, or as part of a merger, acquisition or sale of assets, in which case this policy will continue to apply.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'Retention',
    body: (
      <p>
        Enquiries and early-access requests are kept for as long as needed to respond and manage our relationship with you,
        and deleted within 24 months of our last contact unless you become a customer. Platform data is kept for the
        duration of the customer’s subscription and deleted or returned according to the customer’s instructions when the
        subscription ends, except where we must keep limited records to meet legal obligations.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        We use access controls, encryption in transit and encryption at rest provided by our cloud infrastructure, and we
        limit access to personal information to people who need it to operate the service. No system is completely secure,
        and we will notify affected customers of a security incident as required by applicable law.
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <p>
        Depending on where you live, you may have the right to access, correct, delete or receive a copy of your personal
        information, and to object to or restrict certain processing. To make a request, email {mail}. We will verify your
        request and respond within the time required by applicable law. You may also complain to your local data protection
        authority.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        JiXora is intended for adults. It is not directed at children under 16, and we do not knowingly collect their
        personal information. If you believe a child has provided information to us, contact {mail} and we will delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We will update this page when our practices change and revise the “last updated” date above. Material changes
        affecting customers will be communicated directly.
      </p>
    ),
  },
]

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="13 October 2026"
      intro="This policy describes what personal information JiXora collects, why, who we share it with, how long we keep it and the choices you have."
      sections={sections}
    />
  )
}
