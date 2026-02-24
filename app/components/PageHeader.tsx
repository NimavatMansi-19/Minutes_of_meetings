import Link from "next/link";
import { ChevronLeft, LucideIcon } from "lucide-react";

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    backHref?: string;
    action?: {
        href: string;
        label: string;
        icon?: LucideIcon;
    };
}

export default function PageHeader({ title, description, icon: Icon, backHref, action }: PageHeaderProps) {
    return (
        <div className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-violet-50/30 dark:from-indigo-950/10 dark:to-violet-950/10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        {backHref && (
                            <Link
                                href={backHref}
                                className="mt-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-all"
                            >
                                <ChevronLeft size={20} />
                            </Link>
                        )}
                        <div>
                            <div className="flex items-center gap-3">
                                {Icon && (
                                    <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                                        <Icon size={20} />
                                    </div>
                                )}
                                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    {title}
                                </h1>
                            </div>
                            {description && (
                                <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                    {action && (
                        <Link
                            href={action.href}
                            className="btn-primary flex items-center gap-2 whitespace-nowrap"
                        >
                            {action.icon && <action.icon size={18} />}
                            {action.label}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
