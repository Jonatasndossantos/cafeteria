import React from 'react';
import { useForm } from '@inertiajs/react';
import { DFDCreateData } from '../../../../types/modules/dfd';

interface DFDFormProps {
    initialData?: Partial<DFDCreateData>;
    onSubmit: (data: DFDCreateData) => void;
    submitLabel: string;
}

export const DFDForm: React.FC<DFDFormProps> = ({
    initialData = {},
    onSubmit,
    submitLabel
}) => {
    const { data, setData, processing, errors } = useForm({
        name: initialData.name || '',
        description: initialData.description || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data as DFDCreateData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                </label>
                <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
                {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição
                </label>
                <textarea
                    id="description"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
                {errors.description && (
                    <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                )}
            </div>

            <div>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Processando...' : submitLabel}
                </button>
            </div>
        </form>
    );
}; 