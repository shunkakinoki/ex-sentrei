/* eslint-disable react/no-unescaped-entities */

import Container from "@material-ui/core/Container";
import {NextPage} from "next";
import * as React from "react";

import {analytics} from "@sentrei/common/utils/firebase";

import Footer from "@sentrei/ui/components/Footer";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const Privacy: NextPage = () => {
  React.useEffect(() => {
    analytics().setCurrentScreen("privacy");
  }, []);

  return (
    <>
      <SentreiHeader />
      <Container maxWidth="sm">
        <div>
          <h1>PRIVACY POLICY</h1>
          <h2>1. Introduction</h2>
          <p>
            All personal data collected from this site complies with the
            principles of the EU GDPR data protection act. By accessing this
            site you agree to the terms of this privacy policy and consent to
            the collection, processing, use or transfer of data as set out in
            this policy.
          </p>
          <p>
            <strong>
              THIS POLICY APPLIES TO OUR SERVICES AND ONLINE TOOLS, INCLUDING
              THE WEBSITE AND MOBILE APPLICATIONS, AND OTHER (COLLECTIVELY “THE
              WEBSITES”), AS WELL AS OTHER INTERACTION (E.G. CUSTOMER SUPPORT
              CONVERSATIONS, USER SURVEYS AND INTERVIEWS ETC.) YOU MAY HAVE WITH
              US.
            </strong>
          </p>
          <p>
            For the purpose of the processing personal data, we may engage data
            processors and/or, at its sole discretion, hire other persons to
            perform certain functions on behalf of Sentrei. In such cases, we
            shall take necessary measures to ensure that such data is processed
            by the personal data processors in accordance with instructions of
            and applicable European Union legislation. Shall also require the
            personal data processors to implement appropriate measures for the
            security of personal data. In such cases, we shall ensure that such
            persons will be subject to the non-disclosure obligation and will no
            video calling and messaging t be able to use this information for
            any other purpose, except to the extent necessary to perform the
            functions assigned to them.
          </p>
          <ul>
            <li>1) Introduction </li>
            <li>2) Acceptance and Use</li>
            <li>3) Data Protection Principles</li>
            <li>4) Data We Collect About You</li>
            <li>5) Personal Information We Collect About You (PIPEDA)</li>
            <li>6) Types of Data We Collect From You</li>
            <li>7) Non-Personal Information</li>
            <li>8) Information Collected Through Technology</li>
            <li>9) Other Information You May Submit</li>
            <li>10) Automatically-Collected Information</li>
            <li>11) Information We Collect From You Automatically</li>
            <li>12) How We Use Your Data</li>
            <li>13) Remarketing On the App and website</li>
            <li>14) Google Adwords</li>
            <li>15) With Whom We Share Your Data</li>
            <li>16) Mobile Devices</li>
            <li>17) Do Not Track</li>
            <li>18) Interest-Based Advertising Technologies</li>
            <li>19) Data Retention</li>
            <li>20) EEA Data Subjects</li>
            <li>21) Your Privacy Choices</li>
            <li>22) Our COPPA Policy towards Children</li>
            <li>23) Chat History</li>
            <li>24) Cross Border Transfers</li>
            <li>25) Data Transferred Out Of the EU</li>
            <li>26) Privacy Shield</li>
            <li>27) Legal Bases for Processing (For EEA Users):</li>
            <li>28) Security Measures for Safeguarding Your Information</li>
            <li>29) Third-Party Site and Links</li>
            <li>30) Mobile Advertising Identifiers</li>
            <li>31) California / Delaware Do Not Track Disclosures</li>
            <li>32) Emails Communications</li>
            <li>33) Data Security</li>
            <li>34) GDPR Statement for (EEA Users)</li>
            <li>35) GDPR Data Privacy User Rights</li>
            <li>36) Your Right To Withdraw Consent</li>
            <li>37) Opting Out Of Messages from Us</li>
            <li>38) Opting Out Of Sharing With Third Parties for Marketing</li>
            <li>39) Opting Out Of Interest Based Advertising</li>
            <li>40) Security of Personal Information</li>
            <li>41) Changes to our Privacy Policy</li>
            <li>42) Contact Us</li>
          </ul>
          <h2>2. Acceptance and Use</h2>
          <p>
            This privacy policy covers Sentrei and its subsidiaries including
            (collectively, "Sentrei," "we" "us" or "our"). We facilitates the
            connection of people through calling via our Application, and
            website.
          </p>
          <p>
            By downloading and using Sentrei Mobile Application and website, you
            signify acceptance to the terms of this Privacy Policy. Where your
            acceptance via clicking on [ACCEPT] when this policy is displayed to
            you on the App, is considered as your official consent to process
            your personal information, your consent to the collection, use, and
            disclosure of your personal information as described further below.
            We may request you to provide additional disclosures or information
            about the data processing practices of specific Services. These
            notices may supplement or clarify our privacy practices or may
            provide you with additional choices about how we process your data.
          </p>
          <p>
            If you do not agree with or you are not comfortable with any aspect
            of this Privacy Policy, you should immediately discontinue access or
            use of Sentrei Application and website and its related services.
          </p>
          <h2>3. Data Protection Principles</h2>
          <p>
            “Personal data” means any information that enables us to identify
            you or the beneficiary of your transaction with us, directly or
            indirectly, such as name, email, address, telephone number, any form
            of identification number or one or more factors specific to your or
            your beneficiary’s identity.
          </p>
          <p>
            We are committed to complying with applicable data protection laws
            and will ensure that personal data is:
          </p>
          <ul>
            <li>* Used lawfully, fairly and in a transparent way;</li>
            <li>
              * Collected only for valid purposes that we have clearly explained
              to you and not used in any way that is incompatible with those
              purposes;
            </li>
            <li>
              * Relevant to the purposes we have told you about and limited only
              to those purposes;
            </li>
            <li>* Accurate and kept up to date;</li>
            <li>
              * Kept only as long as necessary for the purposes we have told you
              about;
            </li>
            <li>* Kept securely.</li>
          </ul>
          <h2>4. Data We Collect About You</h2>
          <p>
            Sentrei may collect two (2) types of information about you: personal
            data and non-personal data.
          </p>
          <p>
            <strong>Personal Data</strong> The following are personal data we
            collect, process or store, with the purpose and that we have the
            legal ground to do so in accordance with the GDPR:
          </p>
          <p>
            <strong>User account information.</strong> Users that choose to
            register an account with us, will have to provide a valid email
            address or phone number. The user can also choose to provide a user
            name and/or add a profile image that will represent you on the
            platform. If you choose to sign up as a user with an external
            authentication service, e.g. Google, Facebook, or via Email, we will
            collect and store the personal information you provide on the
            service.
          </p>
          <p>
            <strong>Room information.</strong> To create a room on the Sentrei
            application and website, you will have to select a room name. This
            name will be publicly visible, and will be used by other users who
            access meetings in that room.
          </p>
          <h3>Non-Personal Information</h3>
          <p>
            <span>Anonymous Data.</span> Some of the non-personal Data that we
            are data that cannot identify, distinguish or trace you or your
            Device, even if combined with other identifying information, and
            some Data that could be considered PII when combined with other
            identifying information is not used in a way that identifies,
            distinguishes or traces you or your Device, but is instead used in
            an anonymous way, often aggregated with other anonymous Data about
            other users.
          </p>
          <h2>5. Personal Information We Collect About You (PIPEDA)</h2>
          <p>
            According to the personal information protection and electronic
            documents act, 2000 (PIPEDA), “personal information” means
            information about an identifiable individual. The information you
            provide to Sentrei is considered personal information it is possible
            to relate it back to you through your name, address, e-mail address,
            telephone number and any other information that can identify you. If
            information cannot be related to an identifiable individual it is
            considered anonymous information (such as laboratory results
            identified by alpha-numeric identifier instead of individual’s
            name). Whenever possible, Sentrei works with anonymous information.
            This privacy statement does not apply to anonymous information.
          </p>
          <h2>6. Types of Data We Collect From You</h2>
          <ul>
            <li>
              1. <strong>Personal Identifiable Information (PII).</strong> We
              acquire PII that may include, in certain contexts, your Full name,
              date of birth, nationality, gender, photographs, phone number,
              home address, and/or email. Which certain jurisdictions consider
              to be PII because it could be used to identify an individual or
              Device if it were combined with other identifying information.
            </li>
            <li>
              2. <strong>Institutional Information:</strong> Employer
              Identification number (or comparable number issued by a
              government), proof of legal formation (e.g. Articles of
              Incorporation), personal identification information for all
              material beneficial owners.
            </li>
            <li>
              3. <strong>Transaction information.</strong> Customers that choose
              to purchase a paid version of the Services provide Whereby (and
              our payment processors) with billing details such as credit card
              information, billing email, banking information, location at the
              time of transaction and/or a billing address. The transaction data
              may be processed for the purpose of supplying the purchased
              services and keeping proper records of those transactions. This
              data may be used for the purpose of delivering the Services to
              you. Processing this information is required for fulfilling the
              contract we entered into with you, at your request (our Terms of
              Service) cf. GDPR art. 6 (1) item b. additionally, this
              information needs to be retained in order to comply with
              accounting and tax regulation cf. GDPR art. 6 (1)
            </li>
            <li>
              4. <strong>Sensitive PII:</strong> Information about the
              transactions you make on our Services, such as the names, mobile
              number, email address and other information about the directly
              connected accounts to your account [FAMILY] which are attracted to
              our service by you.
            </li>
            <li>
              5. <strong>Employment Information:</strong> Office location, job
              title, and/or description of role.
            </li>
            <li>
              6. <strong>Correspondence:</strong> Survey responses, information
              provided to our support team or user research team.
            </li>
          </ul>
          <h2>7. Non-Personal Information</h2>
          <p>
            Non-personal information refers to information that, by itself, does
            not identify you as a specific individual (e.g. demographic
            information or web site visitations). Sentrei may collect
            non-personal information through any of the methods discussed above
            as well as automatically through use of industry standard
            technologies described further below.
          </p>
          <h2>8. Information Collected Through Technology</h2>
          <p>
            While you are able to visit the Sentrei site and remain anonymous,
            Sentrei or its third party service providers may still collect
            non-personal information about your use of the Sentrei materials
            (e.g. Your internet browser, operating system, ip address,
            connection speed, and the domain name of your internet service
            provider). Such information may be gathered by the following
            methods:
          </p>
          <ul>
            <li>
              (a)<strong>Cookies. Cookies,</strong> including local shared
              objects, are small pieces of information that are stored by your
              browser on your device’s hard drive which work by assigning to
              your computer a unique number that has no meaning outside of the
              Sentrei site. Cookies do not generally contain any personal
              information. Most web browsers automatically accept cookies, but
              you can usually configure your browser to prevent this. Not
              accepting cookies may make certain features of the Sentrei
              materials unavailable to you.
            </li>
            <li>
              (b)<strong>IP address.</strong> You may visit many areas of the
              Sentrei site anonymously without the need to become a registered
              user. Even in such cases, Sentrei may collect ip addresses
              automatically. An IP address is a number that is automatically
              assigned to your computer whenever you begin services with an
              internet services provider. Each time you access the Sentrei site
              and each time you request one of Sentrei’ pages, the server logs
              your ip address.
            </li>
            <li>
              (c)<strong>Beacons.</strong> Beacons are small pieces of data that
              are embedded in web pages and e-mails. Sentrei may use these
              technical methods in html e-mails that Sentrei sends to users to
              determine whether they have opened those e-mails and/or clicked on
              links in those e-mails. The information from use of these
              technical methods may be collected in a form that&nbsp;constitutes
              personal information.
            </li>
            <li>
              (d)<strong>Tracking content usage.</strong> If you use the Sentrei
              services and you post audio visual materials including, without
              limitation, text, logos, artwork, graphics, pictures,
              advertisements, sound and other related intellectual property
              contained in such materials (collectively, “content”) to your app
              site or to a third party app site, Sentrei tracks and captures
              non-personal information associated with user accounts and the use
              of content.
            </li>
          </ul>
          <h2>9. Other Information You May Submit</h2>
          <p>
            You may submit data to us for limited purposes such as requesting
            customer support; answering a questionnaire; participating in a
            study; entering contests or sweepstakes; or signing up to receive
            communications from us or another user.
          </p>
          <h2>10. Automatically-Collected Information</h2>
          <p>
            We automatically collect certain types of data when you use our
            services, regardless of whether you have an account. This data
            includes your IP address, technical information about your device
            (e.g., browser type, operating system, and basic device
            information), the web page you visited or search query you entered
            before reaching us, and your activities. We may track your
            activities using cookies and similar technologies. By using our
            services, you agree to our use of these methods as set forth in
            our&nbsp;cookie policy.
          </p>
          <h2>11. Information We Collect From You Automatically</h2>
          <p>
            We receive and store certain types of information automatically,
            such as whenever you interact with or use Sentrei Application and
            website. This information helps us address customer support issues,
            improve the performance of Sentrei Application and website,
            providing you with a streamlined and personalized experience, and
            protect your account from fraud by detecting unauthorized access.
            Information collected automatically includes:
          </p>
          <ul>
            <li>
              * <strong>Online Identifiers:</strong> Geo location/tracking
              details, browser fingerprint, operating system, browser name and
              version, and/or personal IP addresses.
            </li>
            <li>
              * <strong>Usage Data:</strong> Authentication data, security
              questions, click-stream data, public social networking posts, and
              other data collected via cookies and similar technologies.
            </li>
          </ul>
          <p>
            For example, we may automatically receive and record the following
            information on our server logs:
          </p>
          <ul>
            <li>* How you came to and use Sentrei Application and website;</li>
            <li>* Device type and unique device identification numbers;</li>
            <li>
              * Device event information (such as crashes, system activity and
              hardware settings, browser type, browser language, the date and
              time of your request and referral URL);
            </li>
            <li>
              * How your device interacts with Sentrei Application and website
              and Services, including pages accessed and links clicked;
            </li>
            <li>
              * Broad geographic location (e.g. country or city-level location);
              and
            </li>
            <li>
              * Other technical data collected through cookies, pixel tags and
              other similar technologies that uniquely identify your browser.
            </li>
          </ul>
          <p>
            We may also use identifiers to recognize you when you access our
            service and or App via an external link, such as a link appearing on
            a third party site
          </p>
          <h2>12. How We Use Your Data</h2>
          <ul>
            <li>
              * <strong>Identification and authentication:</strong> we use your
              data to verify you when you access your account.
            </li>
            <li>
              * <strong>Communicating with you:</strong> we use your data when
              we communicate with you (e.g., when we respond to a customer
              support or other inquiry).
            </li>
            <li>
              * <strong>Improving our services:</strong> we use your data to
              understand how our services are being used and how we can improve
              them. In general, we analyze aggregated data, rather than specific
              user data. We may, however, need to analyze a specific case to
              address a specific problem (e.g., a bug that affects only a few
              accounts).
            </li>
            <li>
              * <strong>Customizing your experience:</strong> we use your data
              to personalize the service to you. This may include remembering
              your preferences for language or volume or displaying app that you
              might enjoy, based upon your viewing choices.
            </li>
            <li>
              * <strong>To ensure network and data security:</strong> We process
              your personal information in order to enhance security, monitor
              and verify identity or service access, combat spam or other
              malware or security risks and to comply with applicable security
              laws and regulations. The threat landscape on the internet is
              constantly evolving, which makes it more important than ever that
              we have accurate and up-to-date information about your use of
              Sentrei Services.
            </li>
            <li>
              * <strong>Marketing and advertising:</strong> we use your data to
              display ads and send you offers. We may also use your data in
              delivering third-party advertisements to you. This may include
              "targeted ads" based upon your activities.
            </li>
            <li>
              * <strong>Exercising our rights:</strong> where reasonably
              necessary, we use your data to exercise our legal rights and
              prevent abuse of our service. For example, we may use your data to
              detect and prevent fraud, spam, or content that violates our terms
              of service.
            </li>
            <li>
              * <strong>Legal compliance:</strong> we use your data where we are
              legally required to do so. For example, we may need to gather your
              data to respond to a subpoena or court order.
            </li>
            <li>
              * <strong>Protecting your information:</strong> where appropriate,
              we may anonymize, backup, and delete certain data.
            </li>
            <li>
              * <strong>For research and development:</strong> We process your
              personal information to better understand the way you use and
              interact with Sentrei's Services. In addition, we use such
              information to customize, measure, and improve Sentrei features
              and the content and layout of our App and applications, and to
              develop new services.
            </li>
          </ul>
          <p>
            We may use algorithms and other automated means to implement any of
            the above.
          </p>
          <h2>13. Remarketing On the App and website</h2>
          <p>
            If you have provided your consent by accepting Targeting Cookies on
            the App, we may use Google AdWords (remarketing and Similar Audience
            features) and Facebook Ads. You can review the Sentrei cookie policy
            which includes details on how to customize your cookie settings.
          </p>
          <h2>14. Google Adwords</h2>
          <p>
            Google AdWords enables Google, through the use of cookies, to
            identify the fact that you have visited the App, to identify aspects
            of your usage of the App and combine that with what it knows about
            your usage of other Apps in the Google ad network.
          </p>
          <p>
            We use these services to advertise to visitors of Google ad network
            Apps who have previously visited our App or who Google deems to have
            shared interests with visitors of our App. Google’s collection and
            use of your personal data is covered by the Google privacy policy.
            You can set preferences for how Google advertises to you using the
            Google Ad Preferences page.
          </p>
          <h2>15. With Whom We Share Your Data</h2>
          <p>We share data with third parties as follows:</p>
          <ul>
            <li>
              * <strong>With your consent:</strong> we may share your data with
              third parties where we have obtained your express consent to do
              so. You may revoke these consents.
            </li>
            <li>
              * <strong>Authorized vendors:</strong> we may share your data with
              third-party vendors that help us operate our services, process
              payments, and comply with your instructions and our contractual
              obligations. This includes payment processors, content delivery
              networks (cdns), cloud-based hosting services, monitoring
              services, email service providers, quality assurance and testing
              vendors, fraud and abuse prevention vendors, customer relations
              management (crm) vendors
            </li>
            <li>
              * <strong>Advertising:</strong> we may share your data with
              advertising companies to display relevant ads to you. Unless you
              expressly agree, we will not share or sell your name, email
              address, or physical address with such persons.
            </li>
            <li>
              * <strong>Analytics:</strong> we may share your data with persons
              who provide analytics showing how customers are using our
              services.
            </li>
            <li>
              * <strong>Affiliates and advisors:</strong> we may share your data
              with our affiliates company, and our auditors and advisors for
              planning, financial reporting, accounting, auditing, tax filings,
              and legal compliance. Unless you expressly agree, we will not
              share your data with our parent or any affiliate for other
              purposes, such as direct marketing.
            </li>
            <li>
              * <strong>Certain legal situations:</strong> we may share your
              data where we believe disclosure is necessary to comply with a
              legal obligation or in connection with a corporate transaction.
            </li>
            <li>
              * <strong>Aggregated or anonymized information:</strong> we may
              publicly disclose non-personal aggregated or anonymized
              information such as our number of visitors and registered users.
            </li>
          </ul>
          <h2>16. Mobile Devices</h2>
          <p>
            Sentrei may occasionally send you push notifications through our
            mobile applications. You may at any time opt-out from receiving
            these types of communications by changing the settings on your
            mobile device. We may also collect location-based information if you
            use our mobile applications. You may opt-out of this collection by
            changing the settings on your mobile device.
          </p>
          <h2>17. Do Not Track</h2>
          <p>
            Do Not Track (“DNT”) is a privacy preference that users can set in
            certain web browsers and devices. DNT is a way for users to inform
            websites and services that they do not want certain information
            about their webpage visits collected over time and across websites
            or online services. Please note that we do not respond to or honor
            DNT signals or similar mechanisms transmitted by web browsers.
          </p>
          <h2>18. Interest-Based Advertising Technologies</h2>
          <p>
            As noted above, you may limit advertising tracking using advertising
            identifiers through your mobile device’s privacy settings.
          </p>
          <p>
            The online advertising industry also provides websites from which
            you may opt-out of receiving targeted ads from our data partners and
            our other advertising partners that participate in self-regulatory
            programs. You can access these, and also learn more about targeted
            advertising and consumer choice and privacy, at
            <a
              href="http://www.networkadvertising.org/managing/opt_out.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              ttp://www.networkadvertising.org/managing/opt_out.asp
            </a>
            , or
            <a
              href="http://www.youronlinechoices.eu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.youronlinechoices.eu/
            </a>
            and
            <a
              href="http://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.aboutads.info/choices/
            </a>
            .
          </p>
          <h2>19. Data Retention</h2>
          <p>
            We retain your data for as long as you have an account. When you
            close an account, we will delete your personal information. We may
            retain logs of automatically collected information (for internal
            analytics); your email address; your tax information; communications
            with you; and your transactional information (for auditing, tax, and
            financial purposes). When we no longer have a business reason for
            retaining data, we will delete or anonymize it.
          </p>
          <p>
            If we receive legal process pertaining to your account, we will
            retain your data for as long as we in good faith believe is
            necessary to comply with the legal process. Similarly, if we believe
            that your account has been involved in wrongdoing, we may preserve
            your data to defend or assert our rights.
          </p>
          <h2>20. EEA Data Subjects</h2>
          <p>
            <strong>Legal Bases for Processing your Information:</strong>
          </p>
          <p>
            For individuals who are located in the European Economic Area,
            United Kingdom or Switzerland (collectively “EEA Residents”) at the
            time their personal data is collected, we rely on legal bases for
            processing your information under Article 6 of the EU General Data
            Protection Regulation (“GDPR”). We generally only process your data
            where we are legally required to, where the processing is necessary
            to perform any contracts we entered with you (or to take steps at
            your request prior to entering into a contract with you), for our
            legitimate interests to operate our business or to protect Sentrei
            application and website or your, property, rights, or safety, or
            where we have obtained your consent to do so. Below is a list of the
            purposes described in our policy with the corresponding legal bases
            for processing.
          </p>
          <h2>21. Your Privacy Choices</h2>
          <p>We enable you to make numerous choices about your data:</p>
          <ul>
            <li>
              * You may choose not to provide us with certain information. For
              example, you may choose not to create an account or not to provide
              optional account information.
            </li>
            <li>
              * You may change your account and privacy settings. You may change
              or correct information voluntarily submitted to us. We encourage
              you to keep your data current by viewing your settings page.
            </li>
            <li>* You may opt out of receiving commercial emails from us.</li>
            <li>
              * You may limit the use of cookies. See our cookie policy for
              options.
            </li>
            <li>* You may close your account </li>
            <li>* Users from certain countries may have additional rights.</li>
          </ul>
          <h2>22. Our COPPA Policy towards Children</h2>
          <p>
            Sentrei complies with both the Children’s Online Privacy Protection
            Act of 1998 (COPPA) and, with regard to EU data subjects, with GDPR.
            We do not knowingly request to collect personal information required
            for Sentrei Premium Membership from any person under the age of 13.
            If a user submitting personal information is suspected of being
            younger than 13 years of age, Sentrei will prevent user from
            registering for Premium Plan or Package, cancel his/her membership
            without being liable to refund any paid subscription fees, also
            Sentrei retains the right to close such account and or not allow
            such users to continue using Sentrei Service. We will also take
            steps to delete the information as soon as possible.
          </p>
          <p>
            Please notify us if you know of any individuals under the age of 13
            using our Premium Services so we can take action to prevent access
            to our Services.
          </p>
          <h2>23. Chat History</h2>
          <h3>What is it?</h3>
          <ul>
            <li>
              * We will collect, save and store all information contained in
              your Sentrei chat history for up to 90 days, including your
              photos, voice messages, videos, and sticker. If you are a premium
              user, you can elect to save this information on our servers for a
              longer period of time. You can permanently delete your Sentrei
              chat history at any time.
            </li>
          </ul>
          <h3>How do we use it?</h3>
          <ul>
            <li>
              * To allow you to access your chat history, photos, and videos for
              your own purposes.
            </li>
            <li>
              * To collect aggregated data from your chat history. We use the
              data to build language models which help us improve the Service.
              We will only collect this data on an aggregated basis, and in a
              manner which does not reveal any personally identifiable
              information about any individual user. We will use this data to
              help us understand our users’ interests, analyze trends, and
              customize the user experience.
            </li>
          </ul>
          <h2>24. Cross Border Transfers</h2>
          <p>
            To facilitate our global operations, Sentrei may transfer, store,
            and process your information within our family of companies,
            partners, and service providers based throughout the world.
          </p>
          <p>
            We contractually obligate recipients of your personal information to
            agree to at least the same level of privacy safeguards as required
            under applicable data protection laws. By communicating
            electronically with Sentrei, you acknowledge and agree to your
            personal information being processed in this way.
          </p>
          <p>
            If you have a complaint about our privacy practices and our
            collection, use or disclosure of personal information please submit
            your request via any of Sentrei provided CONTACT US mediums.
          </p>
          <h2>25. Data Transferred Out Of the EU</h2>
          <p>
            Our Estonian based company, Sentrei, is the publisher of Sentrei
            Mobile App and website, confirms its compliance with the EU-US
            Privacy Shield Framework. We are committed to subjecting all
            personal information received from European Union (EU) member
            countries, in reliance on the Privacy Shield Framework, to the
            Framework's applicable Principles. To learn more about the Privacy
            Shield Framework, visit the U.S. Department of Commerce's Privacy
            Shield List at https://www.privacyshield.gov.
          </p>
          <p>
            Sentrei does its best to process personal information it receives
            under the standards of Privacy Shield Framework and subsequently
            transfers to a third party acting as an agent on its behalf. Before
            we share your information with any third party that is not also
            certified under the EU-US Privacy Shield Framework, Sentrei will
            enter into a written agreement that the third party provides at
            least the same level of privacy safeguard as required under those
            Frameworks, and assures the same level of protection for the
            personal information as required under applicable data protection
            laws.
          </p>
          <p>
            Worldwide data subjects with inquiries or complaints relating to
            Sentrei Privacy Shield internal policy should first contact Sentrei
            by filling the CONTACT US form provided in www.Sentrei.com. If we
            are unable to resolve your complaint or dispute, you may refer your
            complaint to our designated independent dispute resolution
            mechanism, i.e. the International Centre for Dispute Resolution
            ("ICDR").
          </p>
          <h2>26. Privacy Shield</h2>
          <p>
            Sentrei adheres to the seven privacy shield principles of notice,
            choice, and accountability for onward transfer, security, data
            integrity, access, and recourse, enforcement and liability as they
            relate to personal data. Sentrei verifies compliance to the
            principles through self-assessment. The privacy policy covering
            human resources data can be accessed on our intranet app site by all
            employees.
          </p>
          <h2>27. Legal Bases for Processing (For EEA Users):&nbsp;</h2>
          <p>
            If you are an individual in the European economic area (EEA), we
            collect and process information about you only where we have legal
            bases for doing so under applicable EU laws.&nbsp; The legal bases
            depend on the services you use and how you use them.&nbsp;This means
            we collect and use your information only where:
          </p>
          <ul>
            <li>
              * We need it to provide you the services, including to operate the
              services, provide customer support and personalized features and
              to protect the safety and security of the services;
            </li>
            <li>
              * It satisfies a legitimate interest (which is not overridden by
              your data protection interests), such as for research and
              development, to market and promote&nbsp;the services and to
              protect our legal rights and interests;
            </li>
            <li>* You give us consent to do so for a specific purpose; or</li>
            <li>
              * We need to process your data to comply with a legal obligation.
            </li>
          </ul>
          <p>
            If you have consented to our use of information about you for a
            specific purpose, you have the right to change your mind at any
            time, but this will not affect any processing that has already taken
            place.&nbsp; Where we are using your information because we or a
            third party (e.g. your employer) have a legitimate interest to do
            so, you have the right to object to that use though, in some cases,
            and this may mean no longer using the services
          </p>
          <h2>28. Security Measures for Safeguarding Your Information</h2>
          <p>
            Sentrei takes appropriate security measures to protect against
            unauthorized access, alteration, disclosure or destruction of
            personal information. These include, but are not limited to,
            internal reviews of: (a) Sentrei’s data collection; (b) storage and
            processing practices; (c) electronic security measures; and (d)
            physical security measures to guard against unauthorized access to
            systems where Sentrei stores personal information. All Sentrei
            employees, contractors and agents who access personal information
            are bound by confidentiality obligations and may be subject to
            discipline, including termination and criminal prosecution or
            unauthorized use or disclosure of personal information.
          </p>
          <h2>29. Third-Party Site and Links</h2>
          <p>
            The Sentrei contents may contain links to third parties who may
            collect personal information and non-personal information directly
            from you. Additionally, Sentrei may use third parties to provide
            components of the Sentrei contents. In either case, such third
            parties may have separate privacy policies and data collection
            practices, independent of Sentrei. Sentrei: (a) has no
            responsibility or liability for these independent policies or
            actions; (b) is not responsible for the privacy practices or the
            content of such App; and (c) does not make any warranties or
            representations about the contents, products or services offered on
            such App or the security of any information you provide to them
          </p>
          <h2>30. Mobile Advertising Identifiers</h2>
          <h3>What are they?</h3>
          <ul>
            <li>
              * Mobile advertising identifiers are identifiers used by mobile
              operating systems (Apple and/or Android) and made available to
              advertising providers to gather metrics on mobile apps (Apple’s
              IDFA or Google’s AAID) to help advertisers provide ads that may be
              more relevant to your interests.
            </li>
          </ul>
          <h3>How do we use them?</h3>
          <ul>
            <li>
              * To deliver content, including ads relevant to your interests, on
              the Sentrei mobile app and website. Third party advertisers and
              advertising networks may use advertising identifiers collected
              from your Sentrei Application and website to deliver ads they
              believe are relevant to you in other third party apps.
            </li>
          </ul>
          <h3>Other things you should know:</h3>
          <ul>
            <li>
              * Third party advertisers on the Service can access your IP
              address and mobile advertising identifiers. You can change the
              mobile advertising identifiers in your mobile device or limit
              advertising tracking through your mobile device’s privacy
              settings.
            </li>
          </ul>
          <h2>31. California / Delaware Do Not Track Disclosures </h2>
          <p>
            Various third parties are developing or have developed signals or
            other mechanisms for the expression of consumer choice regarding the
            collection of information about an individual consumer’s online
            activities over time and across third-party web sites or online
            services (e.g., browser do not track signals). Currently, Sentrei do
            not monitor or take any action with respect to these signals or
            other mechanisms.
          </p>
          <h2>32. Emails Communications</h2>
          <p>
            By creating an account, you consent to receive commercial emails
            from us. This includes newsletters and offers. Users from certain
            countries may have the ability to opt out or opt in at the time of
            account creation. All users may decline to receive commercial
            messages in their account settings. Please note that any opt-out
            request may take several days to process and you will continue to
            receive transactional emails from us (e.g., emails confirming
            transactions and/or providing information about your account).
          </p>
          <h2>33. Data Security</h2>
          <p>
            We are committed to maintaining the security of your personal data
            and have measures in place to protect against the loss, misuse, and
            alteration of the data under our control. We employ modern and
            secure techniques to protect our systems from intrusion by
            unauthorized individuals, and we regularly upgrade our security as
            better methods become available.
          </p>
          <p>
            Our data centers and those of our partners utilize modern physical
            security measures to prevent unauthorized access to the facility. In
            addition, all personal data is stored in a secure location behind
            firewalls and other sophisticated security systems with limited
            (need-to-know) administrative access.
          </p>
          <p>
            All our employees who have access to, or are associated with, the
            processing of personal data are contractually obligated to respect
            the confidentiality of your data and abide by the privacy standards
            we have established. Please be aware that no security measures are
            perfect or impenetrable. Therefore, although we use industry
            standard practices to protect your privacy, we cannot (and do not)
            guarantee the absolute security of personal data.
          </p>
          <p>
            The App may offer chat rooms, Chatbots, forums, message boards, or
            news groups to users. It is important to remember that any
            information disclosed in these areas becomes public information.
            Accordingly, as with any public forum, you should exercise extreme
            caution when deciding whether to disclose your personal information.
          </p>
          <h2>34. GDPR Statement for (EEA Users)</h2>
          <p>
            This applies only to natural persons residing in the European
            economic area (for the purpose of this section only, "you" or "your"
            shall be limited accordingly). It is Sentrei's policy to comply with
            the EU'S general data protection regulation (GDPR). In accordance
            with the GDPR, we may transfer your personal information from your
            home country to the United States (or other countries) based upon
            the following legal frameworks:
          </p>
          <ul>
            <li>
              * <strong>Legitimate business interests:</strong> we could not
              provide our services or comply with our obligations to you without
              transferring your personal information to the United States
            </li>
            <li>
              * <strong>Consent:</strong> we may transfer your personal
              information when we receive your express, revocable consent. Our
              use of standard contractual clauses (also known as "model
              clauses") where appropriate.
            </li>
            <li>
              * <strong>You have the right to:</strong> opt out of non-essential
              cookies (see our&nbsp;cookie policy); access, correct, delete,
              restrict, or object to our use of your personal information; be
              forgotten; port your data; and withdraw consents.
            </li>
          </ul>
          <p>
            We enable exercise of these rights primarily through our services
            (which we reserve the right to modify). We also fulfil our
            obligations in response to direct requests. We will endeavor to
            process requests within one month. Please note that we may not be
            able to comply with requests to the extent that they would cause us
            to violate any law or infringe any other person's rights. We reserve
            the right to request appropriate identification. We will process
            requests free of charge unless they would impose an unreasonable
            cost on us.
          </p>
          <p>
            If you have a request, complaint or inquiry, please contact our data
            protection officer at the address listed below. We are committed to
            working with you to obtain a fair resolution of any issue. You also
            have the right to file a complaint with the supervisory data
            protection authority of your jurisdiction.
          </p>
          <h2>35. GDPR Data Privacy User Rights</h2>
          <p>
            If you are an EU resident and Sentrei is processing, and/or
            transmitting your personal data, then you - as an “EU data subject”
            – benefit from the following rights and privileges under the General
            Data Protection Regulation (GDPR):
          </p>
          <ul>
            <li>
              <p>
                * <strong>Right of Access:</strong> you have the right to obtain
                from us, as controllers, confirmation as to whether or not
                personal data concerning you are being processed, and, where
                that is the case, access to the following personal data and
                information:
              </p>
              <ul>
                <li>1. the purposes of the processing;</li>
                <li>
                  2. the categories of personal data concerned; i.e name, email,
                  phone number etc
                </li>
                <li>
                  3. the recipients or categories of recipient to whom the
                  personal data have been or will be disclosed, in particular
                  recipients in third countries or international organizations’;
                </li>
                <li>
                  4. where possible, the envisaged period for which the personal
                  data will be stored, or, if not possible, the criteria used to
                  determine that period;
                </li>
                <li>
                  5. the existence of the right to request from us rectification
                  or erasure of personal data or restriction of processing of
                  personal data concerning you or to object to such processing;
                  (f) the right to lodge a complaint with a supervisory
                  authority (for a list of supervisory authorities, see
                  <a
                    href="https://edpb.europa.eu/about-edpb/board/members_en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://edpb.europa.eu/about-edpb/board/members_en
                  </a>
                  );
                </li>
                <li>
                  6. where the personal data are not collected from you, any
                  available information as to their source;
                </li>
                <li>
                  7. The existence of automated decision-making, including
                  profiling, along the lines indicated by Article 22(1) and (4)
                  GDPR, and meaningful information about the logic involved, as
                  well as the significance and the envisaged consequences of
                  such processing for you.
                </li>
              </ul>
            </li>
            <li>
              * <strong>Right to Rectification:</strong> you have the right to
              obtain from us without undue delay the rectification of inaccurate
              personal data concerned, provided during registration by him or
              her. Taking into account the purposes of the processing, the user
              have the right to have request his incomplete personal data be
              completed, including by means of providing a supplementary
              statement.
            </li>
            <li>
              * <strong>Right to Erasure (“Right to be Forgotten):</strong>you
              have the right to obtain from us the erasure of your personal data
              without undue delay, and we have the obligation to erase personal
              data without undue delay when: a) your data are no longer
              necessary for the purposes for which they were collected; b) you
              had consented to the processing; c) you have objected to the
              processing, as per below; d) your persona data had been unlawfully
              collected; e) your personal data need to be erased as a matter of
              compliance with a legal obligation.
            </li>
            <li>
              * <strong>Right to Restriction of Processing:</strong> you have
              the right to obtain from us the restriction of processing if you:
              a) contest the accuracy of the personal data, until this is
              verified; b) the processing is unlawful but you don’t want
              erasure; c) we no longer need the personal data, but you require
              them to establish, exercise to defend a legal claim; d) you have
              objected to processing but there is a need to verify whether our
              legitimate grounds override your rights to object.
            </li>
            <li>
              * <strong>Right to Data Portability:</strong> where your personal
              data have been provided on the basis of your consent or for the
              performance of a contract, and their processing occurs in an
              automated way, you have the right to receive the personal data you
              have provided to us in a structured, commonly used and
              machine-readable format and have the right to transmit those data–
              or have directly transmitted - to another controller.
            </li>
          </ul>
          <p>
            <strong>Right to Object:</strong> you have the right to object, on
            grounds relating to your particular situation, at any time to
            processing of your personal data based on a legitimate ground point
            (e) or (f) of Article 6(1), including profiling based on those
            provisions. In this case, we can no longer process your personal
            data unless we show that there is a compelling legitimate ground for
            the processing which override your interests, rights and freedoms or
            for our establishment, exercise or defense of legal claims.
          </p>
          <h2>36. Your Right To Withdraw Consent</h2>
          <p>
            Where the processing of your personal information by us is based on
            consent, you have the right to withdraw that consent without
            detriment at any time by contacting us info@Sentrei.co. You can also
            change your marketing preferences. You can also exercise the rights
            listed above at any time by contacting us at info@Sentrei.co. If
            your request or concern is not satisfactorily resolved by us, you
            may contact our data protection officer, his email is
            info@Sentrei.co
          </p>
          <p>
            He can provide further information about your rights and our
            obligations in relation to your personal data, as well as deal with
            any complaints that you have about our processing of your personal
            data.
          </p>
          <h2>37. Opting Out Of Messages from Us</h2>
          <p>
            To opt-out of any future promotional messages from us, you should
            unsubscribe in the body of the promotional message that was sent to
            you (found at the bottom of the email) or send an unsubscribe
            request to us at&nbsp;info@Sentrei.co. We will process your request
            within a reasonable time after receipt.
          </p>
          <h2>38. Opting Out Of Sharing With Third Parties for Marketing</h2>
          <p>
            If you do not want your Personal Information or Personal Data shared
            with any third party who may use such information for direct
            marketing purposes, then you may opt-out of such disclosures by
            sending an email to&nbsp;info@Sentrei.co. Please note that if you
            opt out in this manner, certain aspects of the App and platform may
            no longer be available to you. We will process your request within a
            reasonable time after receipt.
          </p>
          <h2>39. Opting Out Of Interest Based Advertising</h2>
          <p>
            The online advertising industry provides a service through which you
            may opt-out of receiving targeted ads from certain data partners and
            other advertising partners that participate in self-regulatory
            programs. We comply with the Self-Regulatory Principles for Online
            Behavioral Advertising set forth by the Digital Advertising Alliance
            (DAA) and the European Interactive Digital Advertising Alliance
            ("EDAA"). You can opt-out of targeted advertising from certain
            providers at www.aboutads.info/consumers. Please note that by opting
            out, you will continue to see generic advertising that is not
            tailored to your specific interests and activities. Please note that
            cookie-based opt-outs must be performed on each device and browser
            that you wish to have opted-out. For example, if you have opted out
            on your device browser, that opt-out will not be effective on your
            mobile device. You must separately opt out on each device. EU
            residents who have provided their consent to our use of cookies and
            similar technologies can use the EDAA’s opt out tool
          </p>
          <h2>40. Security of Personal Information</h2>
          <p>
            The Site uses its best endeavors to store all Personal Information
            on servers with restricted access, and all electronic storage and
            transmission of Personal Information are secured with appropriate
            security technologies. Not to withstand the foregoing, the app
            cannot guarantee that such precautions would render the Site and its
            servers immune to security breaches.
          </p>
          <h2>41. Changes to our Privacy Policy</h2>
          <p>
            Sentrei continually strives to implement new technologies and
            processes to better protect you, your privacy and your use of the
            Sentrei service. As a result, changes to this privacy policy may be
            made by Sentrei from time to time. In no event will these changes
            result in the degradation of any of the security measures designed
            to protect you from unauthorized disclosure, as such measures are
            described in this privacy policy.
          </p>
          <h2>42. Contact us</h2>
          <p>
            If you have any questions about this privacy policy please contact
            us at shunkakinoki@sentrei.com
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Privacy;
