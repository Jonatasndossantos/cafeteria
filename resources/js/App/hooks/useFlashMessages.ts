import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from './use-toast';

interface FlashMessages {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

interface PageProps extends Record<string, any> {
  auth: {
    user: any;
  };
  flash?: FlashMessages;
}

export function useFlashMessages() {
  const { flash } = usePage<PageProps>().props;

  useEffect(() => {
    if (!flash) return;

    if (flash.success) {
      toast({
        title: 'Sucesso',
        description: flash.success,
        variant: 'default',
      });
    }

    if (flash.error) {
      toast({
        title: 'Erro',
        description: flash.error,
        variant: 'destructive',
      });
    }

    if (flash.warning) {
      toast({
        title: 'Atenção',
        description: flash.warning,
        variant: 'default',
      });
    }

    if (flash.info) {
      toast({
        title: 'Informação',
        description: flash.info,
        variant: 'default',
      });
    }
  }, [flash]);
}
