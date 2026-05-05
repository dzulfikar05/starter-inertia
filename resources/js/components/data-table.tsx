import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination } from './pagination';
import { ReactNode } from 'react';

interface Props<T> {
    headers: string[];
    data: T[];
    renderRow: (item: T) => ReactNode;
    pagination: {
        links: Array<{ url: string | null; label: string; active: boolean }>;
        from?: number;
        to?: number;
        total?: number;
    };
}

export function DataTable<T>({ headers, data, renderRow, pagination }: Props<T>) {
    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow>
                            {headers.map((header, i) => (
                                <TableHead key={i} className={i === headers.length - 1 ? "text-right" : ""}>
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((item, i) => (
                                <TableRow key={i} className="transition-colors hover:bg-slate-50/50">
                                    {renderRow(item)}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={headers.length} className="h-24 text-center text-slate-500 italic">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination {...pagination} />
        </div>
    );
}
