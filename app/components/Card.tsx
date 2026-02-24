interface CardProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
    title?: string;
}

export default function Card({ children, className = "", noPadding = false, title }: CardProps) {
    return (
        <div className={`glass dark:bg-slate-900/40 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden ${className}`}>
            {title && (
                <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                </div>
            )}
            <div className={noPadding ? "" : "p-8"}>
                {children}
            </div>
        </div>
    );
}
