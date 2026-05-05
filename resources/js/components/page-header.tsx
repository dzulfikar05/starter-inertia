import { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    renderAction?: ReactNode;
    children?: ReactNode;
}

export function PageHeader({ title, description, renderAction, children }: PageHeaderProps) {
    return (
        <div className="mx-auto rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    {description && (
                        <p className="text-sm text-gray-500">{description}</p>
                    )}
                </div>
                {renderAction && (
                    <div className="flex items-center gap-2">
                        {renderAction}
                    </div>
                )}
            </div>

            {children}
        </div>
    );
}
