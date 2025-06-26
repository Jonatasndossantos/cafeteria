import React from 'react';

export interface Column<T> {
    key: string;
    label: string;
    render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: (item: T) => React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({ 
    data, 
    columns, 
    actions 
}: DataTableProps<T>) {
    return (
        <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                    {actions && (
                                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Ações</span>
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className="whitespace-nowrap px-3 py-4 text-sm text-gray-900"
                                            >
                                                {column.render
                                                    ? column.render(item[column.key], item)
                                                    : item[column.key]}
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                {actions(item)}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
} 