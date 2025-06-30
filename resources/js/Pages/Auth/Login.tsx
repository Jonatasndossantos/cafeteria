import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import imagem from '@/Pages/media/espresso-damore.png';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f6f2] font-sans">
            <Head title="Log in" />
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl flex flex-col gap-6">
                <div className="flex flex-col items-center mb-2">
                    <img src={imagem} alt="Logo Espresso D'Amore" className="w-16 h-16 rounded-full bg-[#f8f6f2] p-1 mb-2" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-[#4E1F14] text-center mb-2">Entrar</h1>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center">
                        {status}
                    </div>
                )}
                <form onSubmit={submit} className="flex flex-col space-y-4">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="password" value="Senha" />
                        <TextInput
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <label className="flex items-center gap-2">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked || false)}
                            />
                            <span className="text-sm text-gray-600">Lembrar de mim</span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-[#D09290] underline hover:text-[#4E1F14] transition-colors"
                            >
                                Esqueceu a senha?
                            </Link>
                        )}
                    </div>
                    <div className={(processing ? 'opacity-50 cursor-not-allowed ' : '') + 'w-full'}>
                        <PrimaryButton>
                            Entrar
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
