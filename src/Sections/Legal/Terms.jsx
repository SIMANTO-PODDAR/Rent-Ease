import React from "react";

const Terms = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-base-content">
          Terms of Service
        </h2>
        <p className="text-sm font-medium text-base-content/60">
          Last updated: September 2026
        </p>
      </div>

      <div className="space-y-8 text-base-content/80 leading-relaxed">
        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-base-content">
            1. Agreement to Terms
          </h3>
          <p>
            By accessing or using Rent-Ease, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any of these terms, you are prohibited from using or
            accessing this site.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-base-content">
            2. Use License
          </h3>
          <p>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on Rent-Ease for personal,
            non-commercial transitory viewing only.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You may not modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose;</li>
            <li>
              Attempt to decompile or reverse engineer any software contained on
              Rent-Ease;
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-base-content">
            3. Disclaimer
          </h3>
          <p>
            The materials on Rent-Ease's website are provided on an 'as is'
            basis. Rent-Ease makes no warranties, expressed or implied, and
            hereby disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
