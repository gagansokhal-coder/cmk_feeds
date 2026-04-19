import { useEffect } from 'react'
import RevealOnScroll from '../components/RevealOnScroll'
import SplitText from '../components/SplitText'
import './LegalPages.css'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page-legal">
      <section className="legal-hero">
        <div className="legal-hero__grain" />
        <div className="container">
          <RevealOnScroll>
            <span className="label-tag">Legal Information</span>
            <SplitText as="h1" className="display-md" style={{ marginTop: 20 }}>
              Privacy Policy
            </SplitText>
            <span className="last-updated">Last updated: April 19, 2026</span>
          </RevealOnScroll>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <div className="legal-grid">
            <aside className="legal-sidebar">
              <nav className="legal-nav">
                <a href="#definitions" className="legal-nav__link">Definitions</a>
                <a href="#collecting" className="legal-nav__link">Collecting Data</a>
                <a href="#tracking" className="legal-nav__link">Tracking & Cookies</a>
                <a href="#usage" className="legal-nav__link">Use of Data</a>
                <a href="#retention" className="legal-nav__link">Retention</a>
                <a href="#security" className="legal-nav__link">Security</a>
                <a href="#contact" className="legal-nav__link">Contact Us</a>
              </nav>
            </aside>

            <article className="legal-article">
              <RevealOnScroll>
                <section id="introduction">
                  <p>
                    This Privacy Policy describes Our policies and procedures on the collection,
                    use and disclosure of Your information when You use the Service and tells You
                    about Your privacy rights and how the law protects You.
                  </p>
                  <p>
                    We use Your Personal Data to provide and improve the Service. By using the
                    Service, You agree to the collection and use of information in accordance with
                    this Privacy Policy.
                  </p>
                </section>

                <section id="definitions">
                  <h2 className="headline-md">Interpretation and Definitions</h2>
                  <h3 className="title-lg">Interpretation</h3>
                  <p>
                    The words whose initial letters are capitalized have meanings defined under
                    the following conditions. The following definitions shall have the same
                    meaning regardless of whether they appear in singular or in plural.
                  </p>
                  <h3 className="title-lg">Definitions</h3>
                  <ul>
                    <li><strong>Account</strong> means a unique account created for You to access our Service.</li>
                    <li><strong>Company</strong> refers to CMK Feed, Rajasthan, India.</li>
                    <li><strong>Cookies</strong> are small files placed on Your device by a website.</li>
                    <li><strong>Personal Data</strong> is any information that relates to an identified individual.</li>
                    <li><strong>Service</strong> refers to the Website.</li>
                    <li><strong>Website</strong> refers to CMK Feed, accessible from <a href="https://www.cmkfeed.in" target="_blank" rel="noopener noreferrer">https://www.cmkfeed.in/</a></li>
                  </ul>
                </section>

                <section id="collecting">
                  <h2 className="headline-md">Collecting and Using Your Personal Data</h2>
                  <h3 className="title-lg">Types of Data Collected</h3>
                  <p>
                    While using Our Service, We may ask You to provide Us with certain personally
                    identifiable information that can be used to contact or identify You.
                  </p>
                  <ul>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                  </ul>
                </section>

                <section id="tracking">
                  <h2 className="headline-md">Tracking Technologies and Cookies</h2>
                  <p>
                    We use Cookies and similar tracking technologies to track the activity on Our
                    Service and store certain information. Tracking technologies We use include
                    beacons, tags, and scripts to collect and track information and to improve and
                    analyze Our Service.
                  </p>
                  <p>
                    You can instruct Your browser to refuse all Cookies or to indicate when a
                    Cookie is being sent. However, if You do not accept Cookies, You may not be
                    able to use some parts of our Service.
                  </p>
                </section>

                <section id="usage">
                  <h2 className="headline-md">Use of Your Personal Data</h2>
                  <p>The Company may use Personal Data for the following purposes:</p>
                  <ul>
                    <li><strong>To provide and maintain our Service</strong>, including to monitor usage.</li>
                    <li><strong>To manage Your Account</strong> and registration as a user.</li>
                    <li><strong>To contact You</strong> by email, telephone calls, or SMS.</li>
                    <li><strong>To provide You with news</strong>, special offers, and general information.</li>
                    <li><strong>To manage Your requests</strong> and attend to your inquiries.</li>
                  </ul>
                </section>

                <section id="retention">
                  <h2 className="headline-md">Retention of Your Personal Data</h2>
                  <p>
                    The Company will retain Your Personal Data only for as long as is necessary
                    for the purposes set out in this Privacy Policy. We will retain and use Your
                    Personal Data to the extent necessary to comply with our legal obligations.
                  </p>
                </section>

                <section id="security">
                  <h2 className="headline-md">Security of Your Personal Data</h2>
                  <p>
                    The security of Your Personal Data is important to Us, but remember that no
                    method of transmission over the Internet, or method of electronic storage is
                    100% secure. While We strive to use commercially acceptable means to protect
                    Your Personal Data, We cannot guarantee its absolute security.
                  </p>
                </section>

                <section id="contact">
                  <h2 className="headline-md">Contact Us</h2>
                  <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                  <ul>
                    <li>By visiting our website: <a href="https://www.cmkfeed.in" target="_blank" rel="noopener noreferrer">https://www.cmkfeed.in/</a></li>
                    <li>By phone: +91 97997 62014</li>
                  </ul>
                </section>
              </RevealOnScroll>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
