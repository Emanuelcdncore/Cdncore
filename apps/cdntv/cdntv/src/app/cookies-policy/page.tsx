 'use client';

import React from 'react';
import '../../components/css/LegalPages.css';
import Navigation from '../../components/Navigation';

export default function CookiesPolicy() {
  return (
    <>
      <Navigation />
      <div className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
            <h1>Cookies Policy</h1>
            <p className="legal-updated">Last updated: November 18, 2025</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. What are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device 
                (computer, tablet or mobile phone) when you visit a website. They allow the website 
                to recognize your device and store some information about your preferences 
                or past actions.
              </p>
              <p>
                This Cookies Policy applies to CDN TV's website and is in 
                compliance with the EU ePrivacy Directive and the General Data Protection 
                Regulation (GDPR).
              </p>
            </section>

            <section>
              <h2>2. How We Use Cookies</h2>
              <p>
                We use cookies to improve your experience on our website, analyze 
                traffic and personalize content. Our cookies help us to:
              </p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve site functionality and performance</li>
                <li>Provide more relevant and personalized content</li>
                <li>Measure the effectiveness of our services</li>
              </ul>
            </section>

            <section>
              <h2>3. Types of Cookies We Use</h2>
              
              <h3>3.1 Essential Cookies (Always Active)</h3>
              <p>
                These cookies are necessary for the basic functioning of the website and cannot 
                be disabled. They do not store personally identifiable information.
              </p>
              
              <div className="cookie-table">
                <table>
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>session_id</td>
                      <td>Keep user session active</td>
                      <td>Session</td>
                    </tr>
                    <tr>
                      <td>csrf_token</td>
                      <td>Protection against CSRF attacks</td>
                      <td>Session</td>
                    </tr>
                    <tr>
                      <td>cookie_consent</td>
                      <td>Store your cookie preferences</td>
                      <td>12 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>3.2 Functionality Cookies</h3>
              <p>
                These cookies allow the website to remember choices you make and provide 
                enhanced and more personalized features.
              </p>
              
              <div className="cookie-table">
                <table>
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>language_preference</td>
                      <td>Remember your language preference</td>
                      <td>12 months</td>
                    </tr>
                    <tr>
                      <td>theme_mode</td>
                      <td>Remember if you prefer dark or light mode</td>
                      <td>12 months</td>
                    </tr>
                    <tr>
                      <td>navigation_state</td>
                      <td>Improve navigation experience</td>
                      <td>30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>3.3 Analytics and Performance Cookies</h3>
              <p>
                These cookies collect information about how you use our website, helping us 
                understand and improve site performance.
              </p>
              
              <div className="cookie-table">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Google Analytics</td>
                      <td>Traffic analysis and user behavior</td>
                      <td>24 months</td>
                      <td>Third-party</td>
                    </tr>
                    <tr>
                      <td>Hotjar</td>
                      <td>User experience analysis and heatmaps</td>
                      <td>12 months</td>
                      <td>Third-party</td>
                    </tr>
                    <tr>
                      <td>performance_metrics</td>
                      <td>Website performance monitoring</td>
                      <td>30 days</td>
                      <td>First-party</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>3.4 Marketing and Advertising Cookies</h3>
              <p>
                These cookies are used to provide more relevant advertisements to you and 
                measure the effectiveness of our advertising campaigns.
              </p>
              
              <div className="cookie-table">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>LinkedIn Insights</td>
                      <td>Conversion tracking and B2B remarketing</td>
                      <td>24 months</td>
                      <td>Third-party</td>
                    </tr>
                    <tr>
                      <td>Facebook Pixel</td>
                      <td>Remarketing and audience analysis</td>
                      <td>24 months</td>
                      <td>Third-party</td>
                    </tr>
                    <tr>
                      <td>Google Ads</td>
                      <td>Conversion tracking and remarketing</td>
                      <td>24 months</td>
                      <td>Third-party</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2>4. Third-Party Cookies</h2>
              <p>
                Some cookies on our website are set by third-party services. We have no 
                control over these cookies, and they are governed by the privacy policies of 
                the respective third parties:
              </p>
              
              <ul>
                <li>
                  <strong>Google Analytics:</strong>{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="legal-link">
                    Google Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>LinkedIn:</strong>{' '}
                  <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="legal-link">
                    LinkedIn Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Facebook/Meta:</strong>{' '}
                  <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="legal-link">
                    Facebook Data Policy
                  </a>
                </li>
                <li>
                  <strong>Hotjar:</strong>{' '}
                  <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer" className="legal-link">
                    Hotjar Privacy Policy
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2>5. Managing Your Cookie Preferences</h2>
                    
              <h3>5.1 Cookie Consent Panel</h3>
              <p>
                When you visit our website for the first time, you will be presented with a 
                consent panel where you can choose which categories of cookies you accept. You can change 
                your preferences at any time by clicking the "Cookie Settings" link 
                in the website footer.
              </p>
              
              <div className="cookie-settings-demo">
                <h4>Cookie Categories:</h4>
                <ul>
                  <li>✅ <strong>Essential:</strong> Always active (necessary for functionality)</li>
                  <li>🔲 <strong>Functionality:</strong> Optional (improve experience)</li>
                  <li>🔲 <strong>Analytics:</strong> Optional (help us improve the site)</li>
                  <li>🔲 <strong>Marketing:</strong> Optional (personalize advertisements)</li>
                </ul>
              </div>

              <h3>5.2 Browser Settings</h3>
              <p>
                You can also manage cookies through your browser settings. Most 
                browsers allow you to:
              </p>
              <ul>
                <li>See which cookies are stored</li>
                <li>Delete cookies individually or all at once</li>
                <li>Block cookies from specific sites</li>
                <li>Configure the browser not to accept cookies</li>
              </ul>
              
              <div className="browser-instructions">
                <h4>Instructions by Browser:</h4>
                <ul>
                  <li>
                    <strong>Chrome:</strong>{' '}
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="legal-link">
                      How to manage cookies in Chrome
                    </a>
                  </li>
                  <li>
                    <strong>Firefox:</strong>{' '}
                    <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="legal-link">
                      How to manage cookies in Firefox
                    </a>
                  </li>
                  <li>
                    <strong>Safari:</strong>{' '}
                    <a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="legal-link">
                      How to manage cookies in Safari
                    </a>
                  </li>
                  <li>
                    <strong>Edge:</strong>{' '}
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="legal-link">
                      How to manage cookies in Edge
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2>6. Do Not Track (DNT)</h2>
              <p>
                We respect your browser's "Do Not Track" signal. When active, we will not set 
                analytics or marketing cookies, maintaining only the essential cookies necessary 
                for website functionality.
              </p>
            </section>

            <section>
              <h2>7. Cookies on Mobile Devices</h2>
              <p>
                If you access our website through a mobile device, the same 
                cookie policies apply. You can manage your preferences through 
                mobile browser settings or the application.
              </p>
            </section>

            <section>
              <h2>8. Impact of Cookie Rejection</h2>
              <p>
                If you choose to reject some types of cookies, your website experience may be 
                affected:
              </p>
              
              <ul>
                <li><strong>Without functionality cookies:</strong> You will need to reconfigure preferences on each visit</li>
                <li><strong>Without analytics cookies:</strong> We cannot improve the site based on your usage</li>
                <li><strong>Without marketing cookies:</strong> You may see less relevant advertisements</li>
              </ul>
              
              <p>
                <strong>Note:</strong> Essential cookies cannot be disabled as they are 
                necessary for the basic functioning of the website.
              </p>
            </section>

            <section>
              <h2>9. Cookie Security</h2>
              <p>
                We implement security measures to protect cookies:
              </p>
              <ul>
                <li><strong>HTTPS:</strong> All cookies are transmitted through secure connections</li>
                <li><strong>Secure Flag:</strong> Sensitive cookies are marked as secure</li>
                <li><strong>HttpOnly:</strong> Important cookies are not accessible via JavaScript</li>
                <li><strong>SameSite:</strong> Protection against CSRF attacks</li>
              </ul>
            </section>

            <section>
              <h2>10. Retention and Deletion</h2>
              <p>
                Cookies have different retention periods:
              </p>
              <ul>
                <li><strong>Session cookies:</strong> Deleted when you close the browser</li>
                <li><strong>Persistent cookies:</strong> Deleted after the specified period</li>
                <li><strong>Manual deletion:</strong> You can delete all cookies at any time</li>
              </ul>
            </section>

            <section>
              <h2>11. Updates to This Policy</h2>
              <p>
                We may occasionally update this Cookies Policy to reflect changes 
                in our services or legal requirements. When we make significant changes, 
                we will notify you through:
              </p>
              <ul>
                <li>A notice on our website</li>
                <li>Updating the "Last updated" date at the top of this page</li>
                <li>New consent request when necessary</li>
              </ul>
            </section>

            <section>
              <h2>12. Contact and Questions</h2>
              <p>
                If you have questions about this Cookies Policy or want to exercise your rights 
                regarding cookies, contact us:
              </p>
              
              <div className="contact-info">
                <p><strong>CDN TV - Data Protection</strong></p>
                <p><strong>Email:</strong> info@cdntv.pt</p>
                <p><strong>Website:</strong> cdntv.pt</p>
              </div>
              
              <h3>12.1 Cookie-Related Rights</h3>
              <p>You have the following rights:</p>
              <ul>
                <li>Be informed about the cookies we use</li>
                <li>Choose which cookies you accept</li>
                <li>Change your preferences at any time</li>
                <li>Withdraw consent for non-essential cookies</li>
                <li>Receive a copy of data collected through cookies</li>
              </ul>
            </section>

            <section>
              <h2>13. Additional Resources</h2>
              <p>For more information about cookies and data protection:</p>
              <ul>
                <li>
                  <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="legal-link">
                    CNPD - National Data Protection Commission
                  </a>
                </li>
                <li>
                  <a href="https://europa.eu/youreurope/citizens/consumers/internet-telecoms/data-protection-online-privacy/index_en.htm" target="_blank" rel="noopener noreferrer" className="legal-link">
                    Europa Portal - Online Data Protection
                  </a>
                </li>
                <li>
                  <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="legal-link">
                    All About Cookies
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
