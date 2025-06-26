import React, { useState } from 'react';
import {  Plus, Trash, ClipboardList, BookOpen, AlertCircle, UserCheck, UserCog, FileCheck, FileX, Hash, AlertOctagon, Zap, Gauge, Percent } from 'lucide-react';
import { useFormData, Risk } from '../../../hooks/useFormDataEsp4';

interface MatrizTabProps {
    setActiveTab: (tab: string) => void;
}

export const MatrizTab: React.FC<MatrizTabProps> = ({ setActiveTab }) => {
    const {
        data: formData,
        isLoading: isFormLoading,
        updateField,
        isSaving,
        isAutoSaving,
        risks,
        addRisk,
        updateRisk,
        removeRisk,
        isGeneratingRisks
    } = useFormData();

    const handleUpdateRisk = (id: number, updates: Partial<Risk>) => {
        // Atualizar cada campo individualmente usando a função updateRisk
        Object.entries(updates).forEach(([field, value]) => {
            updateRisk(id, field as keyof Risk, value as string);
        });
    };

    const handleDeleteRisk = (id: number) => {
        removeRisk(id);
    };

    if (isFormLoading || !formData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A3D62] mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando dados do formulário...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Identificação do Processo */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 w-[130%] -ml-[15%]">
                <div className="flex items-center gap-2 mb-4">
                    <ClipboardList className="h-6 w-6 text-amber-500" />
                    <h2 className="text-xl font-semibold text-[#0A3D62]">
                        Identificação do Processo
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Número da Matriz</label>
                        <input 
                            type="text" 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors"
                            value={formData.identificacao.numeroMatriz}
                            onChange={(e) => updateField('identificacao.numeroMatriz', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Número do TR</label>
                        <input 
                            type="text" 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors"
                            value={formData.identificacao.numeroTR}
                            onChange={(e) => updateField('identificacao.numeroTR', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Número do ETP</label>
                        <input 
                            type="text" 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors"
                            value={formData.identificacao.numeroETP}
                            onChange={(e) => updateField('identificacao.numeroETP', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed"
                            value={formData.identificacao.status}
                            readOnly
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Objeto</label>
                        <textarea 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors"
                            rows={3}
                            value={formData.identificacao.objeto}
                            onChange={(e) => updateField('identificacao.objeto', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Introdução à Matriz de Riscos */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 w-[130%] -ml-[15%]">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-6 w-6 text-amber-500" />
                    <h2 className="text-xl font-semibold text-[#0A3D62]">
                        Introdução à Matriz de Riscos
                    </h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Objetivo</h3>
                        <textarea 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors"
                            rows={3}
                            value={formData.introducao.objetivo}
                            onChange={(e) => updateField('introducao.objetivo', e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Metodologia</h3>
                        <textarea 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors"
                            rows={3}
                            value={formData.introducao.metodologia}
                            onChange={(e) => updateField('introducao.metodologia', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Matriz de Riscos */}
            <div className="bg-white rounded-lg shadow-lg p-10 w-[130%] -ml-[15%] border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-6 w-6 text-amber-500" />
                        <h2 className="font-semibold text-xl text-[#0A3D62]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Matriz de Riscos
                        </h2>
                    </div>
                    <button
                        onClick={addRisk}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0A3D62] text-white rounded-md hover:bg-[#0A3D62]/90 transition-colors shadow-sm"
                    >
                        <Plus className="h-4 w-4" />
                        Adicionar Risco
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-[#0A3D62] text-white">
                                <th className="border border-gray-300 px-4 py-3 text-center font-medium">
                                    <div className="flex items-center justify-center gap-2">
                                        <Hash className="h-4 w-4 text-amber-300" />
                                        Seq
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                                    <div className="flex items-center gap-2">
                                        <AlertOctagon className="h-4 w-4 text-amber-300" />
                                        Evento de Risco
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-amber-300" />
                                        Dano
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-center font-medium">
                                    <div className="flex items-center justify-center gap-2">
                                        <Gauge className="h-4 w-4 text-amber-300" />
                                        Impacto
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-center font-medium">
                                    <div className="flex items-center justify-center gap-2">
                                        <Percent className="h-4 w-4 text-amber-300" />
                                        Probabilidade
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                                    <div className="flex items-center gap-2">
                                        <FileCheck className="h-4 w-4 text-amber-300" />
                                        Ação Preventiva
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                                    <div className="flex items-center gap-2">
                                        <UserCheck className="h-4 w-4 text-amber-300" />
                                        Responsável Preventiva
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                                    <div className="flex items-center gap-2">
                                        <FileX className="h-4 w-4 text-amber-300" />
                                        Ação de Contingência
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">
                                    <div className="flex items-center gap-2">
                                        <UserCog className="h-4 w-4 text-amber-300" />
                                        Responsável Contingência
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-center font-medium">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                        {risks.map((risk: Risk, index: number) => (
                            <tr key={risk.id} className="hover:bg-amber-50/30 transition-colors">
                                <td className="border border-gray-300 px-4 py-2 text-center bg-amber-50/50">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    <textarea 
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100"
                                        rows={3}
                                        value={risk.evento}
                                        onChange={(e) => handleUpdateRisk(risk.id, { evento: e.target.value })}
                                        required
                                    />
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    <textarea 
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100"
                                        rows={3}
                                        value={risk.dano}
                                        onChange={(e) => handleUpdateRisk(risk.id, { dano: e.target.value })}
                                        required
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors" 
                                        value={risk.impacto}
                                        onChange={(e) => handleUpdateRisk(risk.id, { impacto: e.target.value })}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="1">Insignificante</option>
                                        <option value="2">Menor</option>
                                        <option value="3">Moderado</option>
                                        <option value="4">Maior</option>
                                        <option value="5">Crítico</option>
                                    </select>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors" 
                                        value={risk.probabilidade}
                                        onChange={(e) => handleUpdateRisk(risk.id, { probabilidade: e.target.value })}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="1">Raro</option>
                                        <option value="2">Improvável</option>
                                        <option value="3">Possível</option>
                                        <option value="4">Provável</option>
                                        <option value="5">Quase certo</option>
                                    </select>
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    <textarea 
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100"
                                        rows={3}
                                        value={risk.acao_preventiva}
                                        onChange={(e) => handleUpdateRisk(risk.id, { acao_preventiva: e.target.value })}
                                        required
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input 
                                        type="text" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors"
                                        value={risk.responsavel_preventiva}
                                        onChange={(e) => handleUpdateRisk(risk.id, { responsavel_preventiva: e.target.value })}
                                        required
                                    />
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    <textarea 
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100"
                                        rows={3}
                                        value={risk.acao_contingencia}
                                        onChange={(e) => handleUpdateRisk(risk.id, { acao_contingencia: e.target.value })}
                                        required
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input 
                                        type="text" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0A3D62] focus:border-[#0A3D62] transition-colors"
                                        value={risk.responsavel_contingencia}
                                        onChange={(e) => handleUpdateRisk(risk.id, { responsavel_contingencia: e.target.value })}
                                        required
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleDeleteRisk(risk.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}; 