import Privacy from "@/Sections/Legal/Privacy";
import Terms from "@/Sections/Legal/Terms";
import React from "react";

const LegalPage = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-base-content">
            Legal Information
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Please read our Terms of Service and Privacy Policy carefully. We
            are committed to transparency and protecting your rights.
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-base-100 rounded-3xl p-6 sm:p-10 shadow-sm border border-base-200">
          <section id="terms" className="scroll-mt-32">
            <Terms />
          </section>

          <div className="divider my-12"></div>

          <section id="privacy" className="scroll-mt-32">
            <Privacy />
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
