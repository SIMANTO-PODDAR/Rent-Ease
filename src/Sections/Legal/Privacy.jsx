import React from "react";

const Privacy = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-base-content">
          Privacy Policy
        </h2>
        <p className="text-sm font-medium text-base-content/60">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-8 text-base-content/80 leading-relaxed">
        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-base-content">
            1. Information We Collect
          </h3>
          <p>
            Based on your interactions with our website, we collect the following types of information necessary to operate our platform:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Account & Profile Information:</strong> Details you provide when registering, such as your name, email address, role, and authentication data (including third-party logins like Google).
            </li>
            <li>
              <strong>Session & Activity Data:</strong> Information automatically collected to monitor usage, such as unique visitor identifiers, session IDs, entry and exit pages, active time on the site, and specific event interactions.
            </li>
            <li>
              <strong>Payment Information:</strong> Transaction details when making purchases, which are processed securely through our third-party payment providers.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-base-content">
            2. How We Use Your Information
          </h3>
          <p>
            We collect and use this information strictly to provide and improve our services. Specifically, we use it to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Manage your account, authentication, and platform roles;</li>
            <li>Process transactions and deliver requested services;</li>
            <li>
              Monitor website activity and performance to troubleshoot issues and enhance the overall user experience;
            </li>
            <li>
              Maintain the security of our platform and prevent suspicious or unauthorized activity.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-base-content">
            3. Responsible Data Handling
          </h3>
          <p>
            We respect your privacy and are committed to handling your information responsibly. We do not intentionally misuse your data or use it for purposes unrelated to the services we provide. Your information is used exclusively for the legitimate operation, security, and improvement of our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-base-content">
            4. Data Security & Your Rights
          </h3>
          <p>
            We take reasonable, standard precautions to help protect your information from unauthorized access, loss, or misuse. While no digital platform can guarantee absolute security, we remain committed to maintaining a safe environment.
          </p>
          <p className="mt-2">
            If you wish to manage, update, or request the deletion of your personal information, you may contact us. Please note that we may be legally or operationally required to retain certain data even after a deletion request.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
