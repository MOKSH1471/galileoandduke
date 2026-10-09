'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Loader2, ArrowUpRight, Sparkles, HelpCircle, MessageSquare, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePerformance } from '@/hooks/usePerformance';
import SovereignBondSection from '@/components/sections/SovereignBondSection';

const InputGroup = ({ label, name, type = "text", value, onChange, required = false }: any) => {
    return (
        <div className="group relative z-0 w-full mb-10">
            {type === 'textarea' ? (
                <textarea
                    id={`contact-${name}`}
                    maxLength={5000}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={1}
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-xl font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300 resize-y min-h-[50px] max-h-[200px]"
                    placeholder=" "
                />
            ) : (
                <input
                    id={`contact-${name}`}
                    maxLength={name === 'email' ? 254 : name === 'name' ? 100 : 200}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-xl font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300"
                    placeholder=" "
                />
            )}
            <label htmlFor={`contact-${name}`} className="absolute top-3 -z-10 origin-[0] -translate-y-8 scale-75 transform text-sm font-bold tracking-widest text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-foreground">
                {label.toUpperCase()}
            </label>
        </div>
    );
};

function ContactForm() {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 6000);
            } else {
                const data = await response.json().catch(() => ({}));
                setStatus('error');
                setErrorMessage(data?.error || 'Unable to deliver message right now.');
            }
        } catch (error: any) {
            clearTimeout(timeoutId);
            console.error('Error submitting form:', error);
            setStatus('error');
            if (error?.name === 'AbortError') {
                setErrorMessage('Request timed out after 10 seconds. Please check your connection.');
            } else {
                setErrorMessage('Network or server error encountered.');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div id="contact-form" className="w-full relative z-20 scroll-mt-28">
            {/* Typography Header */}
            <div className="mb-16">
                <h2 className="text-5xl md:text-7xl font-black tracking-tight text-foreground relative z-10">
                    {t('hero.title')}
                </h2>
                <p className="text-lg text-muted-foreground mt-4 font-light max-w-md">
                    {t('hero.subtitle')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full relative z-10">
                <InputGroup label={t('form.name')} name="name" value={formData.name} onChange={handleChange} required />
                <InputGroup label={t('form.email')} name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputGroup label={t('form.subject')} name="subject" value={formData.subject} onChange={handleChange} required />
                <InputGroup
                    label={t('form.messagePlaceholder')}
                    name="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />

                {/* Creative Large Button */}
                <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full flex items-center justify-between border-b-2 border-foreground py-8 text-left hover:bg-foreground/5 transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:pl-4 transition-all duration-300">
                        {status === 'loading' ? t('form.sending') : status === 'success' ? t('form.sent') : t('form.submit')}
                    </span>

                    <div className="relative overflow-hidden w-12 h-12 flex items-center justify-center rounded-full bg-foreground text-background group-hover:scale-110 transition-transform duration-500">
                        {status === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> :
                            status === 'success' ? <CheckCircle className="w-6 h-6" /> :
                                <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        }
                    </div>
                </motion.button>

                {/* Accessible Status Message Banner */}
                <div aria-live="polite" className="mt-6 min-h-[24px]">
                    {status === 'success' && (
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <span>Your message was sent successfully. We will reply shortly.</span>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-semibold">Unable to deliver your message.</p>
                                <p className="mt-1 text-xs opacity-90">
                                    {errorMessage || 'Something went wrong.'} Your form inputs have been saved. You can try again, or write directly to{' '}
                                    <a href="mailto:hello@galileoduke.com" className="underline font-bold hover:opacity-100">
                                        hello@galileoduke.com
                                    </a>.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

function FAQSection() {
    const t = useTranslations('contact');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: t('faqData.0.q'),
            a: t('faqData.0.a')
        },
        {
            q: t('faqData.1.q'),
            a: t('faqData.1.a')
        },
        {
            q: t('faqData.2.q'),
            a: t('faqData.2.a')
        },
        {
            q: t('faqData.3.q'),
            a: t('faqData.3.a')
        },
        {
            q: t('faqData.4.q'),
            a: t('faqData.4.a')
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto py-20 px-4 md:px-8">
            <div className="flex flex-col items-center mb-16 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Frequently Asked Questions</h2>
                <div className="h-1 w-20 bg-primary/20 rounded-full" />
            </div>

            <div className="space-y-0 relative z-10">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-border last:border-0"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full py-8 md:py-10 flex items-center justify-between text-left group"
                        >
                            <span className={cn(
                                "text-xl md:text-3xl font-bold tracking-tight transition-all duration-300",
                                openIndex === index ? "text-primary translate-x-2" : "text-foreground/90 group-hover:text-foreground group-hover:translate-x-1"
                            )}>
                                {faq.q}
                            </span>
                            <div className={cn(
                                "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-primary/5 transition-all duration-500",
                                openIndex === index ? "rotate-180 bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" : "text-muted-foreground group-hover:text-foreground group-hover:bg-primary/10"
                            )}>
                                <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-10 md:pb-14 text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-4xl">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ContactPage() {
    const t = useTranslations('contact');
    const { isLowPowerMode } = usePerformance();

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const faqTriggerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: showFAQ } = useScroll({
        target: faqTriggerRef,
        offset: ["start end", "end end"]
    });

    const headerOpacity = useTransform(showFAQ, [0, 0.4], [1, 0.6]);
    const headerScale = useTransform(showFAQ, [0, 0.4], [1, 0.98]);
    const headerFilter = useTransform(showFAQ, [0, 0.4], ["blur(0px)", "blur(2px)"]);

    return (
        <div ref={containerRef} className="relative bg-background selection:bg-primary/20">
            {/* Background Grid & Backdrop */}
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-background/60 backdrop-blur-[2px] pointer-events-none z-0" />

            {/* Main Content: (Header + Form + Lanyard) */}
            <motion.div
                className="relative z-10"
                style={{
                    opacity: headerOpacity,
                    scale: isLowPowerMode ? 1 : headerScale,
                    filter: isLowPowerMode ? "none" : headerFilter,
                }}
            >
                {/* Interaction Section (Bond + Form) */}
                <div className="container-creative px-4 md:px-8 max-w-[1200px] mx-auto pt-28 md:pt-36 pb-40">
                    <div className="flex flex-col gap-16 relative z-10">
                        {/* Sovereign Treasury Bond Underwriting */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full"
                        >
                            <SovereignBondSection />
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <ContactForm />
                        </motion.div>
                    </div>
                </div>

                {/* FAQ TRIGGER ZONE */}
                <div ref={faqTriggerRef} className="h-[100vh] w-full pointer-events-none" />
            </motion.div>

            {/* FAQ SECTION */}
            <motion.section
                className="relative z-50 bg-background overflow-hidden"
                style={{
                    y: useTransform(showFAQ, [0, 1], ["100vh", "0vh"]),
                    marginTop: "-100vh",
                }}
            >
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

                {/* Ultra-Smooth Sheet Edge */}
                <div className="absolute top-0 left-0 right-0 h-[40rem] bg-gradient-to-t from-background via-background/95 to-transparent -translate-y-full pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="container-creative px-4 md:px-8 max-w-[1700px] mx-auto py-32 pb-32 relative z-10">
                    <FAQSection />
                </div>
            </motion.section>
        </div>
    );
}
