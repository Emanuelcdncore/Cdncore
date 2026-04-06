export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-teal-cta text-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ width: 600, height: 600 }} />
      <div className="absolute bottom-0 left-0 bg-teal-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" style={{ width: 600, height: 600 }} />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">
          Ready for the revolution?
        </h2>
        <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto">
          Whether you&apos;re an investor looking for the next unicorn or a
          company ready to automate, we want to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 text-emerald-50 text-sm font-medium">
          <span className="flex items-center gap-2">
            ✓ Early access to new features
          </span>
          <span className="flex items-center gap-2">
            ✓ Direct priority support
          </span>
          <span className="flex items-center gap-2">
            ✓ Exclusive community
          </span>
        </div>
      </div>
    </section>
  );
};
