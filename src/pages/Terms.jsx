import { Link } from 'react-router'
import { LegalLayout } from './LegalLayout.jsx'
import { company } from '../data/site.js'

const mail = <a href={`mailto:${company.email}`}>{company.email}</a>

const sections = [
  {
    id: 'agreement',
    title: 'Agreement',
    body: (
      <p>
        These Terms of Service govern access to and use of the {company.domain} website and the JiXora platform (together,
        the “Service”). By using the Service you agree to these terms. If you use the Service on behalf of a business, you
        confirm you are authorised to accept these terms for that business. A separate written agreement with a customer
        takes precedence over these terms where the two conflict.
      </p>
    ),
  },
  {
    id: 'service',
    title: 'The Service and early access',
    body: (
      <p>
        JiXora is software for delivering personalised training programs and automated member check-ins. The platform is
        currently offered through an early-access program. Features may change, be added or be removed as the product
        develops, and early-access features may be provided without the availability commitments that apply to generally
        available services.
      </p>
    ),
  },
  {
    id: 'accounts',
    title: 'Accounts and customer responsibilities',
    body: (
      <ul>
        <li>Keep login credentials confidential and tell us promptly about any unauthorised use.</li>
        <li>Make sure information you provide is accurate and that you have the right to share member information with us.</li>
        <li>Give members any notices and obtain any consents required by law before inviting them to JiXora.</li>
        <li>Review AI-drafted plan changes before approving them and remain responsible for coaching decisions.</li>
      </ul>
    ),
  },
  {
    id: 'fitness',
    title: 'Fitness and health disclaimer',
    body: (
      <p>
        JiXora provides general fitness programming and accountability tools. It is not a medical device or a medical
        service and does not provide medical advice, diagnosis or treatment. Members should consult a qualified healthcare
        professional before starting a new exercise program, especially if they have an injury, a medical condition or
        any symptoms during exercise. Coaches and businesses using JiXora are responsible for the guidance they give their
        members.
      </p>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service unlawfully, or to harass, mislead or harm any person</li>
          <li>Upload content you do not have the right to use, or malicious code</li>
          <li>Attempt to access accounts, data or systems you are not authorised to access</li>
          <li>Reverse engineer, resell or copy the Service except as permitted by law</li>
          <li>Interfere with or overload the Service, or use automated means to scrape it</li>
        </ul>
      </>
    ),
  },
  {
    id: 'ip',
    title: 'Intellectual property',
    body: (
      <p>
        JiXora and its licensors own the Service, including its software, design and branding. Customers keep ownership of
        the program templates, content and member data they provide, and grant JiXora the rights needed to host, process
        and display that content to provide the Service. Feedback you share may be used to improve the Service without
        obligation to you.
      </p>
    ),
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: (
      <p>
        Our handling of personal information is described in our <Link to="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: 'fees',
    title: 'Fees',
    body: (
      <p>
        Fees for paid plans are agreed in writing with each customer before use. No fees apply to browsing this website or
        submitting an enquiry.
      </p>
    ),
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    body: (
      <p>
        The Service is provided “as is” and “as available”. To the extent permitted by law, JiXora disclaims all warranties,
        express or implied, including merchantability, fitness for a particular purpose and non-infringement, and does not
        guarantee any particular fitness, health, retention or business outcome. AI-generated suggestions may be incomplete
        or inaccurate and must be reviewed before use.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <p>
        To the extent permitted by law, JiXora will not be liable for indirect, incidental, special, consequential or
        punitive damages, or for lost profits, revenue or data. JiXora’s total liability for any claim relating to the
        Service is limited to the amount you paid for the Service in the twelve months before the claim. Nothing in these
        terms limits liability that cannot be limited by law.
      </p>
    ),
  },
  {
    id: 'termination',
    title: 'Suspension and termination',
    body: (
      <p>
        You may stop using the Service at any time. We may suspend or end access if these terms are breached or if
        required to protect the Service or other users. Sections that by their nature should survive termination will do so.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms as the Service develops. We will post the updated version here and change the “last
        updated” date. Continued use after an update means you accept the revised terms.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: <p>Questions about these terms can be sent to {mail}.</p>,
  },
]

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      updated="13 October 2026"
      intro="Please read these terms carefully. They explain the rules for using the JiXora website and platform."
      sections={sections}
    />
  )
}
