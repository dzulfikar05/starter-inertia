import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    links: Array<{ url: string | null; label: string; active: boolean }>;
    from?: number;
    to?: number;
    total?: number;
}

export function Pagination({ links, from, to, total }: Props) {
    return (
        <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">{from ?? 0}</span> to <span className="font-medium text-slate-700">{to ?? 0}</span> of <span className="font-medium text-slate-700">{total}</span> entries
            </div>
            <div className="flex flex-wrap items-center gap-1">
                {links.map((link, index) => {
                    const isPrev = link.label.includes('Previous');
                    const isNext = link.label.includes('Next');

                    return (
                        <Button
                            key={index}
                            variant={link.active ? 'default' : 'outline'}
                            size={isPrev || isNext ? 'default' : 'icon'}
                            className={`h-9 ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                            asChild={!!link.url}
                            disabled={!link.url}
                        >
                            {link.url ? (
                                <Link href={link.url} preserveScroll>
                                    {isPrev && <ChevronLeft className="mr-1 h-4 w-4" />}
                                    {isPrev ? 'Prev' : isNext ? 'Next' : link.label}
                                    {isNext && <ChevronRight className="ml-1 h-4 w-4" />}
                                </Link>
                            ) : (
                                <span>{isPrev ? 'Prev' : isNext ? 'Next' : link.label}</span>
                            )}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
