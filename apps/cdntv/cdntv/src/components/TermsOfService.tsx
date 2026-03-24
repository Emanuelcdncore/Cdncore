import React from 'react';
import './css/LegalPages.css';

const TermsOfService: React.FC = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: November 11, 2025</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>1. Introduction and Acceptance</h2>
            <p>
              Welcome to CDNCORE. These Terms of Service govern the use of our website 
              (cdncore.pt) and our services specialized in artificial intelligence, AI agents 
              and autonomous drone technology.
            </p>
            <p>
              By accessing or using our services, you agree to be bound by these Terms. 
              If you do not agree with any part of these terms, you should not use our services.
            </p>
          </section>

          <section>
            <h2>2. About CDNCORE</h2>
            <div className="contact-info">
              <p><strong>CDNCORE - AI Agent & Drone Services</strong></p>
              <p>Parkurbis - Parque da Ciência e Tecnologia da Covilhã</p>
              <p>6200-865 Covilhã, Portugal</p>
              <p>Phone: +351 275 959 168</p>
              <p>Email: infglobal@cdncore.eu</p>
              <p>Website: cdncore.pt</p>
            </div>
          </section>

          <section>
            <h2>3. Services Offered</h2>
            <p>CDNCORE offers the following specialized services:</p>
            
            <h3>3.1 CORE - AI Platform:</h3>
            <ul>
              <li>Development of customized artificial intelligence agents</li>
              <li>Implementation of machine learning and deep learning solutions</li>
              <li>Digital transformation consulting through AI</li>
              <li>Integration of intelligent systems into existing processes</li>
            </ul>

            <h3>3.2 Autonomous Drone Services:</h3>
            <ul>
              <li>Development of intelligent drones for specific missions</li>
              <li>Automated monitoring and surveillance</li>
              <li>Technical inspections and aerial mapping</li>
            </ul>

            <h3>3.3 Design and Development Services:</h3>
            <ul>
              <li>Web development and mobile applications</li>
              <li>User interface design (UI/UX)</li>
              <li>Visual identity and branding creation</li>
              <li>Digital marketing solutions</li>
            </ul>
          </section>

          <section>
            <h2>4. Eligibility and Registration</h2>
            <p>
              To use our services, you must:
            </p>
            <ul>
              <li>Be at least 18 years old or legally represent a company</li>
              <li>Have legal capacity to enter into contracts</li>
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain confidentiality of your access credentials</li>
            </ul>
          </section>

          <section>
            <h2>5. Acceptable Use</h2>
            <p>You agree to use our services only for legal purposes and in accordance with these Terms. 
            It is expressly prohibited to:</p>
            
            <ul>
              <li>Use services for illegal or unauthorized activities</li>
              <li>Violate third-party intellectual property rights</li>
              <li>Transmit offensive, defamatory or discriminatory content</li>
              <li>Interfere with the security or operation of our systems</li>
              <li>Use drones in restricted airspace without authorization</li>
              <li>Use AI technology for malicious or discriminatory purposes</li>
              <li>Reverse engineer our systems or algorithms</li>
            </ul>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            
            <h3>6.1 CDNCORE Property:</h3>
            <p>
              All intellectual property rights related to our services, including 
              but not limited to software, algorithms, designs, logos and content, belong to CDNCORE 
              or its licensors.
            </p>

            <h3>6.2 Usage License:</h3>
            <p>
              We grant you a limited, non-exclusive and revocable license to use our 
              services in accordance with these Terms.
            </p>

            <h3>6.3 Client Content:</h3>
            <p>
              You retain all rights to the content you provide. You grant us a license to 
              process that content only to the extent necessary to provide the services.
            </p>
          </section>

          <section>
            <h2>7. Data Protection and Privacy</h2>
            <p>
              The processing of your personal data is governed by our 
              <a href="/privacy-policy" className="legal-link"> Privacy Policy</a>, 
              which complies with GDPR and other applicable data protection laws.
            </p>
            <p>
              For projects involving sensitive or critical data, we enter into specific 
              data processing agreements (DPA - Data Processing Agreement).
            </p>
          </section>

          <section>
            <h2>8. Pricing and Payment</h2>
            
            <h3>8.1 Pricing:</h3>
            <ul>
              <li>Prices are determined case by case, based on project scope and complexity</li>
              <li>All prices may be presented in euros (EUR) or dollars ($) and include VAT when applicable</li>
            </ul>

            <h3>8.2 Payment:</h3>
            <ul>
              <li>Payments are processed as agreed in the specific contract</li>
              <li>Late payments may result in service suspension</li>
            </ul>
          </section>

          <section>
            <h2>9. Warranties and Limitations</h2>
            
            <h3>9.1 Service Warranty:</h3>
            <ul>
              <li>We guarantee that our services will be provided with professional competence</li>
              <li>AI solutions are provided with limited performance warranties</li>
              <li>Drones are provided with operational warranty according to contractual specifications</li>
            </ul>

            <h3>9.2 Limitation of Liability:</h3>
            <p>
              To the maximum extent permitted by law, CDNCORE will not be liable for:
            </p>
            <ul>
              <li>Indirect, consequential or special damages</li>
              <li>Loss of profits, data or business opportunities</li>
              <li>Failures caused by external factors (third parties, force majeure)</li>
            </ul>
        
          </section>

          <section>
            <h2>10. Termination</h2>
            
            <h3>10.1 Termination by you:</h3>
            <p>You may terminate these Terms at any time by ceasing to use our services.</p>

            <h3>10.2 Termination by CDNCORE:</h3>
            <p>We may terminate or suspend access to our services if you:</p>
            <ul>
              <li>Violate our Terms of Service</li>
              <li>Fail to make due payments</li>
              <li>Use services in a way that harms other users</li>
            </ul>
          </section>

          <section>
            <h2>11. Regulatory Compliance</h2>
            
            <h3>11.1 Drone Regulations:</h3>
            <ul>
              <li>We comply with all EASA (European Union Aviation Safety Agency) regulations</li>
              <li>We operate according to Portuguese and European drone legislation</li>
              <li>We maintain the necessary certifications and licenses for commercial operations</li>
            </ul>

            <h3>11.2 AI and Data Protection:</h3>
            <ul>
              <li>We develop AI in compliance with EU ethical principles</li>
              <li>We comply with GDPR and future European Union AI regulations</li>
              <li>We implement "Privacy by Design" and "AI by Design" practices</li>
            </ul>
          </section>

          <section>
            <h2>12. Dispute Resolution</h2>
            <p>
              These Terms are governed by Portuguese law. Any dispute will be resolved through:
            </p>
            <ol>
              <li><strong>Direct negotiation:</strong> We will attempt to resolve any dispute amicably</li>
              <li><strong>Mediation:</strong> If necessary, we will resort to mediation through a recognized entity</li>
              <li><strong>Portuguese courts:</strong> As a last resort, disputes will be resolved by the courts of Covilhã, Portugal</li>
            </ol>
          </section>

          <section>
            <h2>13. General Provisions</h2>
            
            <h3>13.1 Changes to Terms:</h3>
            <p>
              We reserve the right to modify these Terms. Significant changes will be 
              communicated with 30 days' notice.
            </p>

            <h3>13.2 Force Majeure:</h3>
            <p>
              We will not be liable for delays or failures caused by circumstances beyond our 
              reasonable control (natural disasters, pandemics, government actions, etc.).
            </p>

            <h3>13.3 Severability:</h3>
            <p>
              If any part of these Terms is deemed invalid, the remaining provisions 
              will remain in force.
            </p>
          </section>

          <section>
            <h2>14. Contact</h2>
            <p>
              For questions about these Terms of Service, contact us:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> infglobal@cdncore.eu</p>
              <p><strong>Phone:</strong> +351 275 959 168</p>
              <p><strong>Address:</strong> Parkurbis, Parque da Ciência e Tecnologia da Covilhã</p>
              <p><strong>Postal Code:</strong> 6200-865 Covilhã, Portugal</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
