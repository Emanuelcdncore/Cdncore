import { TrendingUp, Users, ShieldCheck, Zap } from "lucide-react";

export const Audience = () => {
  return (
    <section id="investors" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Who is AiAccount for?
          </h2>
          <p className="text-lg text-gray-600">
            Building the future of financial automation together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Investors Card */}
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-100 hover:shadow-xl transition-shadow group">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              For Investors
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We are tapping into a massive market of financial transformation.
              AiAccount uses proprietary AI models to automate 90% of manual
              accounting tasks, positioning us for rapid scale in the B2B SaaS
              sector.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-gray-700">
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Enterprise-grade security architecture</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <Users className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Scalable multi-tenant infrastructure</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>High-growth recurring revenue model</span>
              </li>
            </ul>
            <a
              href="#contact"
              className="inline-block text-blue-600 font-semibold hover:text-blue-700"
            >
              Request Pitch Deck &rarr;
            </a>
          </div>

          {/* Beta Testers Card */}
          <div
            id="beta"
            className="bg-emerald-50 rounded-3xl p-8 lg:p-12 border border-emerald-100 hover:shadow-xl transition-shadow group"
          >
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              For Beta Testers
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Be the first to experience the &quot;accounting revolution&quot;.
              We are looking for accounting firms and SMEs to test our platform,
              provide feedback, and help shape the final product.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-gray-700">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Early access to all premium features</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <Users className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Direct channel with the engineering team</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <Zap className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Lifetime discount for early adopters</span>
              </li>
            </ul>
            <a
              href="#contact"
              className="inline-block text-emerald-600 font-semibold hover:text-emerald-700"
            >
              Apply for Access &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
