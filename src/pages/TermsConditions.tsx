import { useEffect } from 'react'
import RevealOnScroll from '../components/RevealOnScroll'
import SplitText from '../components/SplitText'
import './LegalPages.css'

export default function TermsConditions() {
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
              Terms & Conditions
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
                <a href="#acknowledgment" className="legal-nav__link">Acknowledgment</a>
                <a href="#links" className="legal-nav__link">Third-Party Links</a>
                <a href="#termination" className="legal-nav__link">Termination</a>
                <a href="#liability" className="legal-nav__link">Liability</a>
                <a href="#disclaimer" className="legal-nav__link">Disclaimer</a>
                <a href="#governing" className="legal-nav__link">Governing Law</a>
                <a href="#contact" className="legal-nav__link">Contact Us</a>
              </nav>
            </aside>

            <article className="legal-article">
              <RevealOnScroll>
                <section id="introduction">
                  <p>
                    Please read these terms and conditions carefully before using Our Service.
                  </p>
                </section>

                <section id="#definitions">
                  <h2 className="headline-md">Interpretation and Definitions</h2>
                  <h3 className="title-lg">Interpretation</h3>
                  <p>
                    The words whose initial letters are capitalized have meanings defined under
                    the following conditions. The following definitions shall have the same
                    meaning regardless of whether they appear in singular or in plural.
                  </p>
                  <h3 className="title-lg">Definitions</h3>
                  <ul>
                    <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party.</li>
                    <li><strong>Company</strong> refers to CMK Feed, 1 Bnw Hakmabad, Rajasthan, India.</li>
                    <li><strong>Service</strong> refers to the Website.</li>
                    <li><strong>Terms and Conditions</strong> (also referred to as "Terms") mean these Terms and Conditions.</li>
                    <li><strong>Website</strong> refers to CMK Feed, accessible from <a href="https://www.cmkfeed.in" target="_blank" rel="noopener noreferrer">https://www.cmkfeed.in/</a></li>
                  </ul>
                </section>

                <section id="acknowledgment">
                  <h2 className="headline-md">Acknowledgment</h2>
                  <p>
                    These are the Terms and Conditions governing the use of this Service and the
                    agreement between You and the Company. These Terms and Conditions set out the
                    rights and obligations of all users regarding the use of the Service.
                  </p>
                  <p>
                    By accessing or using the Service You agree to be bound by these Terms and
                    Conditions. If You disagree with any part of these Terms and Conditions then
                    You may not access the Service.
                  </p>
                </section>

                <section id="links">
                  <h2 className="headline-md">Links to Other Websites</h2>
                  <p>
                    Our Service may contain links to third-party websites or services that are not
                    owned or controlled by the Company.
                  </p>
                  <p>
                    The Company has no control over, and assumes no responsibility for, the
                    content, privacy policies, or practices of any third-party websites or
                    services. You further acknowledge and agree that the Company shall not be
                    responsible or liable, directly or indirectly, for any damage or loss caused.
                  </p>
                </section>

                <section id="termination">
                  <h2 className="headline-md">Termination</h2>
                  <p>
                    We may terminate or suspend Your access immediately, without prior notice or
                    liability, for any reason whatsoever, including without limitation if You
                    breach these Terms and Conditions.
                  </p>
                  <p>
                    Upon termination, Your right to use the Service will cease immediately.
                  </p>
                </section>

                <section id="liability">
                  <h2 className="headline-md">Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by applicable law, in no event shall the
                    Company or its suppliers be liable for any special, incidental, indirect, or
                    consequential damages whatsoever.
                  </p>
                </section>

                <section id="disclaimer">
                  <h2 className="headline-md">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
                  <p>
                    The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults
                    and defects without warranty of any kind.
                  </p>
                </section>

                <section id="governing">
                  <h2 className="headline-md">Governing Law</h2>
                  <p>
                    The laws of India, excluding its conflicts of law rules, shall govern
                    these Terms and Your use of the Service.
                  </p>
                </section>

                <section id="contact">
                  <h2 className="headline-md">Contact Us</h2>
                  <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
                  <ul>
                    <li>By visiting our website: <a href="https://www.cmkfeed.in" target="_blank" rel="noopener noreferrer">https://www.cmkfeed.in/</a></li>
                    <li>By phone: +91 99296 96199</li>
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
